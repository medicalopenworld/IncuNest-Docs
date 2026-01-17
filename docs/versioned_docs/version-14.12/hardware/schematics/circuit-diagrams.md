---
id: circuit-diagrams
title: Diagramas de Circuito
sidebar_label: Diagramas de Circuito
sidebar_position: 1
description: Diagramas esquemáticos de los circuitos de IncuNest
keywords: [esquemático, circuito, diagrama, electrónica]
---

# Diagramas de Circuito

## Visión General del Sistema

El sistema electrónico de IncuNest se compone de varios módulos interconectados:

```
┌─────────────────────────────────────────────────────────────┐
│                    FUENTE DE ALIMENTACIÓN                   │
│                         12V / 10A                           │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  REGULADOR  │  │  CALEFACTOR │  │  DRIVER     │
│  3.3V/5V    │  │   100W      │  │  MOTOR      │
└─────┬───────┘  └─────────────┘  └─────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│                      PLACA PRINCIPAL                         │
│                       ESP32-WROOM-32                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ SENSORES │  │ACTUADORES│  │ DISPLAY  │  │  WiFi    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Esquema de Alimentación

### Entrada Principal

```
AC 110-220V ──┬── Fusible 3A ──── Switch ──── PSU 12V/10A
              │
              └── PE (Tierra)
```

### Reguladores de Voltaje

**Módulo de 5V (para display y algunos sensores):**

```
                    7805 / AMS1117-5.0
      12V ────┬────────[●]────────┬──── 5V
              │        │GND       │
             C1       ─┴─        C2
            100µF     GND       10µF
              │                   │
             ─┴─                 ─┴─
             GND                 GND
```

**Módulo de 3.3V (para ESP32 y sensores I2C):**

```
                    AMS1117-3.3
      5V ─────┬────────[●]────────┬──── 3.3V
              │        │GND       │
             C1       ─┴─        C2
            10µF      GND        10µF
              │                   │
             ─┴─                 ─┴─
             GND                 GND
```

## Conexión ESP32

### Pinout Utilizado

```
                    ESP32-WROOM-32
                    ┌─────────────┐
           EN ──┤1           38├── GND
      GPIO36(VP)──┤2           37├── GPIO23
      GPIO39(VN)──┤3           36├── GPIO22 ─── I2C SCL
      GPIO34 ─────┤4           35├── GPIO21 ─── I2C SDA
      GPIO35 ─────┤5           34├── GPIO19 ─── SSR Heater
      GPIO32 ─────┤6           33├── GPIO18 ─── Fan PWM
      GPIO33 ─────┤7           32├── GPIO17 ─── TX2
      GPIO25 ─────┤8           31├── GPIO16 ─── RX2
      GPIO26 ─────┤9           30├── GPIO4 ──── OneWire
      GPIO27 ─────┤10          29├── GPIO2 ──── LED Status
  Humidifier ─────┤11 GPIO14   28├── GPIO15 ─── Buzzer
             ─────┤12 GPIO12   27├── GPIO13
             ─────┤13 GND      26├── GND
             ─────┤14 VIN      25├── GPIO0
       3.3V ──────┤15 3V3      24├── GPIO5
                  └─────────────┘
```

### Asignación de Pines

| Pin | Función | Descripción |
|-----|---------|-------------|
| GPIO21 | I2C SDA | Datos I2C (SHT31, Display) |
| GPIO22 | I2C SCL | Reloj I2C |
| GPIO4 | OneWire | Sensor DS18B20 |
| GPIO19 | SSR Control | Control calefactor (PWM) |
| GPIO18 | Fan PWM | Control velocidad ventilador |
| GPIO14 | Humidifier | Control humidificador |
| GPIO15 | Buzzer | Alarma sonora |
| GPIO2 | LED | LED de estado |

## Circuito de Sensores

### SHT31 (I2C)

```
                 SHT31
                ┌─────┐
    3.3V ───────┤VDD  │
                │     │
    GND ────────┤GND  │
                │     │
    GPIO21 ─────┤SDA  │
                │     │
    GPIO22 ─────┤SCL  │
                │     │
    3.3V ───┬───┤ADDR │  (ADDR a VDD = 0x45, a GND = 0x44)
            │   └─────┘
            │
           R1
          10kΩ (pull-up SDA)
            │
    GPIO21 ─┘
            
           R2
          10kΩ (pull-up SCL)
            │
    GPIO22 ─┘
```

### DS18B20 (OneWire)

```
                DS18B20
               ┌───────┐
               │   ┌┐  │
               │   └┘  │
    GND ───────┤1      │
               │       │
    GPIO4 ─────┤2 DQ   │
               │       │
    3.3V ──────┤3      │
               └───────┘
                  │
                  │
    GPIO4 ────────┼─────── R1 4.7kΩ ──── 3.3V
                  │
                 (Cable apantallado recomendado)
```

### HX711 (Load Cell) - Opcional

```
                  HX711
                ┌───────┐
    5V ─────────┤VCC    │
    GND ────────┤GND    │
    GPIO32 ─────┤DT     │
    GPIO33 ─────┤SCK    │
                │       │
    Celda E+ ───┤E+     │
    Celda E- ───┤E-     │
    Celda A+ ───┤A+     │
    Celda A- ───┤A-     │
                └───────┘
```

## Circuito de Actuadores

### Control de Calefactor (SSR)

```
                     SSR-25DA
    GPIO19 ─────R1───┬───────┐
               1kΩ   │       │
                    LED      │ DC+
                     │       │
    GND ────────────┴───────┼─ DC-
                            │
                            │
    L (AC) ─────────────────┼─ AC1
                            │
    CALEFACTOR ─────────────┼─ AC2
        100W                │
                            │
    N (AC) ─────────────────┘

    Nota: Incluir snubber RC para protección
    
    Snubber: 0.1µF 400V + 100Ω en paralelo con carga
```

### Control de Ventilador (PWM)

```
                         IRF540N (MOSFET)
                        ┌─────────┐
    GPIO18 ──R1──┬──────┤G        │
            1kΩ  │      │    D    ├──── Motor Fan +
                 R2     │         │
               10kΩ     │    S    ├──── GND
                 │      └─────────┘
    GND ─────────┘            │
                              D1 (Flyback)
                          1N5819
    12V ──────────────────────┴────── Motor Fan -
```

### Control de Humidificador

```
    GPIO14 ──R1──┬──────┤B  2N2222  │
            1kΩ  │      │     C     ├──── Relay Coil +
                 R2     │     E     │
               10kΩ     └─────┬─────┘
                 │            │
    GND ─────────┴────────────┘
    
           Relay 5V
         ┌─────────┐
    5V ──┤+  Coil  │
         │    NO ──┼───── Humidifier +
         │    COM ─┼───── 12V
         └─────────┘
         
    D1 1N4007 en paralelo con coil (flyback)
```

### Buzzer

```
    GPIO15 ──R1──┬──────┤B  2N2222  │
            1kΩ  │      │     C     ├──── Buzzer +
                 │      │     E     │
                 │      └─────┬─────┘
    GND ─────────┴────────────┴───────── Buzzer -
    
    Buzzer activo 5V, 85dB
```

## Circuito de Display

### LCD 20x4 I2C (PCF8574)

```
                   LCD 20x4
                  ┌─────────┐
    5V ───────────┤VCC      │
    GND ──────────┤GND      │
    GPIO21 ───────┤SDA      │
    GPIO22 ───────┤SCL      │
                  └─────────┘
    
    Dirección I2C: 0x27 (típico) o 0x3F
    
    Nota: Ajustar contraste con potenciómetro en módulo I2C
```

### TFT 3.5" ILI9488 (SPI) - Alternativa

```
                   TFT 3.5"
                  ┌─────────┐
    5V ───────────┤VCC      │
    GND ──────────┤GND      │
    GPIO18 ───────┤SCK      │  (Compartido)
    GPIO23 ───────┤MOSI     │
    GPIO19 ───────┤MISO     │
    GPIO5 ────────┤CS       │
    GPIO4 ────────┤DC       │  (Usar otro pin)
    GPIO2 ────────┤RST      │  (Usar otro pin)
    3.3V ─────────┤LED      │
                  └─────────┘
```

## Protecciones

### Protección de Entrada

```
    12V IN ──┬── F1 ──┬── TVS ──┬── D1 ──── +12V
             │  10A   │  P6KE15 │  SS34
            C1        │         │
           470µF      │        C2
            │        │       1000µF
    GND ────┴─────────┴─────────┴──────── GND
```

### Protección I2C

```
    3.3V ──── R1 ──── SDA line
             4.7kΩ
             
    SDA ─────┬─── TVS ─── GND
             │   PESD5V0
             └─── ESP32 GPIO21
```

## Notas de Diseño

### Consideraciones EMC

1. Usar plano de tierra continuo
2. Separar sección de potencia de señales
3. Cables de sensores apantallados
4. Filtros en líneas de alimentación

### Disipación Térmica

- SSR puede requerir disipador si carga > 5A continuo
- MOSFET del ventilador: disipador pequeño recomendado

### Conectores Recomendados

| Conector | Uso |
|----------|-----|
| JST-XH 2.54mm | Sensores |
| Molex 4-pin | Ventilador |
| Terminal block | Alimentación, calefactor |
| USB Micro B | Programación ESP32 |

## Próximas Secciones

- [Layout del PCB](./pcb-layout)
- [Archivos Gerber](./gerber-files)
