---
id: main-board
title: Placa Principal
sidebar_label: Placa Principal
sidebar_position: 1
description: Documentação da placa principal do IncuNest
keywords: [PCB, placa, ESP32, electrónica]
---

# Placa Principal

# Descrição Geral

A placa principal de IncuNest integra todos os componentes de controle em um único PCB projetado para facilitar a montagem e manutenção.

## Características

- **Dimensões**: 100mm x 80mm
- **Capas**: 2 camadas
- **Espesor**: 1.6mm FR4
- **Acabado**: HASL sem chumbo

# Diagrama Esquemático

## Seção de Alimentação

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

## Seção do Microcontrolador

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

### Seção de Controle de Potência

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

## Microcontrolador e Periféricos

| Ref | Componente | Valor | Quantidade |
|-----|-------------|-------|--------|
| U1 | ESP32-WROOM-32 | - | 1 |
| U2 | AMS1117-3.3 | 3.3V | 1 |
| U3 | AMS1117-5.0 | 5V | 1 |
| U4 | DS3231 | RTC | 1 |
| U5 | 24C32 | EEPROM | 1 |

## Resistências

| Ref | Valor | Tipo | Quantidade |
|-----|-------|-------|-------------|
| R1-R4 | 10KΩ | 0805 | 4 |
| R5-R8 | 4.7KΩ | 0805 | 4 |
| R9-R11 | 330Ω | 0805 | 3 |

## Capacitores

| Ref | Valor | Tipo | Quantidade |
|-----|-------|-------|-------------|
| C1-C4 | 100μF | Electrolítico | 4 |
| C5-C10 | 100nF | 0805 | 6 |
| C11-C12 | 10μF | 0805 | 2 |

## Semicondutores

| Ref | Componente | Quantidade |
|-----|-------------|------------|
| Q1-Q2 | IRLZ44N | 2 |
| Q3 | 2N2222 | 1 |
| D1 | SS34 (Schottky) | 1 |
| LED1-3 | LED 3mm RGB | 3 |

## Conectores

| Ref | Tipo | Pines | Quantidade |
|-----|------|--------|-------------|
| J1 | Terminal block | 2 | 1 |
| J2 | JST-XH | 4 | 1 |
| J3 | JST-XH | 3 | 2 |
| J4 | Header | 2x4 | 1 |

## Layout do PCB

## Vista Superior

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

## Dimensões de Montagem

- **Agujeiros de montagem**: 4x M3, localizados nos cantos
- **Distância entre buracos**: 90mm x 70mm

## Ficheiros de Fabricação

Os arquivos Gerber e o projeto KiCad estão disponíveis em:

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

## Notas de Fabricação

### Especificações para o Fabricante

| Parâmetro | Valor |
|-----------|-------|
| Capas | 2 |
| Espesor PCB | 1.6mm |
| Espesor cobre | 1oz (35μm) |
| Acabado | HASL sem chumbo |
| Máscara solda | Verde |
| Serigrafia | Blanca |
| Tamanho via mínimo | 0.3mm |
| Lacho pista mínimo | 0.25mm |

## Fabricantes Recomendados

- **JLCPCB**: Econômico, bom serviço
- **PCBWay**: Opções avançadas
- **OSH Park**: Alta qualidade (USA)
- **ALLPCB**: Alternativa econômica

## Próximas Secções

- [Sensores] (./sensors) - Ligação de sensores
- [Actuadores] (./actuators) - Controlo de Agidores
- [Display] (./display) - Tela e LEDs