---
id: actuators
title: Actuadores
sidebar_label: Actuadores
sidebar_position: 3
description: Control de actuadores en IncuNest
keywords: [actuadores, calefactor, ventilador, MOSFET, PWM]
---

# Actuadores

## Visión General

Los actuadores de IncuNest controlan el ambiente térmico de la incubadora:

| Actuador | Función | Control |
|----------|---------|---------|
| Calefactor | Calentar el aire | PWM |
| Ventilador | Circulación de aire | PWM |
| Humidificador | Aumentar humedad | On/Off |
| Buzzer | Alarmas sonoras | PWM/Digital |

## Calefactor (Resistencia Cerámica)

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Potencia | 100W |
| Voltaje | 12V DC |
| Corriente máx | 8.3A |
| Tipo | Resistencia cerámica PTC |

### Circuito de Control

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

### Driver MOSFET Detallado

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

### Código de Control

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

## Ventilador

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Voltaje | 12V DC |
| Corriente máx | 0.5A |
| Tipo | Sin escobillas (brushless) |
| Velocidad | Variable PWM |

### Circuito de Control

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

### Código de Control

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

## Humidificador

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Tipo | Ultrasónico |
| Voltaje | 5V DC |
| Corriente | ~200mA |
| Control | On/Off |

### Circuito de Control

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

### Código de Control

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

## Buzzer (Alarma Sonora)

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Tipo | Piezoeléctrico activo |
| Voltaje | 5V DC |
| Sonoridad | 85dB @ 10cm |
| Frecuencia | 2-4 kHz |

### Circuito

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

### Código de Control

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

## Protecciones de Seguridad

### Protección del Calefactor

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

## Lista de Componentes

| Ref | Componente | Especificación | Cantidad |
|-----|------------|----------------|----------|
| Q1, Q2 | IRLZ44N | N-MOSFET 60V 50A | 2 |
| Q3 | IRLZ44N | N-MOSFET | 1 |
| Q4, Q5 | 2N2222 | NPN BJT | 2 |
| R1-R3 | Resistencia | 10KΩ 1/4W | 3 |
| R4, R5 | Resistencia | 1KΩ 1/4W | 2 |
| HEATER | Resistencia cerámica | 100W 12V | 1 |
| FAN | Ventilador | 12V DC 80mm | 1 |
| HUMID | Módulo ultrasónico | 5V | 1 |
| BUZZER | Piezoeléctrico | 5V 85dB | 1 |

## Próximas Secciones

- [Display](./display) - Pantalla e indicadores
- [Fuente de Alimentación](./power-supply) - Sistema de potencia
