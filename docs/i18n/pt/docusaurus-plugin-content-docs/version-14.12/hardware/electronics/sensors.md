---
id: sensors
title: Sensores
sidebar_label: Sensores
sidebar_position: 2
description: Documentação dos sensores IncuNest
keywords: [sensores, temperatura, humedad, DHT22, SHT31]
---

# Sensores

## Sensores Soportados

## Temperatura e Humedad Ambiente

### SHT31 (Recomendado)

| Parâmetro | Especificação |
|-----------|----------------|
| Interface | I2C |
| Rango de temperatura | -40°C a 125°C |
| Precisão de temperatura | ±0.3°C |
| Rango de umidade | 0-100% RH |
| Precisão de umidade | ±2% RH |
| Voltaje | 2.4V - 5.5V |

**Conexão:**

```
SHT31          ESP32
─────          ─────
VCC    ───────  3.3V
GND    ───────  GND
SDA    ───────  GPIO21
SCL    ───────  GPIO22
```

### DHT22 (Alternativa econômica)

| Parâmetro | Especificação |
|-----------|----------------|
| Interface | 1-Wire (propio) |
| Rango de temperatura | -40°C a 80°C |
| Precisão de temperatura | ±0.5°C |
| Rango de umidade | 0-100% RH |
| Precisão de umidade | ±2-5% RH |
| Voltaje | 3.3V - 5V |

**Conexão:**

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

## Temperatura de Piel

### DS18B20 (Sonda impermeável)

| Parâmetro | Especificação |
|-----------|----------------|
| Interface | 1-Wire |
| Rango | -55°C a 125°C |
| Precisão | ±0.5°C (9-12 bits) |
| Resolução | Configurable 9-12 bits |
| Voltaje | 3.0V - 5.5V |

**Conexão:**

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

## Peso (Opcional)

### HX711 + Célula de Carga

| Parâmetro | Especificação |
|-----------|----------------|
| Resolução | 24 bits |
| Ganancia | 32, 64, 128 |
| Velocidade | 10/80 SPS |
| Carga máxima | Segundo célula (típico 5kg) |

**Conexão:**

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

## Código de Exemplo

## Leitura de SHT31

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

## Leitura do DS18B20

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

## Leitura de HX711 (Peso)

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

## Calibração de Sensores

## Calibração de Temperatura

1. Coloque um termômetro de referência certificado
2. Espere estabilização (10 minutos mínimo)
3. Compare leituras
4. Configuração do 'offset' em configuração:

```cpp
// En config.h
#define TEMP_OFFSET_AMBIENT  0.0f  // Ajustar si es necesario
#define TEMP_OFFSET_SKIN     0.0f
```

## Calibração de Humedad

Use soluções de sal saturada como referência:

| Solução | HR Esperada |
|----------|-------------|
| LiCl | 11,3% |
| NaCl | 75,3% |
| MgCl2 | 32.8% |

## Calibração de Peso

1. Coloque a célula de carga sem peso
2. Execute`scale.tare()`
3. Coloque um peso conhecido
4. Configuração`calibrationFactor` até obter leitura correta

# Validação de Leituras

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

## Próximas Secções

- [Actuadores] (./actuators) - Controlo de saídas
- [Display] (./display) - Ecrã e indicadores