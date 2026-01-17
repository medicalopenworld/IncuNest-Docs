---
id: pcb-layout
title: Layout del PCB
sidebar_label: Layout PCB
sidebar_position: 2
description: Información sobre el diseño del PCB de IncuNest
keywords: [PCB, layout, diseño, capas]
---
# PCB layout

##PCB Specifications

### General Features

| Parameter | Value |
|-----------|-------|
| Dimensions | 100mm x 80mm |
| Layers | 2 (Top and Bottom) |
| Thickness | 1.6mm |
| Materials | FR-4 |
| Copper thickness | 1oz (35µm) |
| Surface finish | HASL leaded or unleaded |
| Welding mask | Green |
| Screen printing | White |

### Design Rules

| Parameter | Minimum Value |
|-----------|--------------|
| Track width (signal) | 0.25mm (10mil) |
| Track width (power) | 1.0mm (40mil) |
| Runway-runway separation | 0.2mm (8mil) |
| Track-pad separation | 0.2mm (8mil) |
| Minimum diameter via | 0.4mm |
| Minimum drilling via | 0.3mm |
| Minimum annular ring | 0.15mm |

## Component Distribution

### Top View (Top Layer)

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [POWER IN]     [REGULATORS]              [ESP32 MODULE]          │
│   ┌───────┐      ┌────┐ ┌────┐           ┌──────────────┐          │
│   │ 12V   │      │5V  │ │3.3V│           │              │          │
│   │ GND   │      │REG │ │REG │           │   ESP32      │          │
│   └───────┘      └────┘ └────┘           │   WROOM-32   │          │
│                                          │              │          │
│   [FUSE]    [TVS]                        │   [ANTENNA]  │          │
│   ┌───┐     ┌───┐                        └──────────────┘          │
│   │ F1│     │TVS│                                                   │
│   └───┘     └───┘                        [STATUS LED]              │
│                                          ┌───┐                      │
│                                          │LED│                      │
│   [SSR CONTROL]    [MOSFET CONTROL]      └───┘                      │
│   ┌──────────┐     ┌──────────────┐                                │
│   │ SSR      │     │   MOSFET     │      [BUZZER]                  │
│   │ Driver   │     │   Fan Driver │      ┌─────┐                   │
│   └──────────┘     └──────────────┘      │ BUZ │                   │
│                                          └─────┘                    │
│                                                                     │
│   [I2C CONNECTOR]  [ONEWIRE]      [ACTUATOR CONNECTORS]           │
│   ┌─────────┐      ┌─────────┐    ┌─────┐ ┌─────┐ ┌─────┐         │
│   │SDA SCL  │      │ DS18B20 │    │HEAT │ │ FAN │ │ HUM │         │
│   │VCC GND  │      │ CONN    │    │     │ │     │ │     │         │
│   └─────────┘      └─────────┘    └─────┘ └─────┘ └─────┘         │
│                                                                     │
│   [USB CONNECTOR]        [PROGRAMMING HEADER]                      │
│   ┌───────────┐          ┌────────────────┐                        │
│   │  MICRO B  │          │ TX RX EN BOOT  │                        │
│   └───────────┘          └────────────────┘                        │
│                                                                     │
│   ○ M1                                               M2 ○          │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
     ○ M3                                               M4 ○
```

### Bottom View (Bottom Layer)

The bottom layer mainly contains:
- Ground plane (GND)
- Signal return tracks
- Some interconnection tracks

## PCB areas

### Power Zone

```
┌─────────────────────────────────────┐
│  ZONA DE POTENCIA                   │
│  ┌─────────────────────────────────┐│
│  │ • Entrada 12V                   ││
│  │ • Reguladores                   ││
│  │ • Drivers de potencia (SSR, MOSFET) ││
│  │ • Capacitores de filtrado       ││
│  │                                 ││
│  │ Pistas: mínimo 1mm              ││
│  │ Separación: mayor a 0.5mm       ││
│  │ Via stitching para tierra       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Digital Zone

```
┌─────────────────────────────────────┐
│  ZONA DIGITAL                       │
│  ┌─────────────────────────────────┐│
│  │ • ESP32 y componentes asociados ││
│  │ • Conectores de sensores        ││
│  │ • LED y buzzer                  ││
│  │                                 ││
│  │ Pistas: 0.25mm típico           ││
│  │ Impedancia controlada para USB  ││
│  │ Decoupling capacitors cercanos  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### RF zone (WiFi)

```
┌─────────────────────────────────────┐
│  ZONA DE ANTENA                     │
│  ┌─────────────────────────────────┐│
│  │ • Keepout bajo antena ESP32     ││
│  │ • Sin cobre en ambas capas      ││
│  │ • Sin componentes cercanos      ││
│  │ • Distancia mínima: 15mm        ││
│  │                                 ││
│  │ ┌───────────────┐               ││
│  │ │   KEEPOUT     │               ││
│  │ │   ZONE        │               ││
│  │ │ (No copper)   │               ││
│  │ └───────────────┘               ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Design Considerations

### Ground Plane

- Solid ground plane in lower layer
- Via stitching around the plate (every 5mm)
- Analog/digital ground separation with single point connection

```
        Digital GND          Analog GND
            │                    │
            │                    │
    ┌───────┴────────────────────┴───────┐
    │                ★                   │  ← Punto de unión
    │         GROUND PLANE               │
    └────────────────────────────────────┘
```

### Decoupling Capacitors

Location of bypass capacitors:

```
    ESP32
    ┌─────────────────┐
    │                 │
    │   ┌───┐   ┌───┐ │
    │   │C1 │   │C2 │ │
    │   │100│   │10n│ │
    │   │nF │   │F  │ │
    │   └─┬─┘   └─┬─┘ │
    │     │       │   │
    │   VCC     VCC   │
    └─────────────────┘
    
    Distancia máxima a pin: 3mm
```

### USB routing

- Differential tracks D+ and D-
- Impedance: 90Ω differential
- Matched length (±0.5mm)
- No vias in the differential pair

```
    USB CONN           ESP32
    ┌────┐            ┌─────┐
    │D+  ├────────────┤D+   │
    │    │ ═══════════│     │
    │D-  ├────────────┤D-   │
    └────┘            └─────┘
    
    Ancho de pista: 0.4mm
    Separación: 0.15mm
    Plano de tierra debajo
```

## List of Components by Zone

### Power Zone

| Ref | Value | Footprint |
|-----|-------|-----------|
| J1 | 2-pin terminal | Terminal_5.08mm |
| F1 | 10A Fuse | Fuse_5x20mm |
| D1 | TVS P6KE15 | DO-201 |
| D2 | SS34 | SMA |
| U1 | AMS1117-5.0 | SOT-223 |
| U2 | AMS1117-3.3 | SOT-223 |
| C1-C4 | 100µF/25V | Cap_8x10mm |
| C5-C8 | 10µF/16V | 0805 |

### ESP32 zone

| Ref | Value | Footprint |
|-----|-------|-----------|
| U3 | ESP32-WROOM-32 | ESP32-WROOM |
| C9-C12 | 100nF | 0402 |
| R1-R2 | 10kΩ (I2C pull-up) | 0402 |
| R3 | 1kΩ (LED) | 0402 |
| LED1 | Green LED | 0603 |

### Connectors

| Ref | Description | Footprint |
|-----|-------------|-----------|
| J2 | Micro USB | USB_Micro_B |
| J3 | I2C Header | Pin_Header_1x4 |
| J4 | OneWire | Pin_Header_1x3 |
| J5-J7 | Actuators | Terminal_3.5mm |

## Design Files

Design files are available in KiCad format:

```
hardware/kicad/
├── IncuNest.kicad_pro
├── IncuNest.kicad_sch
├── IncuNest.kicad_pcb
├── fp-lib-table
├── sym-lib-table
└── gerber/
    └── (archivos de fabricación)
```

## Upcoming Sections

- [Circuit Diagrams](./circuit-diagrams)
- [Gerber Files](./gerber-files)
