---
id: sensors
title: Sensores
sidebar_label: Sensores
sidebar_position: 2
description: Documentación de los sensores de IncuNest
keywords: [sensores, temperatura, humedad, DHT22, SHT31]
---

# Sensores

## Sensores Soportados

### Temperatura y Humedad Ambiente

#### SHT31 (Recomendado)

| Parámetro | Especificación |
|-----------|----------------|
| Interfaz | I2C |
| Rango de temperatura | -40°C a 125°C |
| Precisión de temperatura | ±0.3°C |
| Rango de humedad | 0-100% RH |
| Precisión de humedad | ±2% RH |
| Voltaje | 2.4V - 5.5V |

**Conexión:**

```
SHT31          ESP32
─────          ─────
VCC    ───────  3.3V
GND    ───────  GND
SDA    ───────  GPIO21
SCL    ───────  GPIO22
```

#### DHT22 (Alternativa económica)

| Parámetro | Especificación |
|-----------|----------------|
| Interfaz | 1-Wire (propio) |
| Rango de temperatura | -40°C a 80°C |
| Precisión de temperatura | ±0.5°C |
| Rango de humedad | 0-100% RH |
| Precisión de humedad | ±2-5% RH |
| Voltaje | 3.3V - 5V |

**Conexión:**

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

### Temperatura de Piel

#### DS18B20 (Sonda impermeable)

| Parámetro | Especificación |
|-----------|----------------|
| Interfaz | 1-Wire |
| Rango | -55°C a 125°C |
| Precisión | ±0.5°C (9-12 bits) |
| Resolución | Configurable 9-12 bits |
| Voltaje | 3.0V - 5.5V |

**Conexión:**

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

### Peso (Opcional)

#### HX711 + Celda de Carga

| Parámetro | Especificación |
|-----------|----------------|
| Resolución | 24 bits |
| Ganancia | 32, 64, 128 |
| Velocidad | 10/80 SPS |
| Carga máxima | Según celda (típico 5kg) |

**Conexión:**

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

## Código de Ejemplo

### Lectura de SHT31

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

### Lectura de DS18B20

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

### Lectura de HX711 (Peso)

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

## Calibración de Sensores

### Calibración de Temperatura

1. Coloque un termómetro de referencia certificado
2. Espere estabilización (10 minutos mínimo)
3. Compare lecturas
4. Ajuste el offset en configuración:

```cpp
// En config.h
#define TEMP_OFFSET_AMBIENT  0.0f  // Ajustar si es necesario
#define TEMP_OFFSET_SKIN     0.0f
```

### Calibración de Humedad

Use soluciones de sal saturada como referencia:

| Solución | HR Esperada |
|----------|-------------|
| LiCl | 11.3% |
| NaCl | 75.3% |
| MgCl₂ | 32.8% |

### Calibración de Peso

1. Coloque la celda de carga sin peso
2. Ejecute `scale.tare()`
3. Coloque un peso conocido
4. Ajuste `calibrationFactor` hasta obtener lectura correcta

## Validación de Lecturas

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

## Próximas Secciones

- [Actuadores](./actuators) - Control de salidas
- [Display](./display) - Pantalla e indicadores
