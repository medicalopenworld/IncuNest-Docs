---
id: actuators
title: Actionneurs
sidebar_label: Actionneurs
sidebar_position: 3
description: Contrôle des actionneurs en Espagne
keywords: [actuadores, calefactor, ventilador, MOSFET, PWM]
---

♪ Actionneurs

Vision générale

Les actionneurs IncuNest contrôlent l'environnement thermique de l'incubateur:

- 124; actionneur - 124; fonction - 124; contrôle - 124;
- 124;
- 124; Calefactor - 124; Chauffer l'air - 124; PWM - 124;
- 124; ventilateur - 124; circulation aérienne - 124; PWM - 124;
- 124; Humidificateur - 124; Augmenter l'humidité - 124; Sur / Hors - 124;
- 124; Buzzer - 124; Alarmes sonores - 124; PWM / Digital - 124;

# # # Calefactor (résistance cérébrale)

Spécifications

124; Paramètre 124; Valeur 124;
- 124; - 124; - 124;
- 124; puissance - 124; 100W - 124;
- 124; tension - 124; 12V DC - 124;
124; courant maximal 124; 8.3A 124;
124; type 124; résistance céramique PTC 124;

Circuit de commande

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

# # Moteur MOSFET Détallées

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

Code de contrôle

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

Éventail

Spécifications

124; Paramètre 124; Valeur 124;
- 124; - 124; - 124;
- 124; tension - 124; 12V DC - 124;
124; courant maximal 124; 0,5A 124;
124; type 124; Pas de pinceaux;
124; vitesse 124; variable PWM 124;

Circuit de commande

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

Code de contrôle

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

Humidificateur

Spécifications

124; Paramètre 124; Valeur 124;
- 124; - 124; - 124;
124; type 124; ultrasonique 124;
- 124; tension - 124; 5V DC - 124;
- 124; - 124; ~ 200mA - 124;
- 124; contrôle - 124; marche/arrêt - 124;

Circuit de commande

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

Code de contrôle

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

# # Buzzer (Alarm Sonora)

Spécifications

124; Paramètre 124; Valeur 124;
- 124; - 124; - 124;
124; type 124; betterave électrique active 124;
- 124; tension - 124; 5V DC - 124;
- 124; score - 124; 85dB @ 10cm - 124;
124; fréquence 124; 2-4 kHz 124;

♪ Circuit ♪

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

Code de contrôle

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

Protections de sécurité

♪ Protection contre la chaleur

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

Liste des éléments

- 124; Ref - 124; Composant - 124; Spécification - 124; Quantité - 124;
- 124; - 124; - 124; - 124; - 124; - 124; - 124;
- 124; Q1, Q2 - 124; IRLZ44N - 124; N-MOSFET 60V 50A - 124; 2 - 124;
- 124; Q3 - 124; IRLZ44N - 124; N-MOSFET - 124; 1 - 124;
- 124; Q4, Q5 - 124; 2N2222 - 124; NPN BJT - 124; 2 - 124;
- 124; R1-R3 - 124; Résistance - 124;
- 124; R4, R5 - 124; Résistance - 124; 1Kш 1 / 4W - 124; 2 - 124;
- 124; HEATER-124; Résistance céramique-124; 100W-12V-124; 1-124;
- 124; FAN-124; ventilateur-124; 12V DC-80mm-124; 1-124;
- 124; HUMID-124; Module à ultrasons-124; 5V-124; 1-124;
- 124; BUZZER - 124; Piézoélectrique - 124; 5V 85dB - 124; 1 - 124;

Sections suivantes

- [Affichage] (@ @ URL0 @) - Écran et indicateurs
- [Source d'énergie] (@ @ URL1 @) - Système d'alimentation