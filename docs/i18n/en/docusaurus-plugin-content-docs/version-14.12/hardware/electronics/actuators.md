---
id: actuators
title: Actuadores
sidebar_label: Actuadores
sidebar_position: 3
description: Control de actuadores en IncuNest
keywords: [actuadores, calefactor, ventilador, MOSFET, PWM]
---
# Actuators

## Overview

IncuNest actuators control the thermal environment of the incubator:

| Actuator | Function | Control |
|----------|---------|---------|
| Heater | Heat the air | PWM |
| Fan | Air circulation | PWM |
| Humidifier | Increase humidity | On/Off |
| Buzzer | Audible alarms | PWM/Digital |

## Heater (Ceramic Resistance)

### Specifications

| Parameter | Value |
|-----------|-------|
| Power | 100W |
| Voltage | 12V DC |
| Max current | 8.3A |
| Type | PTC ceramic resistance |

### Control Circuit

```
      12V_PWR
         │
         │
    ┌────┴────┐
    │         │
   [Q1]      [Q2]     IRLZ44N x2 (paralelo)
    │         │
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ HEATER  │
    │  100W   │
    └────┬────┘
         │
        GND

Control PWM:
                    ┌─────────────────┐
    GPIO25 ────────┤ Driver MOSFET   │
                   │                 │
    3.3V ─────[10K]┤ Gate Q1, Q2     │
                   └─────────────────┘
```

### Detailed MOSFET Driver

```
                 VCC_12V
                    │
                   [R1]
                    │ 10K (pull-down gate)
    GPIO25 ────────┬─────────┐
                   │         │
                  ─┴─       ─┴─
                 │   │     │   │
                 │Q1 │     │Q2 │  IRLZ44N
                 │   │     │   │
                  ─┬─       ─┬─
                   │         │
                   └────┬────┘
                        │
                   ┌────┴────┐
                   │ HEATER  │
                   └────┬────┘
                        │
                       GND
```

### Control Code

```cpp
#define HEATER_PIN 25
#define HEATER_PWM_CHANNEL 0
#define HEATER_PWM_FREQ 1000  // 1 kHz
#define HEATER_PWM_RES 8      // 8 bits (0-255)

void setupHeater() {
    ledcSetup(HEATER_PWM_CHANNEL, HEATER_PWM_FREQ, HEATER_PWM_RES);
    ledcAttachPin(HEATER_PIN, HEATER_PWM_CHANNEL);
    ledcWrite(HEATER_PWM_CHANNEL, 0); // Iniciar apagado
}

void setHeaterPower(uint8_t power) {
    // power: 0-100%
    uint8_t dutyCycle = map(power, 0, 100, 0, 255);
    ledcWrite(HEATER_PWM_CHANNEL, dutyCycle);
}
```

## Fan

### Specifications

| Parameter | Value |
|-----------|-------|
| Voltage | 12V DC |
| Max current | 0.5A |
| Type | Brushless (brushless) |
| Speed | PWM variable |

### Control Circuit

```
      12V_PWR
         │
         │
    ┌────┴────┐
    │   FAN   │
    │   12V   │
    └────┬────┘
         │
        [Q3]     IRLZ44N o similar
         │
        GND

    GPIO26 ────[Gate Q3]
```

### Control Code

```cpp
#define FAN_PIN 26
#define FAN_PWM_CHANNEL 1
#define FAN_PWM_FREQ 25000   // 25 kHz (silencioso)
#define FAN_PWM_RES 8

void setupFan() {
    ledcSetup(FAN_PWM_CHANNEL, FAN_PWM_FREQ, FAN_PWM_RES);
    ledcAttachPin(FAN_PIN, FAN_PWM_CHANNEL);
    ledcWrite(FAN_PWM_CHANNEL, 0);
}

void setFanSpeed(uint8_t speed) {
    // speed: 0-100%
    uint8_t dutyCycle = map(speed, 0, 100, 0, 255);
    ledcWrite(FAN_PWM_CHANNEL, dutyCycle);
}
```

## Humidifier

### Specifications

| Parameter | Value |
|-----------|-------|
| Type | Ultrasonic |
| Voltage | 5V DC |
| Current | ~200mA |
| Control | On/Off |

### Control Circuit

```
      5V
       │
       │
  ┌────┴────┐
  │ HUMIDIF │
  │   5V    │
  └────┬────┘
       │
      [Q4]     2N2222 o similar
       │
      GND

  GPIO27 ───[1K]───[Base Q4]
```

### Control Code

```cpp
#define HUMIDIFIER_PIN 27

void setupHumidifier() {
    pinMode(HUMIDIFIER_PIN, OUTPUT);
    digitalWrite(HUMIDIFIER_PIN, LOW);
}

void setHumidifier(bool state) {
    digitalWrite(HUMIDIFIER_PIN, state ? HIGH : LOW);
}
```

## Buzzer (Sound Alarm)

### Specifications

| Parameter | Value |
|-----------|-------|
| Type | Active Piezoelectric |
| Voltage | 5V DC |
| Loudness | 85dB @ 10cm |
| Frequency | 2-4kHz |

### Circuit

```
      5V
       │
       │
  ┌────┴────┐
  │ BUZZER  │
  │   5V    │
  └────┬────┘
       │
      [Q5]     2N2222
       │
      GND

  GPIO32 ───[1K]───[Base Q5]
```

### Control Code

```cpp
#define BUZZER_PIN 32
#define BUZZER_PWM_CHANNEL 2

void setupBuzzer() {
    ledcSetup(BUZZER_PWM_CHANNEL, 2000, 8);
    ledcAttachPin(BUZZER_PIN, BUZZER_PWM_CHANNEL);
    ledcWrite(BUZZER_PWM_CHANNEL, 0);
}

void beep(uint16_t frequency, uint16_t duration) {
    ledcWriteTone(BUZZER_PWM_CHANNEL, frequency);
    delay(duration);
    ledcWriteTone(BUZZER_PWM_CHANNEL, 0);
}

void alarmPattern() {
    for (int i = 0; i < 3; i++) {
        beep(2000, 200);
        delay(100);
    }
}
```

## Security Protections

### Heater Protection

```cpp
#define MAX_HEATER_TEMP 40.0f
#define HEATER_TIMEOUT 30000 // 30 segundos sin cambio = alarma

void checkHeaterSafety(float currentTemp, uint8_t heaterPower) {
    static float lastTemp = 0;
    static uint32_t lastChange = 0;
    
    // Protección por sobretemperatura
    if (currentTemp > MAX_HEATER_TEMP) {
        setHeaterPower(0);
        raiseAlarm("Sobretemperatura");
        return;
    }
    
    // Protección por falta de respuesta
    if (heaterPower > 50 && abs(currentTemp - lastTemp) < 0.1) {
        if (millis() - lastChange > HEATER_TIMEOUT) {
            setHeaterPower(0);
            raiseAlarm("Calefactor sin respuesta");
        }
    } else {
        lastChange = millis();
    }
    
    lastTemp = currentTemp;
}
```

## Component List

| Ref | Component | Specification | Quantity |
|-----|--------|----------------|----------|
| Q1, Q2 | IRLZ44N | N-MOSFET 60V 50A | 2 |
| Q3 | IRLZ44N | N-MOSFET | 1 |
| Q4, Q5 | 2N2222 | NPN BJT | 2 |
| R1-R3 | Resistance | 10KΩ 1/4W | 3 |
| R4, R5 | Resistance | 1KΩ 1/4W | 2 |
| HEATER | Ceramic resistance | 100W 12V | 1 |
| FAN | Fan | 12V DC 80mm | 1 |
| HUMID | Ultrasonic module | 5V | 1 |
| BUZZER | Piezoelectric | 5V 85dB | 1 |

## Upcoming Sections

- [Display](./display) - Screen and indicators
- [Power Supply](./power-supply) - Power system
