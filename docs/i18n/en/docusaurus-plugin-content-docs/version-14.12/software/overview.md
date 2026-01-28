---
id: overview
title: Software - Visión General
sidebar_label: Overview
sidebar_position: 1
description: Visión general del software de IncuNest
keywords: [software, firmware, ESP32, arquitectura]
---
# Software - Overview

## Software Architecture

IncuNest software is made up of multiple layers:

```mermaid
graph TB
    subgraph APP ["🌐 Application Layer"]
        direction LR
        WEB([Web Interface])
        API>REST API]
        WS>WebSocket]
    end
    
    subgraph SERVICES ["⚙️ Services Layer"]
        direction LR
        CONTROL{{PID Control}}
        ALARM{{Alarm System}}
        LOG[(Data Logger)]
        CONFIG[(Configuration)]
    end
    
    subgraph HAL ["🔌 Hardware Abstraction Layer"]
        direction LR
        SENSORS[Sensors Driver]
        ACTUATORS[Actuators Driver]
        DISPLAY[Display Driver]
        NETWORK[WiFi Driver]
    end
    
    subgraph HW ["🔧 Hardware"]
        direction LR
        ESP32([ESP32])
        PERIPH[Peripherals]
    end
    
    APP --> SERVICES
    SERVICES --> HAL
    HAL --> HW
    
    classDef app fill:#cce5ff,stroke:#007bff,stroke-width:2px
    classDef services fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef hal fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef hw fill:#e2e3e5,stroke:#6c757d,stroke-width:2px
    
    class WEB,API,WS app
    class CONTROL,ALARM,LOG,CONFIG services
    class SENSORS,ACTUATORS,DISPLAY,NETWORK hal
    class ESP32,PERIPH hw
```

## Technology Stack

| Component | Technology |
|------------|------------|
| Microcontroller | ESP32-WROOM-32 |
| Framework | Arduino/ESP-IDF |
| BuildSystem | PlatformIO |
| Language | C++ (firmware), HTML/CSS/JS (web) |
| Web Protocol | HTTP, WebSocket |
| IoT | MQTT (optional) |

## Project Structure

```
firmware/
├── platformio.ini          # Configuración PlatformIO
├── src/
│   ├── main.cpp           # Punto de entrada
│   ├── config.h           # Configuración global
│   │
│   ├── sensors/           # Drivers de sensores
│   │   ├── SensorManager.h
│   │   ├── SensorManager.cpp
│   │   ├── TemperatureSensor.h
│   │   └── HumiditySensor.h
│   │
│   ├── actuators/         # Control de actuadores
│   │   ├── ActuatorManager.h
│   │   ├── HeaterController.h
│   │   ├── FanController.h
│   │   └── HumidifierController.h
│   │
│   ├── control/           # Sistema de control
│   │   ├── PIDController.h
│   │   ├── PIDController.cpp
│   │   └── SafetyMonitor.h
│   │
│   ├── ui/                # Interfaz de usuario
│   │   ├── DisplayManager.h
│   │   ├── LCDDisplay.h
│   │   ├── TFTDisplay.h
│   │   └── ButtonHandler.h
│   │
│   ├── network/           # Comunicaciones
│   │   ├── WiFiManager.h
│   │   ├── WebServer.h
│   │   ├── WebSocketServer.h
│   │   └── MQTTClient.h
│   │
│   ├── storage/           # Almacenamiento
│   │   ├── ConfigManager.h
│   │   ├── DataLogger.h
│   │   └── SPIFFSManager.h
│   │
│   └── utils/             # Utilidades
│       ├── Timer.h
│       ├── Filter.h
│       └── Debug.h
│
├── data/                  # Archivos SPIFFS (web)
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── config.json
│
├── include/               # Headers compartidos
│   └── config_example.h
│
├── lib/                   # Librerías locales
│
└── test/                  # Unit tests
```

## Main Modules

### 1. Sensor Manager

Manages the reading and processing of all sensors:

```cpp
class SensorManager {
public:
    void init();
    void update();
    
    float getAmbientTemperature();
    float getSkinTemperature();
    float getHumidity();
    bool isWaterLevelOk();
    
    SensorStatus getStatus();
};
```

### 2. Actuator Manager

Controls all actuators in the system:

```cpp
class ActuatorManager {
public:
    void init();
    
    void setHeaterPower(uint8_t percent);
    void setFanSpeed(uint8_t percent);
    void setHumidifier(bool state);
    void setBuzzer(uint16_t frequency, uint16_t duration);
    
    void emergencyStop();
};
```

### 3. Control System

Implements PID control and regulation logic:

```cpp
class ControlSystem {
public:
    void init();
    void update();
    
    void setTemperatureSetpoint(float temp);
    void setHumiditySetpoint(float humidity);
    
    ControlState getState();
    
private:
    PIDController tempPID;
    HumidityController humidityCtrl;
    SafetyMonitor safety;
};
```

### 4. Alarm Manager

Multilevel alarm system:

```cpp
class AlarmManager {
public:
    void init();
    void check();
    
    void raiseAlarm(AlarmCode code, AlarmLevel level);
    void clearAlarm(AlarmCode code);
    void acknowledgeAlarm(AlarmCode code);
    
    std::vector<Alarm> getActiveAlarms();
};
```

### 5. Network Manager

Communications management:

```cpp
class NetworkManager {
public:
    void init();
    void update();
    
    bool isConnected();
    String getIPAddress();
    
    void startAP();
    void connectToWiFi(const char* ssid, const char* password);
};
```

## Execution Flow

```mermaid
sequenceDiagram
    participant Main as 🎯 Main
    participant Sensors as 📊 Sensors
    participant Control as ⚙️ Control
    participant Actuators as 🔧 Actuators
    participant Network as 📡 Network
    participant Display as 🖥️ Display
    
    rect rgb(240, 248, 255)
        Note over Main,Display: System Initialization
        Main->>Sensors: init()
        Main->>Control: init()
        Main->>Actuators: init()
        Main->>Network: init()
        Main->>Display: init()
    end
    
    rect rgb(255, 248, 220)
        Note over Sensors,Actuators: Control Loop (100ms)
        loop Every 100ms
            Main->>Sensors: update()
            Sensors-->>Control: sensorData
            Main->>Control: update()
            Control-->>Actuators: commands
            Main->>Actuators: apply()
        end
    end
    
    rect rgb(220, 255, 220)
        Note over Display,Network: UI/Network Loop (1s)
        loop Every 1s
            Main->>Display: update()
            Main->>Network: update()
        end
    end
```

## Configuration

### config.h file

```cpp
#ifndef CONFIG_H
#define CONFIG_H

// ============ WIFI ============
#define WIFI_SSID "MiRed"
#define WIFI_PASSWORD "MiPassword"
#define HOSTNAME "incunest"

// ============ PINS ============
// Sensores
#define PIN_DHT22 4
#define PIN_DS18B20 5
#define PIN_SDA 21
#define PIN_SCL 22

// Actuadores
#define PIN_HEATER 25
#define PIN_FAN 26
#define PIN_HUMIDIFIER 27
#define PIN_BUZZER 32

// UI
#define PIN_LED_R 12
#define PIN_LED_G 13
#define PIN_LED_B 14

// ============ CONTROL ============
#define DEFAULT_TEMP_SETPOINT 36.5
#define DEFAULT_HUMIDITY_SETPOINT 60.0

#define PID_KP 2.0
#define PID_KI 0.5
#define PID_KD 1.0

// ============ LIMITES ============
#define TEMP_MIN 25.0
#define TEMP_MAX 38.0
#define TEMP_CRITICAL 39.0

#define HUMIDITY_MIN 40.0
#define HUMIDITY_MAX 80.0

// ============ INTERVALOS ============
#define SENSOR_UPDATE_INTERVAL 100   // ms
#define DISPLAY_UPDATE_INTERVAL 1000 // ms
#define LOG_INTERVAL 60000           // ms (1 min)

#endif
```

## Dependencies

### platformio.ini

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino

monitor_speed = 115200

lib_deps =
    adafruit/Adafruit SHT31 Library@^2.2.0
    paulstoffregen/OneWire@^2.3.7
    milesburton/DallasTemperature@^3.11.0
    marcoschwartz/LiquidCrystal_I2C@^1.1.4
    bodmer/TFT_eSPI@^2.5.0
    bblanchon/ArduinoJson@^6.21.0
    knolleary/PubSubClient@^2.8
    lennarthennigs/Button2@^2.2.2

build_flags =
    -DCORE_DEBUG_LEVEL=3
    -DUSER_SETUP_LOADED
    
board_build.filesystem = spiffs
```

## Upcoming Sections

- [Firmware Architecture](./firmware/architecture)
- [Environment Configuration](./development/environment-setup)
- [API Reference](./api/rest-api)
