---
id: sensors-integration
title: Integración de Sensores
sidebar_label: Sensors
sidebar_position: 4
description: Guía de integración de sensores en el firmware de IncuNest
keywords: [sensores, SHT31, DS18B20, I2C, OneWire]
---
# Sensor Integration

##Supported Sensors

| Sensor | Type | Interface | Measurement |
|--------|------|-----------|----------|
| SHT31 | Digital | I2C | Temperature + Humidity |
| DS18B20 | Digital | OneWire | Temperature |
| DHT22 | Digital | Single-wire | Temperature + Humidity |
| HX711 | ADC | Digital | Weight |

## SHT31 Sensor

### Specifications

- Temperature range: -40°C to 125°C
- Accuracy: ±0.3°C
- Humidity range: 0-100% RH
- Humidity accuracy: ±2% RH
- Interface: I2C (400kHz)
- Addresses: 0x44 (ADDR=GND) or 0x45 (ADDR=VDD)

### Implementation

```cpp
#include <Adafruit_SHT31.h>

class SHT31Sensor {
private:
    Adafruit_SHT31 sht31_;
    uint8_t address_;
    bool initialized_;
    float lastTemp_;
    float lastHumidity_;
    unsigned long lastReadTime_;
    
    static constexpr unsigned long MIN_READ_INTERVAL = 500; // ms

public:
    SHT31Sensor(uint8_t address = 0x44) 
        : address_(address), initialized_(false) {}
    
    bool begin() {
        if (!sht31_.begin(address_)) {
            Serial.println("SHT31 not found!");
            return false;
        }
        
        // Configurar calentador interno (desactivado por defecto)
        sht31_.heater(false);
        
        initialized_ = true;
        Serial.printf("SHT31 initialized at 0x%02X\n", address_);
        return true;
    }
    
    bool read() {
        if (!initialized_) return false;
        
        // Limitar frecuencia de lectura
        unsigned long now = millis();
        if (now - lastReadTime_ < MIN_READ_INTERVAL) {
            return true; // Usar valores anteriores
        }
        
        float t = sht31_.readTemperature();
        float h = sht31_.readHumidity();
        
        if (isnan(t) || isnan(h)) {
            Serial.println("SHT31 read error");
            return false;
        }
        
        lastTemp_ = t;
        lastHumidity_ = h;
        lastReadTime_ = now;
        
        return true;
    }
    
    float getTemperature() { return lastTemp_; }
    float getHumidity() { return lastHumidity_; }
    bool isHealthy() { return initialized_ && !isnan(lastTemp_); }
};
```

### Considerations

1. **Condensation:** The sensor may give erroneous readings if condensation is present. Using the internal heater briefly may help.

2. **Response time:** ~8 seconds for temperature changes, ~8 seconds for humidity.

3. **Filtering:** It is recommended to apply moving average filter to reduce noise.

## DS18B20 Sensor

### Specifications

- Range: -55°C to +125°C
- Accuracy: ±0.5°C (in range -10°C to +85°C)
- Resolution: 9-12 bits configurable
- Interface: 1-Wire
- Conversion time: 750ms (12-bit)

### Implementation

```cpp
#include <OneWire.h>
#include <DallasTemperature.h>

class DS18B20Sensor {
private:
    OneWire oneWire_;
    DallasTemperature sensors_;
    DeviceAddress deviceAddress_;
    bool initialized_;
    float lastTemp_;
    uint8_t resolution_;

public:
    DS18B20Sensor(uint8_t pin, uint8_t resolution = 12) 
        : oneWire_(pin), sensors_(&oneWire_), 
          initialized_(false), resolution_(resolution) {}
    
    bool begin() {
        sensors_.begin();
        
        int deviceCount = sensors_.getDeviceCount();
        if (deviceCount == 0) {
            Serial.println("DS18B20 not found!");
            return false;
        }
        
        // Obtener dirección del primer dispositivo
        if (!sensors_.getAddress(deviceAddress_, 0)) {
            Serial.println("Unable to find address");
            return false;
        }
        
        // Configurar resolución
        sensors_.setResolution(deviceAddress_, resolution_);
        
        // Usar modo asíncrono
        sensors_.setWaitForConversion(false);
        
        initialized_ = true;
        
        // Imprimir dirección
        Serial.print("DS18B20 found: ");
        printAddress(deviceAddress_);
        
        return true;
    }
    
    void requestTemperature() {
        if (!initialized_) return;
        sensors_.requestTemperatures();
    }
    
    bool read() {
        if (!initialized_) return false;
        
        float temp = sensors_.getTempC(deviceAddress_);
        
        if (temp == DEVICE_DISCONNECTED_C) {
            Serial.println("DS18B20 disconnected");
            return false;
        }
        
        lastTemp_ = temp;
        return true;
    }
    
    float getTemperature() { return lastTemp_; }
    
    bool isHealthy() { 
        return initialized_ && lastTemp_ != DEVICE_DISCONNECTED_C; 
    }
    
private:
    void printAddress(DeviceAddress addr) {
        for (uint8_t i = 0; i < 8; i++) {
            if (addr[i] < 16) Serial.print("0");
            Serial.print(addr[i], HEX);
        }
        Serial.println();
    }
};
```

### Parasite vs Normal Mode

```cpp
// Verificar si está en modo parásito
bool isParasitePower = sensors_.isParasitePowerMode();

// En modo parásito, la línea de datos debe proporcionar energía
// durante la conversión. Usar resistencia pull-up fuerte (470Ω)
```

## SensorManager class

Unified manager of all sensors:

```cpp
class SensorManager {
private:
    SHT31Sensor sht31_;
    DS18B20Sensor ds18b20_;
    
    // Filtros
    ExponentialFilter tempAmbientFilter_;
    ExponentialFilter tempSkinFilter_;
    ExponentialFilter humidityFilter_;
    
    // Offsets de calibración
    float tempAmbientOffset_;
    float tempSkinOffset_;
    float humidityOffset_;
    
    // Estado
    unsigned long lastUpdateTime_;
    static constexpr unsigned long UPDATE_INTERVAL = 1000; // 1 segundo

public:
    SensorManager() 
        : sht31_(0x44), ds18b20_(GPIO_ONEWIRE),
          tempAmbientFilter_(0.2), tempSkinFilter_(0.2), 
          humidityFilter_(0.1),
          tempAmbientOffset_(0), tempSkinOffset_(0), humidityOffset_(0) {}
    
    bool begin() {
        bool success = true;
        
        if (!sht31_.begin()) {
            Serial.println("SHT31 initialization failed");
            success = false;
        }
        
        if (!ds18b20_.begin()) {
            Serial.println("DS18B20 initialization failed");
            success = false;
        }
        
        return success;
    }
    
    void update() {
        unsigned long now = millis();
        if (now - lastUpdateTime_ < UPDATE_INTERVAL) {
            return;
        }
        lastUpdateTime_ = now;
        
        // Leer SHT31
        if (sht31_.read()) {
            tempAmbientFilter_.filter(sht31_.getTemperature());
            humidityFilter_.filter(sht31_.getHumidity());
        }
        
        // Leer DS18B20
        if (ds18b20_.read()) {
            tempSkinFilter_.filter(ds18b20_.getTemperature());
        }
        
        // Solicitar próxima conversión del DS18B20
        ds18b20_.requestTemperature();
    }
    
    // Getters con calibración aplicada
    float getAmbientTemperature() {
        return tempAmbientFilter_.getValue() + tempAmbientOffset_;
    }
    
    float getSkinTemperature() {
        return tempSkinFilter_.getValue() + tempSkinOffset_;
    }
    
    float getHumidity() {
        return humidityFilter_.getValue() + humidityOffset_;
    }
    
    // Estado de salud
    bool isAmbientTempHealthy() { return sht31_.isHealthy(); }
    bool isSkinTempHealthy() { return ds18b20_.isHealthy(); }
    bool isHumidityHealthy() { return sht31_.isHealthy(); }
    
    // Calibración
    void setCalibrationOffsets(float tempAmb, float tempSkin, float hum) {
        tempAmbientOffset_ = tempAmb;
        tempSkinOffset_ = tempSkin;
        humidityOffset_ = hum;
    }
    
    // Diagnóstico
    void printStatus() {
        Serial.println("=== Sensor Status ===");
        Serial.printf("Ambient Temp: %.2f°C (healthy: %d)\n", 
                      getAmbientTemperature(), isAmbientTempHealthy());
        Serial.printf("Skin Temp: %.2f°C (healthy: %d)\n", 
                      getSkinTemperature(), isSkinTempHealthy());
        Serial.printf("Humidity: %.1f%% (healthy: %d)\n", 
                      getHumidity(), isHumidityHealthy());
    }
};
```

## Exponential Filter

```cpp
class ExponentialFilter {
private:
    float alpha_;
    float value_;
    bool initialized_;

public:
    ExponentialFilter(float alpha = 0.1) 
        : alpha_(alpha), value_(0), initialized_(false) {}
    
    float filter(float newValue) {
        if (!initialized_) {
            value_ = newValue;
            initialized_ = true;
        } else {
            value_ = alpha_ * newValue + (1.0f - alpha_) * value_;
        }
        return value_;
    }
    
    float getValue() const { return value_; }
    void reset() { initialized_ = false; }
    void setAlpha(float alpha) { alpha_ = constrain(alpha, 0.01, 1.0); }
};
```

### Alpha coefficient selection

| Alpha | Behavior | Usage |
|-------|----------------|-----|
| 0.1 | Very smooth, slow | Humidity |
| 0.2 | Soft | General temperature |
| 0.5 | Moderate | Quick response |
| 0.9 | Almost no filter | Debugging |

## Upcoming Sections

- [Control System](./control-system)
- [Firmware Architecture](./architecture)
