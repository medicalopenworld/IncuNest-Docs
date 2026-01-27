---
id: sensors
title: Sensores
sidebar_label: Sensors
sidebar_position: 2
description: Documentación de los sensores de IncuNest
keywords: [sensores, temperatura, humedad, DHT22, SHT31]
---
# Sensors

##Supported Sensors

### Ambient Temperature and Humidity

#### SHT31 (Recommended)

| Parameter | Specification |
|-----------|----------------|
| Interface | I2C |
| Temperature range | -40°C to 125°C |
| Temperature accuracy | ±0.3°C |
| Humidity range | 0-100% RH |
| Humidity Accuracy | ±2% RH |
| Voltage | 2.4V - 5.5V |

**Connection:**

```
SHT31          ESP32
─────          ─────
VCC    ───────  3.3V
GND    ───────  GND
SDA    ───────  GPIO21
SCL    ───────  GPIO22
```

#### DHT22 (Economic alternative)

| Parameter | Specification |
|-----------|----------------|
| Interface | 1-Wire (own) |
| Temperature range | -40°C to 80°C |
| Temperature accuracy | ±0.5°C |
| Humidity range | 0-100% RH |
| Humidity Accuracy | ±2-5% RH |
| Voltage | 3.3V - 5V |

**Connection:**

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

### Skin Temperature

#### DS18B20 (Waterproof probe)

| Parameter | Specification |
|-----------|----------------|
| Interface | 1-Wire |
| Range | -55°C to 125°C |
| Precision | ±0.5°C (9-12 bits) |
| Resolution | Configurable 9-12 bits |
| Voltage | 3.0V - 5.5V |

**Connection:**

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

### Weight (Optional)

#### HX711 + Load Cell

| Parameter | Specification |
|-----------|----------------|
| Resolution | 24 bit |
| Profit | 32, 64, 128 |
| Speed | 10/80 SPS |
| Maximum load | Depending on cell (typical 5kg) |

**Connection:**

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

## Example Code

### Reading SHT31

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

### Reading DS18B20

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

### HX711 Reading (Weight)

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

## Sensor Calibration

### Temperature Calibration

1. Place a certified reference thermometer
2. Wait for stabilization (10 minutes minimum)
3. Compare readings
4. Adjust the offset in configuration:

```cpp
// En config.h
#define TEMP_OFFSET_AMBIENT  0.0f  // Ajustar si es necesario
#define TEMP_OFFSET_SKIN     0.0f
```

### Humidity Calibration

Use saturated salt solutions as reference:

| Solution | Expected HR |
|----------|-------------|
| LiCl | 11.3% |
| NaCl | 75.3% |
| MgCl₂ | 32.8% |

### Weight Calibration

1. Place the load cell without weight
2. Run `scale.tare()`
3. Place a known weight
4. Adjust `calibrationFactor` until correct reading

## Reading Validation

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

## Upcoming Sections

- [Actuators](./actuators) - Output control
- [Display](./display) - Screen and indicators
