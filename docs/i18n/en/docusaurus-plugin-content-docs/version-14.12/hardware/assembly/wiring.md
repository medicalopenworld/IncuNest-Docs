---
id: wiring
title: Cableado
sidebar_label: Wiring
sidebar_position: 4
description: Guía de cableado de IncuNest
keywords: [cableado, conexiones, cables, instalación]
---
# Wiring

## General Connection Diagram

```mermaid
flowchart TB
    subgraph POWER["Alimentación"]
        AC[AC Input] --> PSU[Fuente 12V]
        PSU --> FUSE[Fusible 15A]
        FUSE --> MAIN[Bus Principal 12V]
    end
    
    subgraph PCB["Placa Principal"]
        MAIN --> VREG[Reguladores]
        VREG --> ESP[ESP32]
        VREG --> PERIPH[Periféricos]
    end
    
    subgraph SENSORS["Sensores"]
        SHT31[SHT31]
        DS18[DS18B20]
        LEVEL[Nivel Agua]
    end
    
    subgraph ACTUATORS["Actuadores"]
        HEAT[Calefactor]
        FAN[Ventilador]
        HUM[Humidificador]
    end
    
    subgraph UI["Interfaz"]
        DISP[Display]
        BTN[Botones]
        LED[LEDs]
    end
    
    ESP <--> SENSORS
    ESP --> ACTUATORS
    ESP <--> UI
```

## Color Code

### Power Cables

| Color | Function |
|-------|--------|
| 🔴 Red | +12V |
| ⚫ Black | GND |
| 🟠 Orange | +5V |
| 🟡 Yellow | +3.3V |

### Signal Cables

| Color | Function |
|-------|--------|
| 🔵 Blue | I2C SDA |
| 🟢 Green | I2C SCL |
| ⚪ White | 1-Wire Data |
| 🟣 Purple | PWM |
| 🟤 Brown | Digital signs |

## Power Connections

### AC Input and Source

```
                    ┌─────────────────────────────────────┐
                    │                                     │
 ● L (Vivo)────────┼─[INTERRUPTOR]─[FUSIBLE AC]─────► L │
                    │                                     │
 ● N (Neutro)──────┼────────────────────────────────► N │
                    │                                     │
 ● PE (Tierra)─────┼────────────────────────────────► PE│
                    │                                     │
                    │      FUENTE SWITCHING 12V/10A       │
                    │                                     │
                    │         +12V ●────────────────────►12V
                    │         GND  ●────────────────────►GND
                    │                                     │
                    └─────────────────────────────────────┘

Cable: 18AWG mínimo para AC
       16AWG para línea 12V principal
```

### DC Distribution

```
     +12V ────┬────────────────────────────────┬────► Calefactor (16AWG)
              │                                │
              ├────► Ventilador (20AWG)        │
              │                                │
              └────► PCB Principal (18AWG)     │
                                               │
                                    ┌──────────┴──────────┐
                                    │ FUSIBLE 15A         │
                                    └─────────────────────┘
```

## Sensor Connections

### SHT31 (I2C)

```
SHT31 Module        ESP32
────────────        ─────
VCC (Rojo)    ────► 3.3V
GND (Negro)   ────► GND
SDA (Azul)    ────► GPIO21
SCL (Verde)   ────► GPIO22

Cable: 4 hilos, 22AWG
Longitud máxima: 50cm
Conector: JST-XH 4 pines
```

### DS18B20 (1-Wire)

```
DS18B20 (Sonda)     ESP32
───────────────     ─────
VCC (Rojo)    ────► 3.3V
GND (Negro)   ────► GND
DATA (Amarillo)─┬─► GPIO5
                │
               [4.7K]
                │
               3.3V

Cable: Apantallado para >1m
Longitud máxima: 3m
Conector: JST-XH 3 pines
```

### Water Level Sensor

```
Reed Switch         ESP32
───────────         ─────
Terminal 1 ───┬───► GPIO39
              │
             [10K]
              │
             3.3V
              
Terminal 2 ────────► GND

Cable: 2 hilos, 22AWG
```

## Actuator Connections

### Heater

```
                      12V_MAIN
                          │
                     [FUSIBLE 10A]
                          │
                     [TERMOSTATO 45°C]
                          │
   GPIO25 ────────────────┴───────┐
                                  │
                             ┌────┴────┐
                             │ MOSFET  │
                             │ DRIVER  │
                             └────┬────┘
                                  │
                          ┌───────┴───────┐
                          │  CALEFACTOR   │
                          │    100W       │
                          └───────┬───────┘
                                  │
                                 GND

Cable: 16AWG para calefactor
       22AWG para señal de control
```

### Fan

```
                      12V_MAIN
                          │
   GPIO26 ─────────────┐  │
                       │  │
                  ┌────┴──┴────┐
                  │   MOSFET   │
                  │   DRIVER   │
                  └──────┬─────┘
                         │
                    ┌────┴────┐
                    │VENTILADOR│
                    │   12V    │
                    └────┬────┘
                         │
                        GND

Cable: 20AWG
Conector: 2 pines
```

### Humidifier

```
                        5V
                         │
   GPIO27 ───[1K]───┐    │
                    │    │
                ┌───┴────┴───┐
                │ TRANSISTOR │
                │   2N2222   │
                └──────┬─────┘
                       │
                  ┌────┴────┐
                  │HUMIDIF. │
                  │   5V    │
                  └────┬────┘
                       │
                      GND

Cable: 22AWG
Conector: JST-XH 2 pines
```

## Interface Connections

### LCD 20x4 (I2C)

```
LCD I2C Module      ESP32
──────────────      ─────
VCC          ─────► 5V
GND          ─────► GND
SDA          ─────► GPIO21 (compartido con SHT31)
SCL          ─────► GPIO22 (compartido con SHT31)

Cable: Cinta plana 4 hilos
Longitud: Según ubicación del display
Conector: JST-XH 4 pines
```

### Status LEDs

```
LED Rojo            ESP32
────────            ─────
Ánodo (+) ─[330Ω]─► GPIO12
Cátodo (-) ───────► GND

LED Verde           
─────────           
Ánodo (+) ─[330Ω]─► GPIO13
Cátodo (-) ───────► GND

LED Azul            
────────            
Ánodo (+) ─[330Ω]─► GPIO14
Cátodo (-) ───────► GND

Cable: 22AWG
```

### Buttons

```
BTN_UP              ESP32
──────              ─────
Terminal 1 ───┬───► GPIO33
              │
             [10K]
              │
             3.3V
              
Terminal 2 ───────► GND

(Repetir para BTN_DOWN:GPIO34, BTN_SELECT:GPIO35, BTN_BACK:GPIO36)

Cable: 22AWG
Conector: JST-XH 2 pines por botón
```

###Buzzer

```
                        5V
                         │
   GPIO32 ───[1K]───┐    │
                    │    │
                ┌───┴────┴───┐
                │ TRANSISTOR │
                │   2N2222   │
                └──────┬─────┘
                       │
                  ┌────┴────┐
                  │ BUZZER  │
                  │   5V    │
                  └────┬────┘
                       │
                      GND
```

## Cable Management

### Organization Techniques

1. **Group by function**:
- Separate signal supply
- Power cables away from sensors

2. **Identify with labels**:

```
   [SHT31-SDA] ─────────────►
   [SHT31-SCL] ─────────────►
   [DS18B20]   ─────────────►
   ```

3. **Use cable ties at regular intervals**:
- Every 10-15cm
- At change of direction points

4. **Respect radii of curvature**:
- Minimum 5x the diameter of the cable

### Example of Cable Harness

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌─────┐      ┌─────┐      ┌─────┐             │
│  │POWER│      │SENSE│      │ UI  │             │
│  │BUNDLE│     │BUNDLE│     │BUNDLE│            │
│  └──┬──┘      └──┬──┘      └──┬──┘             │
│     │            │            │                 │
│     │  ═════════════════════════════           │
│     │            │            │     (bridas)    │
│     │            │            │                 │
│     ▼            ▼            ▼                 │
│  [PCB]        [SENS]       [DISP]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Connection Summary Table

| Signal | GPIO | Connector | Cable | Color |
|-------|------|----------|-------|-------|
| SDA | 21 | J2 | 22AWG | Blue |
| SCL | 22 | J2 | 22AWG | Green |
| DHT22_DATA | 4 | J3 | 22AWG | White |
| DS18B20_DATA | 5 | J4 | 22AWG | Yellow |
| HEATER_PWM | 25 | J5 | 22AWG | Purple |
| FAN_PWM | 26 | J5 | 22AWG | Purple |
| HUMID_CTRL | 27 | J6 | 22AWG | Brown |
| BUZZER | 32 | J7 | 22AWG | Brown |
| LED_R | 12 | J8 | 22AWG | Red |
| LED_G | 13 | J8 | 22AWG | Green |
| LED_B | 14 | J8 | 22AWG | Blue |
| BTN_UP | 33 | J9 | 22AWG | Gray |
| BTN_DOWN | 34 | J9 | 22AWG | Gray |
| BTN_SELECT | 35 | J9 | 22AWG | Gray |
| BTN_BACK | 36 | J9 | 22AWG | Gray |
| WATER_LEVEL | 39 | J10 | 22AWG | White |

## Upcoming Sections

- [Tests](./testing)
