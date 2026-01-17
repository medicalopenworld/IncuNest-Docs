---
id: main-board
title: Placa Principal
sidebar_label: Placa Principal
sidebar_position: 1
description: Documentación de la placa principal de IncuNest
keywords: [PCB, placa, ESP32, electrónica]
---

# Placa Principal

## Descripción General

La placa principal de IncuNest integra todos los componentes de control en un solo PCB diseñado para facilitar el ensamblaje y mantenimiento.

## Características

- **Dimensiones**: 100mm x 80mm
- **Capas**: 2 capas
- **Espesor**: 1.6mm FR4
- **Acabado**: HASL sin plomo

## Diagrama Esquemático

### Sección de Alimentación

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

### Sección del Microcontrolador

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

### Sección de Control de Potencia

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

## Lista de Componentes (BOM Parcial)

### Microcontrolador y Periféricos

| Ref | Componente | Valor | Cantidad |
|-----|------------|-------|----------|
| U1 | ESP32-WROOM-32 | - | 1 |
| U2 | AMS1117-3.3 | 3.3V | 1 |
| U3 | AMS1117-5.0 | 5V | 1 |
| U4 | DS3231 | RTC | 1 |
| U5 | 24C32 | EEPROM | 1 |

### Resistencias

| Ref | Valor | Tipo | Cantidad |
|-----|-------|------|----------|
| R1-R4 | 10KΩ | 0805 | 4 |
| R5-R8 | 4.7KΩ | 0805 | 4 |
| R9-R11 | 330Ω | 0805 | 3 |

### Capacitores

| Ref | Valor | Tipo | Cantidad |
|-----|-------|------|----------|
| C1-C4 | 100µF | Electrolítico | 4 |
| C5-C10 | 100nF | 0805 | 6 |
| C11-C12 | 10µF | 0805 | 2 |

### Semiconductores

| Ref | Componente | Cantidad |
|-----|------------|----------|
| Q1-Q2 | IRLZ44N | 2 |
| Q3 | 2N2222 | 1 |
| D1 | SS34 (Schottky) | 1 |
| LED1-3 | LED 3mm RGB | 3 |

### Conectores

| Ref | Tipo | Pines | Cantidad |
|-----|------|-------|----------|
| J1 | Terminal block | 2 | 1 |
| J2 | JST-XH | 4 | 1 |
| J3 | JST-XH | 3 | 2 |
| J4 | Header | 2x4 | 1 |

## Layout del PCB

### Vista Superior

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

### Dimensiones de Montaje

- **Agujeros de montaje**: 4x M3, ubicados en las esquinas
- **Distancia entre agujeros**: 90mm x 70mm

## Archivos de Fabricación

Los archivos Gerber y el proyecto KiCad están disponibles en:

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

## Notas de Fabricación

### Especificaciones para el Fabricante

| Parámetro | Valor |
|-----------|-------|
| Capas | 2 |
| Espesor PCB | 1.6mm |
| Espesor cobre | 1oz (35µm) |
| Acabado | HASL sin plomo |
| Máscara soldadura | Verde |
| Serigrafía | Blanca |
| Tamaño vía mínimo | 0.3mm |
| Ancho pista mínimo | 0.25mm |

### Fabricantes Recomendados

- **JLCPCB**: Económico, buen servicio
- **PCBWay**: Opciones avanzadas
- **OSH Park**: Alta calidad (USA)
- **ALLPCB**: Alternativa económica

## Próximas Secciones

- [Sensores](./sensors) - Conexión de sensores
- [Actuadores](./actuators) - Control de actuadores
- [Display](./display) - Pantalla y LEDs
