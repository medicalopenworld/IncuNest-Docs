---
id: simulation
title: Simulation du Hardware
sidebar_label: Simulation
sidebar_position: 2
description: Guide pour simuler le matériel IncuNest avec Wokwi
keywords: [simulation, Wokwi, hardware, ESP32, développement, tests]
---

# Simulation du Hardware

## Introduction

La simulation du matériel permet de tester et développer le firmware d'IncuNest sans avoir besoin de tous les composants physiques. Nous utilisons [Wokwi](https://wokwi.com/), un simulateur électronique en ligne qui prend en charge l'ESP32 et de nombreux composants utilisés dans ce projet.

:::tip Avantages de la Simulation
- **Développement rapide** : Testez le code sans matériel physique
- **Débogage sécurisé** : Aucun risque d'endommager les composants
- **Accessibilité** : Tout le monde peut contribuer au projet
- **Éducation** : Idéal pour apprendre le système
:::

## Démarrer avec Wokwi

### Prérequis

1. Navigateur web moderne (Chrome, Firefox, Edge)
2. Compte sur [Wokwi](https://wokwi.com/) (optionnel, mais recommandé pour sauvegarder les projets)
3. Connaissances de base Arduino/ESP32

### Créer un Nouveau Projet

1. Visitez [wokwi.com](https://wokwi.com/)
2. Cliquez sur "New Project"
3. Sélectionnez "ESP32" comme plateforme
4. Ajoutez les composants nécessaires depuis le panneau latéral

## Compatibilité des Composants BOM

Voici l'analyse de compatibilité entre les composants du [BOM IncuNest](./assembly/bom) et le matériel supporté par Wokwi.

### Composants Entièrement Supportés ✅

| Composant | Utilisation dans IncuNest | Composant Wokwi |
|-----------|---------------------------|-----------------|
| ESP32-WROOM-32 | MCU principal | `wokwi-esp32-devkit-v1` |
| DHT22 | Capteur temp/humidité (backup) | `wokwi-dht22` |
| DS18B20 | Capteur température de peau | `wokwi-ds18b20` |
| HX711 + Cellule de charge | Mesure de poids | `wokwi-hx711` |
| Module carte SD | Enregistrement de données | `wokwi-microsd-card` |
| LCD 20x4 I2C | Écran basique | `wokwi-lcd2004` |
| Buzzer | Alarme sonore | `wokwi-buzzer` |
| LEDs RGB | Indicateurs d'état | `wokwi-rgb-led` |
| Boutons-poussoirs | Interface utilisateur | `wokwi-pushbutton` |
| Résistances | Divers circuits | `wokwi-resistor` |
| Thermistance NTC | Capteur température analogique | `wokwi-ntc-temperature-sensor` |
| Relais | Contrôle des actionneurs | `wokwi-relay-module` |
| Potentiomètre | Simulation capteurs analogiques | `wokwi-potentiometer` |

### Composants Partiellement Supportés ⚠️

| Composant | Utilisation dans IncuNest | Alternative Wokwi | Notes |
|-----------|---------------------------|-------------------|-------|
| DS3231 RTC | Horloge temps réel | Utiliser bibliothèque DS3231 | Compatible via I2C, pas de composant dédié |
| TFT ILI9488 | Écran avancé | `wokwi-ili9341` | ILI9341 compatible, résolution différente |
| Touch XPT2046 | Écran tactile | `wokwi-ili9341` | Inclus dans l'écran ILI9341 |
| MOSFET IRLZ44N | Contrôle PWM actionneurs | Simuler avec logique numérique | Pas de composant physique, simuler le comportement |
| Ventilateur 12V | Circulation d'air | `wokwi-led` comme indicateur | Utiliser LED pour visualiser l'état |
| Transistor 2N2222A | Contrôle de signaux | Simuler avec logique numérique | Pas de composant physique en simulation |

### Composants Non Supportés ❌

| Composant | Utilisation dans IncuNest | Alternative Suggérée |
|-----------|---------------------------|---------------------|
| SHT31 | Capteur temp/humidité principal | Utiliser DHT22 comme substitut |
| Résistance PTC 100W | Élément chauffant | Simuler avec variable dans le code |
| Humidificateur ultrasonique | Contrôle d'humidité | Simuler avec variable dans le code |
| KSD301 | Thermostat de sécurité 45°C | Simuler la logique de protection dans le code |
| Diode SS34 | Protection de circuit | Non nécessaire en simulation |
| Régulateurs AMS1117 | Régulation de tension | Non nécessaire en simulation |
| Alimentation | Alimentation du système | Non nécessaire en simulation |

## Projet de Simulation de Base

### Structure du Projet Wokwi

Un projet de simulation IncuNest basique nécessite les fichiers suivants :

```
incunest-simulation/
├── diagram.json      # Définition du circuit
├── wokwi.toml        # Configuration du projet
└── src/
    └── main.cpp      # Code source
```

### Schéma de Câblage de Base

```json
{
  "version": 1,
  "author": "IncuNest Project",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-esp32-devkit-v1", "id": "esp", "top": 0, "left": 0 },
    { "type": "wokwi-dht22", "id": "dht", "top": -50, "left": 150 },
    { "type": "wokwi-ds18b20", "id": "ds18", "top": -50, "left": 250 },
    { "type": "wokwi-lcd2004", "id": "lcd", "top": 150, "left": 0 },
    { "type": "wokwi-buzzer", "id": "buzzer", "top": -50, "left": 350 },
    { "type": "wokwi-led", "id": "heater_led", "top": 100, "left": 300, "attrs": { "color": "red" } },
    { "type": "wokwi-led", "id": "fan_led", "top": 100, "left": 350, "attrs": { "color": "blue" } }
  ],
  "connections": [
    ["esp:GND.1", "dht:GND", "black", ["v:20"]],
    ["esp:3V3", "dht:VCC", "red", ["v:10"]],
    ["esp:D4", "dht:DATA", "green", ["h:10"]],
    ["esp:GND.1", "ds18:GND", "black", ["v:30"]],
    ["esp:3V3", "ds18:VCC", "red", ["v:15"]],
    ["esp:D5", "ds18:DQ", "yellow", ["h:15"]],
    ["esp:GND.1", "lcd:GND", "black", ["v:40"]],
    ["esp:3V3", "lcd:VCC", "red", ["v:20"]],
    ["esp:D21", "lcd:SDA", "blue", ["h:20"]],
    ["esp:D22", "lcd:SCL", "purple", ["h:25"]],
    ["esp:D32", "buzzer:1", "orange", ["h:30"]],
    ["esp:GND.1", "buzzer:2", "black", ["v:50"]],
    ["esp:D25", "heater_led:A", "red", ["h:35"]],
    ["esp:GND.1", "heater_led:C", "black", ["v:55"]],
    ["esp:D26", "fan_led:A", "blue", ["h:40"]],
    ["esp:GND.1", "fan_led:C", "black", ["v:60"]]
  ]
}
```

### Code d'Exemple

```cpp
#include <Arduino.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

// Définition des broches (selon hardware/overview.md)
#define PIN_DHT22       4
#define PIN_DS18B20     5
#define PIN_HEATER_PWM  25
#define PIN_FAN_PWM     26
#define PIN_BUZZER      32

// Configuration des capteurs
DHT dht(PIN_DHT22, DHT22);
OneWire oneWire(PIN_DS18B20);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Variables de contrôle
float targetTemp = 36.5;
float currentTemp = 0;
float currentHumidity = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("IncuNest Simulation - Démarrage...");
  
  // Initialiser les capteurs
  dht.begin();
  sensors.begin();
  
  // Initialiser l'écran
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("IncuNest v14.12");
  lcd.setCursor(0, 1);
  lcd.print("Mode Simulation");
  
  // Configurer les broches de sortie
  pinMode(PIN_HEATER_PWM, OUTPUT);
  pinMode(PIN_FAN_PWM, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Lire les capteurs
  currentHumidity = dht.readHumidity();
  float dhtTemp = dht.readTemperature();
  
  sensors.requestTemperatures();
  float ds18Temp = sensors.getTempCByIndex(0);
  
  // Utiliser la température moyenne
  currentTemp = (dhtTemp + ds18Temp) / 2.0;
  
  // Contrôle simple de température
  if (currentTemp < targetTemp - 0.5) {
    digitalWrite(PIN_HEATER_PWM, HIGH);  // Allumer le chauffage
    digitalWrite(PIN_FAN_PWM, HIGH);     // Allumer le ventilateur
  } else if (currentTemp > targetTemp + 0.5) {
    digitalWrite(PIN_HEATER_PWM, LOW);   // Éteindre le chauffage
    digitalWrite(PIN_FAN_PWM, HIGH);     // Garder le ventilateur
  } else {
    digitalWrite(PIN_HEATER_PWM, LOW);
    digitalWrite(PIN_FAN_PWM, LOW);
  }
  
  // Mettre à jour l'écran
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(currentTemp, 1);
  lcd.print(" C    ");
  
  lcd.setCursor(0, 1);
  lcd.print("Hum:  ");
  lcd.print(currentHumidity, 1);
  lcd.print(" %    ");
  
  lcd.setCursor(0, 2);
  lcd.print("Cible: ");
  lcd.print(targetTemp, 1);
  lcd.print(" C  ");
  
  lcd.setCursor(0, 3);
  lcd.print("Statut: ");
  lcd.print(digitalRead(PIN_HEATER_PWM) ? "CHAUFF." : "STABLE ");
  
  // Journal série
  Serial.printf("T:%.1f H:%.1f Cible:%.1f\n", 
                currentTemp, currentHumidity, targetTemp);
  
  delay(2000);
}
```

## Intégration avec le Firmware

Pour une simulation plus complète, consultez les sections logicielles suivantes :

- [Architecture du Firmware](../software/firmware/architecture) - Structure du code
- [Configuration Initiale](../software/firmware/setup) - Configuration de l'environnement de développement
- [Système de Contrôle](../software/firmware/control-system) - Logique de contrôle PID
- [Intégration des Capteurs](../software/firmware/sensors-integration) - Gestion des capteurs

### Utiliser le Firmware Réel dans Wokwi

1. Clonez le dépôt du firmware IncuNest
2. Copiez les fichiers sources dans votre projet Wokwi
3. Ajustez les définitions de broches selon le schéma de simulation
4. Commentez ou simulez les composants non supportés

## Limitations de la Simulation

:::warning Différences avec le Matériel Réel
La simulation a des limitations importantes à considérer :
:::

### Impossible à Simuler

1. **Comportement thermique réel** : L'inertie thermique et la distribution de chaleur
2. **Bruit des capteurs** : Les lectures simulées sont idéales
3. **Temps de réponse** : Les actionneurs répondent instantanément
4. **Consommation d'énergie** : Pas de simulation de courant/puissance
5. **Communication WiFi réelle** : Simulation basique uniquement

### Recommandations

- Utilisez la simulation pour le développement et le débogage initial
- **Testez toujours avec du matériel réel** avant usage clinique
- Validez les algorithmes de contrôle avec des données réelles
- Considérez les tolérances des composants réels

## Ressources Supplémentaires

### Liens Utiles

- [Documentation Wokwi](https://docs.wokwi.com/)
- [Matériel Supporté par Wokwi](https://docs.wokwi.com/getting-started/supported-hardware)
- [Référence DHT22 dans Wokwi](https://docs.wokwi.com/parts/wokwi-dht22)
- [Référence ESP32 dans Wokwi](https://docs.wokwi.com/parts/wokwi-esp32-devkit-v1)
- [Référence HX711 dans Wokwi](https://docs.wokwi.com/parts/wokwi-hx711)

### Projets d'Exemple

- [Projet de simulation de base IncuNest](https://wokwi.com/) *(bientôt disponible)*
- [Exemples ESP32 avec capteurs](https://wokwi.com/projects)

## Contribuer à la Simulation

Si vous souhaitez améliorer l'environnement de simulation :

1. Identifiez les composants qui peuvent être mieux simulés
2. Créez des projets d'exemple sur Wokwi
3. Documentez vos découvertes et partagez-les avec la communauté
4. Consultez le guide de [Contribution](../contributing)

## Sections Suivantes

- [Composants Électroniques](./electronics/main-board) - Détails du matériel réel
- [Liste des Matériaux](./assembly/bom) - BOM complet du projet
- [Vue d'ensemble du Logiciel](../software/overview) - Architecture du firmware
