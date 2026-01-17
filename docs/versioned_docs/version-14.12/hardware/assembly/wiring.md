---
id: wiring
title: Cableado
sidebar_label: Cableado
sidebar_position: 4
description: Guía de cableado de IncuNest
keywords: [cableado, conexiones, cables, instalación]
---

# Cableado

## Diagrama General de Conexiones

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

## Código de Colores

### Cables de Alimentación

| Color | Función |
|-------|---------|
| 🔴 Rojo | +12V |
| ⚫ Negro | GND |
| 🟠 Naranja | +5V |
| 🟡 Amarillo | +3.3V |

### Cables de Señal

| Color | Función |
|-------|---------|
| 🔵 Azul | I2C SDA |
| 🟢 Verde | I2C SCL |
| ⚪ Blanco | Datos 1-Wire |
| 🟣 Morado | PWM |
| 🟤 Marrón | Señales digitales |

## Conexiones de Alimentación

### Entrada AC y Fuente

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

### Distribución DC

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

## Conexiones de Sensores

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

### Sensor de Nivel de Agua

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

## Conexiones de Actuadores

### Calefactor

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

### Ventilador

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

### Humidificador

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

## Conexiones de Interfaz

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

### LEDs de Estado

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

### Botones

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

### Buzzer

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

## Gestión de Cables

### Técnicas de Organización

1. **Agrupar por función**:
   - Alimentación separada de señales
   - Cables de potencia alejados de sensores

2. **Identificar con etiquetas**:
   ```
   [SHT31-SDA] ─────────────►
   [SHT31-SCL] ─────────────►
   [DS18B20]   ─────────────►
   ```

3. **Usar bridas en intervalos regulares**:
   - Cada 10-15cm
   - En puntos de cambio de dirección

4. **Respetar radios de curvatura**:
   - Mínimo 5x el diámetro del cable

### Ejemplo de Mazo de Cables

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

## Tabla Resumen de Conexiones

| Señal | GPIO | Conector | Cable | Color |
|-------|------|----------|-------|-------|
| SDA | 21 | J2 | 22AWG | Azul |
| SCL | 22 | J2 | 22AWG | Verde |
| DHT22_DATA | 4 | J3 | 22AWG | Blanco |
| DS18B20_DATA | 5 | J4 | 22AWG | Amarillo |
| HEATER_PWM | 25 | J5 | 22AWG | Morado |
| FAN_PWM | 26 | J5 | 22AWG | Morado |
| HUMID_CTRL | 27 | J6 | 22AWG | Marrón |
| BUZZER | 32 | J7 | 22AWG | Marrón |
| LED_R | 12 | J8 | 22AWG | Rojo |
| LED_G | 13 | J8 | 22AWG | Verde |
| LED_B | 14 | J8 | 22AWG | Azul |
| BTN_UP | 33 | J9 | 22AWG | Gris |
| BTN_DOWN | 34 | J9 | 22AWG | Gris |
| BTN_SELECT | 35 | J9 | 22AWG | Gris |
| BTN_BACK | 36 | J9 | 22AWG | Gris |
| WATER_LEVEL | 39 | J10 | 22AWG | Blanco |

## Próximas Secciones

- [Pruebas](./testing)
