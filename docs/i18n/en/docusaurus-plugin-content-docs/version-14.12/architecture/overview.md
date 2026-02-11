---
id: overview
title: Arquitectura General
sidebar_label: Overview
sidebar_position: 1
description: Visión general de la arquitectura del sistema IncuNest
keywords: [arquitectura, sistema, diseño, componentes]
---
# General System Architecture

## Introduction

IncuNest is designed following principles of **modularity**, **security** and **maintainability**. This section describes the general architecture of the system, including hardware and software.

## System Block Diagram

```mermaid
graph TB
    subgraph POWER ["⚡ Power Supply"]
        direction LR
        AC[🔌 AC 110-220V]
        PSU[(12V PSU)]
        REG{{Regulators}}
        UPS[(UPS Backup)]
    end
    
    subgraph CONTROL ["🧠 Central Control"]
        direction TB
        ESP32([ESP32 MCU])
        FLASH[(Flash/SPIFFS)]
        RTC[RTC DS3231]
    end
    
    subgraph SENSORS ["📊 Sensors"]
        direction LR
        TEMP1[🌡️ Ambient Temp]
        TEMP2[🌡️ Skin Temp]
        HUM[💧 Humidity]
        WEIGHT[⚖️ Weight]
    end
    
    subgraph ACTUATORS ["⚙️ Actuators"]
        direction LR
        HEATER[🔥 Heater]
        FAN[💨 Fan]
        HUMID[💦 Humidifier]
        BUZZER[🔔 Buzzer]
    end
    
    subgraph UI ["🖥️ Interface"]
        direction LR
        LCD[[LCD/TFT Display]]
        LEDS[💡 Status LEDs]
        BUTTONS[🔘 Buttons]
    end
    
    subgraph COMM ["📡 Communication"]
        direction LR
        WIFI{{WiFi}}
        API>REST API]
        WS>WebSocket]
        MQTT>MQTT]
    end
    
    AC --> PSU --> REG --> ESP32
    UPS -.->|backup| REG
    
    SENSORS -->|data| ESP32
    ESP32 -->|control| ACTUATORS
    ESP32 -->|display| UI
    ESP32 <-->|network| COMM
    ESP32 <-->|storage| FLASH
    RTC -->|time| ESP32
    
    classDef power fill:#ffcccc,stroke:#dc3545,stroke-width:2px
    classDef control fill:#cce5ff,stroke:#007bff,stroke-width:2px
    classDef sensors fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef actuators fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef ui fill:#e2d5f1,stroke:#6f42c1,stroke-width:2px
    classDef comm fill:#d1ecf1,stroke:#17a2b8,stroke-width:2px
    
    class AC,PSU,REG,UPS power
    class ESP32,FLASH,RTC control
    class TEMP1,TEMP2,HUM,WEIGHT sensors
    class HEATER,FAN,HUMID,BUZZER actuators
    class LCD,LEDS,BUTTONS ui
    class WIFI,API,WS,MQTT comm
```

## System Layers

### 1. Hardware Layer

The physical layer includes:

| Component | Function | Criticality |
|------------|---------|------------|
| ESP32 | Central processing | High |
| Sensors | Data acquisition | High |
| Actuators | Environmental control | High |
| Food | System power | Review |
| Display | Local interface | Medium |

### 2. Firmware Layer

The firmware is organized into modules:

```
firmware/
├── src/
│   ├── main.cpp              # Punto de entrada
│   ├── config.h              # Configuración
│   ├── sensors/              # Módulo de sensores
│   │   ├── temperature.cpp
│   │   └── humidity.cpp
│   ├── control/              # Sistema de control
│   │   ├── pid.cpp
│   │   └── safety.cpp
│   ├── actuators/            # Control de actuadores
│   │   ├── heater.cpp
│   │   └── fan.cpp
│   ├── ui/                   # Interfaz de usuario
│   │   ├── display.cpp
│   │   └── buttons.cpp
│   ├── network/              # Comunicaciones
│   │   ├── wifi.cpp
│   │   ├── webserver.cpp
│   │   └── mqtt.cpp
│   └── storage/              # Almacenamiento
│       └── datalogger.cpp
└── lib/                      # Librerías externas
```

### 3. Application Layer

Available interfaces:

- **Local Interface**: LCD/TFT display + physical buttons
- **Web Interface**: Dashboard accessible via WiFi
- **REST API**: For integration with external systems
- **MQTT**: For IoT and centralized monitoring

## Data Flow

```mermaid
sequenceDiagram
    participant S as 📊 Sensors
    participant C as ⚙️ Controller
    participant A as 🔧 Actuators
    participant UI as 🖥️ Interface
    participant N as 📡 Network
    
    rect rgb(255, 248, 220)
        Note over S,A: Fast Control Loop
        loop Every 100ms
            S->>C: Sensor data
            C->>C: Process PID
            C->>A: Control commands
        end
    end
    
    rect rgb(220, 255, 220)
        Note over C,N: Communication Loop
        loop Every 1s
            C->>UI: Update display
            C->>N: Send telemetry
        end
    end
    
    rect rgb(240, 248, 255)
        Note over N,C: External Interaction
        N-->>C: Remote commands
        UI-->>C: User input
    end
```

## Design Principles

### Security by Design

1. **Sensor redundancy**: Multiple temperature sensors
2. **Hardware Limits**: Backup Physical Thermostats
3. **Fail-safe**: The system fails to a safe state
4. **Watchdog**: Automatic restart in case of crashes

### Modularity

Each module can:
- Function independently
- Be tested in isolation
- Be replaced without affecting other modules

### Energy Efficiency

- Sleep mode when possible
- Efficient PWM control
- Optimization of work cycles

## System States

```mermaid
stateDiagram-v2
    [*] --> INIT: ⚡ Power On
    INIT --> SELFTEST: ✅ Initialization OK
    INIT --> ERROR: ❌ Startup Failure
    
    SELFTEST --> STANDBY: ✅ Tests OK
    SELFTEST --> ERROR: ❌ Test Failure
    
    state "🔥 Active Operation" as active {
        STANDBY --> HEATING: ▶️ Activate
        HEATING --> OPERATING: 🌡️ Temp Reached
        OPERATING --> STANDBY: ⏹️ Deactivate
    }
    
    state "🚨 Alert States" as alert {
        OPERATING --> ALARM: ⚠️ Parameter Out of Range
        ALARM --> OPERATING: ✅ Alarm Resolved
        ALARM --> EMERGENCY: 🛑 Critical Condition
    }
    
    EMERGENCY --> [*]: 🔧 Safe Shutdown
    ERROR --> [*]: 🔧 Service Required
```

### Description of States

| Status | Description | LED |
|--------|-------------|-----|
| INIT | Initializing system | Blue flashing |
| SELFTEST | Running self-diagnosis | Solid blue |
| STANDBY | Ready, waiting for activation | Green flashing |
| HEATING | Heating to target temperature | Yellow |
| OPERATING | Normal operation | Solid green |
| ALARM | Active alarm condition | Red flashing |
| EMERGENCY | Emergency shutdown | Solid red |
| ERROR | System error | Red/Blue alternating |

## Communications

### Supported Protocols

| Protocol | Port | Usage |
|-----------|--------|-----|
| HTTP | 80 | Web interface |
| WebSocket | 81 | Real-time data |
| MQTT | 1883 | IoT Telemetry |
| mDNS | 5353 | Local discovery |

### Data Structure

Telemetry message example:

```json
{
  "device_id": "INCUNEST_001",
  "timestamp": "2026-01-15T10:30:00Z",
  "sensors": {
    "temperature_ambient": 36.5,
    "temperature_skin": 36.8,
    "humidity": 65.2
  },
  "actuators": {
    "heater_power": 45,
    "fan_speed": 30,
    "humidifier": true
  },
  "status": {
    "state": "OPERATING",
    "alarms": [],
    "uptime": 3600
  }
}
```

## Upcoming Documents

- [System Design](./system-design) - Technical details of the design
- [Communications](./communication) - Protocols and APIs in detail
