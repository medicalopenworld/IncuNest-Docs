---
id: pcb-layout
title: Layout del PCB
sidebar_label: Layout PCB
sidebar_position: 2
description: Información sobre el diseño del PCB de IncuNest
keywords: [PCB, layout, diseño, capas]
---

# Layout del PCB

## Especificaciones del PCB

### Características Generales

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 100mm x 80mm |
| Capas | 2 (Top y Bottom) |
| Espesor | 1.6mm |
| Material | FR-4 |
| Espesor de cobre | 1oz (35µm) |
| Acabado superficial | HASL con plomo o sin plomo |
| Máscara de soldadura | Verde |
| Serigrafía | Blanca |

### Reglas de Diseño

| Parámetro | Valor Mínimo |
|-----------|--------------|
| Ancho de pista (señal) | 0.25mm (10mil) |
| Ancho de pista (potencia) | 1.0mm (40mil) |
| Separación pista-pista | 0.2mm (8mil) |
| Separación pista-pad | 0.2mm (8mil) |
| Diámetro mínimo via | 0.4mm |
| Taladro mínimo via | 0.3mm |
| Anillo anular mínimo | 0.15mm |

## Distribución de Componentes

### Vista Superior (Top Layer)

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

### Vista Inferior (Bottom Layer)

La capa inferior contiene principalmente:
- Plano de tierra (GND)
- Pistas de retorno de señal
- Algunas pistas de interconexión

## Zonas del PCB

### Zona de Potencia

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

### Zona Digital

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

### Zona de RF (WiFi)

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

## Consideraciones de Diseño

### Plano de Tierra

- Plano de tierra sólido en capa inferior
- Via stitching alrededor de la placa (cada 5mm)
- Separación de tierras analógica/digital con conexión en un punto

```
        Digital GND          Analog GND
            │                    │
            │                    │
    ┌───────┴────────────────────┴───────┐
    │                ★                   │  ← Punto de unión
    │         GROUND PLANE               │
    └────────────────────────────────────┘
```

### Capacitores de Desacoplo

Ubicación de capacitores de bypass:

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

### Ruteo USB

- Pistas diferenciales D+ y D-
- Impedancia: 90Ω diferencial
- Longitud igualada (±0.5mm)
- Sin vias en el par diferencial

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

## Lista de Componentes por Zona

### Zona de Potencia

| Ref | Valor | Footprint |
|-----|-------|-----------|
| J1 | Terminal 2-pin | Terminal_5.08mm |
| F1 | Fusible 10A | Fuse_5x20mm |
| D1 | TVS P6KE15 | DO-201 |
| D2 | SS34 | SMA |
| U1 | AMS1117-5.0 | SOT-223 |
| U2 | AMS1117-3.3 | SOT-223 |
| C1-C4 | 100µF/25V | Cap_8x10mm |
| C5-C8 | 10µF/16V | 0805 |

### Zona del ESP32

| Ref | Valor | Footprint |
|-----|-------|-----------|
| U3 | ESP32-WROOM-32 | ESP32-WROOM |
| C9-C12 | 100nF | 0402 |
| R1-R2 | 10kΩ (I2C pull-up) | 0402 |
| R3 | 1kΩ (LED) | 0402 |
| LED1 | LED Verde | 0603 |

### Conectores

| Ref | Descripción | Footprint |
|-----|-------------|-----------|
| J2 | Micro USB | USB_Micro_B |
| J3 | I2C Header | Pin_Header_1x4 |
| J4 | OneWire | Pin_Header_1x3 |
| J5-J7 | Actuadores | Terminal_3.5mm |

## Archivos de Diseño

Los archivos de diseño están disponibles en formato KiCad:

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

## Próximas Secciones

- [Diagramas de Circuito](./circuit-diagrams)
- [Archivos Gerber](./gerber-files)
