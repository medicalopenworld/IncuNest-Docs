---
id: circuit-diagrams
title: Schémas de circuits
sidebar_label: Schémas de circuits
sidebar_position: 1
description: Diagrammes schématiques des circuits IncuNest
keywords: [esquemático, circuito, diagrama, electrónica]
---

Schémas de circuits

La vision générale du système

Le système électronique IncuNest se compose de plusieurs modules interconnectés:

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

Régime alimentaire

Entrée principale

```
AC 110-220V ──┬── Fusible 3A ──── Switch ──── PSU 12V/10A
              │
              └── PE (Tierra)
```

Les régulateurs de tension

* * * Module 5V (pour affichage et certains capteurs): * *

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

Module 3.3V (pour les capteurs SP32 et I2C): * *

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

Connexion SP32

Pinout utilisé

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

Attribution des pins

124; épingle 124; fonction 124; description 124;
- 124; - 124; - 124;
- 124; GPIO21-124; I2C-SDA-124; données I2C (SHT31, Affichage)-124;
- 124; GPIO22-124; I2C-SCL-124; horloge I2C-124;
124; GPIO4 - 124; OneWire - 124; capteur DS18B20 - 124;
124; GPIO19 - 124; SSR Control - 124; Heaters Control (PWM) - 124;
- 124; GPIO18 - 124; ventilateur PWM - 124; régulateur de vitesse du ventilateur - 124;
- 124; GPIO14 - 124; Humidificateur - 124; Humidificateur - 124;
124; GPIO15 - 124; Buzzer - 124; Alarme sonore - 124;
- 124; GPIO2-124; LED-124; LED-état-124;

Circuit des capteurs

# # # SHT31 (I2C)

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

# # DS18B20 (OneWire)

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

# # HX711 (Cellule de charge) - Facultatif

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

Circuit actionneur

Contrôle du facteur caléactif (RSS)

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

Contrôle du ventilateur (PWM)

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

Contrôle de l'humidificateur

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

Buzzer

```
    GPIO15 ──R1──┬──────┤B  2N2222  │
            1kΩ  │      │     C     ├──── Buzzer +
                 │      │     E     │
                 │      └─────┬─────┘
    GND ─────────┴────────────┴───────── Buzzer -
    
    Buzzer activo 5V, 85dB
```

Circuit d'affichage

ACL 20x4 I2C (PCF8574)

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

# # # # TFT 3.5 "ILI9488 (SPI) - Alternative

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

Protection

Protection d'entrée

```
    12V IN ──┬── F1 ──┬── TVS ──┬── D1 ──── +12V
             │  10A   │  P6KE15 │  SS34
            C1        │         │
           470µF      │        C2
            │        │       1000µF
    GND ────┴─────────┴─────────┴──────── GND
```

# # Protection I2C

```
    3.3V ──── R1 ──── SDA line
             4.7kΩ
             
    SDA ─────┬─── TVS ─── GND
             │   PESD5V0
             └─── ESP32 GPIO21
```

Remarques de conception

Considérations concernant la CEM

1. Utiliser un plan au sol continu
2. Section séparée de la puissance du signal
3. Câbles capteurs
4. Filtres dans les lignes électriques

La dissipation thermique

- SSR peut nécessiter un dissipateur si vous chargez > 5A en continu
- Ventilateur MOSFET: faible dissipateur recommandé

Connecteurs recommandés

- 124; Connecteur - 124; Utilisation - 124;
- 124; - 124; - 124;
- 124; JST-XH 2,54 mm - 124; Capteurs - 124;
- 124; Molex 4 broches - 124; ventilateur - 124;
- 124; terminal de blocs - 124; alimentation, chauffage - 124;
- 124; USB Micro B-124; programmation ESP32-124;

Sections suivantes

- [Plan du CCP] (@ @ URL0 @)
- [Fichier Gerber] (@ @ URL1 @)