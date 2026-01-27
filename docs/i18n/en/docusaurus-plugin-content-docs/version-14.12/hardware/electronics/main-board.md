---
id: main-board
title: Placa Principal
sidebar_label: Main Board
sidebar_position: 1
description: Documentación de la placa principal de IncuNest
keywords: [PCB, placa, ESP32, electrónica]
---
# Main Board

## General Description

The IncuNest main board integrates all control components into a single PCB designed for easy assembly and maintenance.

## Characteristics

- **Dimensions**: 100mm x 80mm
- **Layers**: 2 layers
- **Thickness**: 1.6mm FR4
- **Finish**: HASL lead-free

## Schematic Diagram

### Food Section

```
           ┌─────────────────────────────────────────┐
           │                                         │
   12V ────┼──┬───[F1 15A]───┬───────────────► 12V_PWR
           │  │              │
           │  │    ┌─────────┴─────────┐
           │  │    │   AMS1117-5.0     │
           │  │    │  ┌───┬───┬───┐    │
           │  └────┼──┤IN │GND│OUT├────┼────► 5V
           │       │  └───┴─┬─┴───┘    │
           │       │        │          │
           │       │   C1 ══╪══ C2     │
           │       │   100µF│   100µF  │
           │       └────────┼──────────┘
           │                │
           │       ┌────────┴──────────┐
           │       │   AMS1117-3.3     │
           │       │  ┌───┬───┬───┐    │
           │       └──┤IN │GND│OUT├────┼────► 3.3V
           │          └───┴─┬─┴───┘    │
           │                │          │
           │           C3 ══╪══ C4     │
           │           100µF│   100µF  │
           │                │          │
   GND ────┼────────────────┴──────────┼────► GND
           │                           │
           └───────────────────────────┘
```

### Microcontroller Section

```
                    ┌──────────────────────────────┐
                    │       ESP32-WROOM-32         │
                    │                              │
    3.3V ───────────┤ 3.3V                    GND ├─── GND
                    │                              │
    EN ─────[10K]───┤ EN                     IO0  ├─── BOOT (con pullup)
                    │                              │
    TX ─────────────┤ TX                      RX  ├─── RX
                    │                              │
                    │ GPIO4  ─────────────────────┼─── DHT22
                    │ GPIO5  ─────────────────────┼─── DS18B20
                    │ GPIO21 ─────────────────────┼─── SDA (I2C)
                    │ GPIO22 ─────────────────────┼─── SCL (I2C)
                    │ GPIO25 ─────────────────────┼─── HEATER_PWM
                    │ GPIO26 ─────────────────────┼─── FAN_PWM
                    │ GPIO27 ─────────────────────┼─── HUMIDIFIER
                    │ GPIO32 ─────────────────────┼─── BUZZER
                    │                              │
                    └──────────────────────────────┘
```

### Power Control Section

```
                  VCC_12V
                     │
                    [R1]
                     │ 10K
    HEATER_PWM ──────┼──────┐
                     │      │
                    ─┴─    ─┴─
                   │   │  │   │
                   │ Q1│  │ Q2│  (IRLZ44N x2 en paralelo)
                   │   │  │   │
                    ─┬─    ─┬─
                     │      │
                     └──┬───┘
                        │
                        ▼
                     HEATER (100W)
                        │
                       GND
```

## Component List (Partial BOM)

### Microcontroller and Peripherals

| Ref | Component | Value | Quantity |
|-----|------------|-------|----------|
| U1 | ESP32-WROOM-32 | - | 1 |
| U2 | AMS1117-3.3 | 3.3V | 1 |
| U3 | AMS1117-5.0 | 5V | 1 |
| U4 | DS3231 | RTC | 1 |
| U5 | 24C32 | EEPROM | 1 |

### Resistors

| Ref | Value | Type | Quantity |
|-----|-------|------|----------|
| R1-R4 | 10KΩ | 0805 | 4 |
| R5-R8 | 4.7KΩ | 0805 | 4 |
| R9-R11 | 330Ω | 0805 | 3 |

### Capacitors

| Ref | Value | Type | Quantity |
|-----|-------|------|----------|
| C1-C4 | 100µF | Electrolytic | 4 |
| C5-C10 | 100nF | 0805 | 6 |
| C11-C12 | 10µF | 0805 | 2 |

### Semiconductors

| Ref | Component | Quantity |
|-----|------------|----------|
| Q1-Q2 | IRLZ44N | 2 |
| Q3 | 2N2222 | 1 |
| D1 | SS34 (Schottky) | 1 |
| LED1-3 | 3mm RGB LEDs | 3 |

### Connectors

| Ref | Type | Pins | Quantity |
|-----|------|-------|----------|
| J1 | Terminal block | 2 | 1 |
| J2 | JST-XH | 4 | 1 |
| J3 | JST-XH | 3 | 2 |
| J4 | Header | 2x4 | 1 |

## PCB layout

### Top View

```
┌─────────────────────────────────────────────────────────┐
│  ○                                                   ○  │
│     ┌──────────┐                    ┌──────────┐        │
│     │ POWER IN │      [ESP32]       │ SENSORS  │        │
│     │  12V GND │                    │ CONNECTORS│       │
│     └──────────┘                    └──────────┘        │
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐                          │
│  │ 5V   │  │ 3.3V │  │ RTC  │    [STATUS LEDS]         │
│  │ REG  │  │ REG  │  │      │    ● ● ●                 │
│  └──────┘  └──────┘  └──────┘    R G B                 │
│                                                         │
│     ┌────────────────────┐      ┌──────────────┐       │
│     │    MOSFET DRIVER   │      │   ACTUATOR   │       │
│     │   [Q1] [Q2] [Q3]   │      │  CONNECTORS  │       │
│     └────────────────────┘      └──────────────┘       │
│                                                         │
│  ○                                                   ○  │
└─────────────────────────────────────────────────────────┘
```

### Mounting Dimensions

- **Mounting holes**: 4x M3, located in the corners
- **Distance between holes**: 90mm x 70mm

## Manufacturing Files

The Gerber files and the KiCad project are available at:

```
hardware/
├── pcb/
│   ├── kicad/
│   │   ├── incunest_main.kicad_pcb
│   │   ├── incunest_main.kicad_sch
│   │   └── incunest_main.kicad_pro
│   └── gerber/
│       ├── incunest_main-F_Cu.gbr
│       ├── incunest_main-B_Cu.gbr
│       ├── incunest_main-F_SilkS.gbr
│       ├── incunest_main-B_SilkS.gbr
│       ├── incunest_main-F_Mask.gbr
│       ├── incunest_main-B_Mask.gbr
│       ├── incunest_main-Edge_Cuts.gbr
│       └── incunest_main.drl
```

## Manufacturing Notes

### Manufacturer Specifications

| Parameter | Value |
|-----------|-------|
| Layers | 2 |
| PCB thickness | 1.6mm |
| Copper thickness | 1oz (35µm) |
| Finishing | HASL Lead Free |
| Welding mask | Green |
| Screen printing | White |
| Minimum track size | 0.3mm |
| Minimum track width | 0.25mm |

### Recommended Manufacturers

- **JLCPCB**: Economical, good service
- **PCBWay**: Advanced options
- **OSH Park**: High quality (USA)
- **ALLPCB**: Economical alternative

## Upcoming Sections

- [Sensors](./sensors) - Sensor connection
- [Actuators](./actuators) - Actuator control
- [Display](./display) - Screen and LEDs
