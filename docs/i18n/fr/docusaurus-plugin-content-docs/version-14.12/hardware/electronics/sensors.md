---
id: sensors
title: Capteur
sidebar_label: Capteur
sidebar_position: 2
description: Documentation des capteurs IncuNest
keywords: [sensores, temperatura, humedad, DHT22, SHT31]
---

♪ Capteur

Capteurs supportés

Environnement de température et d'humidité

# # # SHT31 (Recommandé)

124; Paramètre 124; Spécification 124;
- 124; - 124;
- 124; Interface - 124; I2C - 124;
124; plage de température - 124; -40 ° C à 125 ° C - 124;
124; précision de température 124; ± 0,3 ° C 124;
- 124; gamme d'humidité - 124; 0-100 % - RH - 124;
124; a) précision de l'humidité 124; ± 2 % HR 124;
- 124; tension - 124; 2,4V - 5,5V - 124V;

* * Connexion: * *

```
SHT31          ESP32
─────          ─────
VCC    ───────  3.3V
GND    ───────  GND
SDA    ───────  GPIO21
SCL    ───────  GPIO22
```

DHT22 (alternative économique)

124; Paramètre 124; Spécification 124;
- 124; - 124;
- 124; Interface - 124; 1-Wire (own) - 124;
124; plage de température - 124; -40 ° C à 80 ° C - 124;
124; précision de température 124; ± 0,5 °C 124;
- 124; gamme d'humidité - 124; 0-100 % - RH - 124;
124; la précision d'humidité du produit est de 124; ± 2-5% HR est de 124;
- 124; tension - 124; 3.3V - 5V - 124;

* * Connexion: * *

```
DHT22          ESP32
─────          ─────
VCC    ───────  3.3V
GND    ───────  GND
DATA   ──┬────  GPIO4
         │
        [4.7K]
         │
        3.3V
```

Température de la peau

# # # # DS18B20 (Sons étanches)

124; Paramètre 124; Spécification 124;
- 124; - 124;
- 124; Interface - 124; 1-Wire - 124;
- 124; gamme - 124; -55 ° C à 125 ° C - 124;
- 124; précision - 124; ± 0,5 ° C (9-12 bits) - 124;
124; Résolution 124; 9-12 bits configurables 124;
- 124; tension - 124; 3.0V - 5.5V - 124V;

* * Connexion: * *

```
DS18B20        ESP32
───────        ─────
VCC (Rojo)  ──  3.3V
GND (Negro) ──  GND
DATA (Amarillo) ─┬──  GPIO5
                 │
                [4.7K]
                 │
                3.3V
```

Poids (optionnel)

# # # HX711 + Cargo Cellule

124; Paramètre 124; Spécification 124;
- 124; - 124;
124; Résolution 124; 24 bits 124;
- 124; gagnant - 124; 32, 64, 128 - 124;
124; vitesse 124; 10 / 80 SPS 124;
- 124; charge maximale - 124; selon la cellule (typique 5 kg) - 124;

* * Connexion: * *

```
HX711          ESP32
─────          ─────
VCC    ───────  5V
GND    ───────  GND
DT     ───────  GPIO16
SCK    ───────  GPIO17

Celda          HX711
─────          ─────
E+     ───────  E+
E-     ───────  E-
A+     ───────  A+
A-     ───────  A-
```

# # Code exemple

# # # # SHT31 lecture

```cpp
#include <Wire.h>
#include <Adafruit_SHT31.h>

Adafruit_SHT31 sht31 = Adafruit_SHT31();

void setup() {
    Serial.begin(115200);
    
    if (!sht31.begin(0x44)) {
        Serial.println("Error: SHT31 no encontrado");
        while (1) delay(1);
    }
}

void loop() {
    float temp = sht31.readTemperature();
    float hum = sht31.readHumidity();
    
    if (!isnan(temp)) {
        Serial.printf("Temperatura: %.2f°C\n", temp);
    }
    if (!isnan(hum)) {
        Serial.printf("Humedad: %.2f%%\n", hum);
    }
    
    delay(1000);
}
```

# # La lecture DS18B20

```cpp
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 5

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
    Serial.begin(115200);
    sensors.begin();
}

void loop() {
    sensors.requestTemperatures();
    float tempC = sensors.getTempCByIndex(0);
    
    if (tempC != DEVICE_DISCONNECTED_C) {
        Serial.printf("Temperatura piel: %.2f°C\n", tempC);
    }
    
    delay(1000);
}
```

# # HX711 (Poids) lecture

```cpp
#include <HX711.h>

#define HX711_DT  16
#define HX711_SCK 17

HX711 scale;
float calibrationFactor = 2280.0; // Ajustar según calibración

void setup() {
    Serial.begin(115200);
    
    scale.begin(HX711_DT, HX711_SCK);
    scale.set_scale(calibrationFactor);
    scale.tare();
}

void loop() {
    float weight = scale.get_units(10); // Promedio de 10 lecturas
    Serial.printf("Peso: %.2f g\n", weight);
    delay(500);
}
```

Étalonnage des capteurs

# # Étalonnage de température

1. Placer un thermomètre de référence certifié
2. Attendre la stabilisation (10 minutes minimum)
3. Comparer les lectures
4. Régler le décalage en configuration:

```cpp
// En config.h
#define TEMP_OFFSET_AMBIENT  0.0f  // Ajustar si es necesario
#define TEMP_OFFSET_SKIN     0.0f
```

Étalonnage humide

Utiliser des solutions de sel saturé comme référence:

124; solution 124; RH attendu 124;
- 124; - 124; - 124;
- 124; LCl - 124; 11,3% - 124;
- 124; NaCl - 124; 75,3% - 124;
- 124; MgCl - 124; 32,8% - 124;

Étalonnage du poids

1. Placer la cellule de charge sans poids
2. Exécuter @ @ CODE0 @
3. Placer un poids connu
4. Ajuster @ @ CODE1 @ @ jusqu'à ce que vous obteniez la lecture correcte

La validation de la lecture

```cpp
struct SensorReading {
    float value;
    bool valid;
    uint32_t timestamp;
};

SensorReading validateReading(float value, float min, float max) {
    SensorReading reading;
    reading.timestamp = millis();
    
    if (isnan(value) || value < min || value > max) {
        reading.valid = false;
        reading.value = 0;
    } else {
        reading.valid = true;
        reading.value = value;
    }
    
    return reading;
}
```

Sections suivantes

- [Activateurs] (@ @ URL0 @) - Contrôle de sortie
- [Affichage] (@ @ URL1 @) - Écran et indicateurs