---
id: overview
title: Arquitectura General
sidebar_label: Visión General
sidebar_position: 1
description: Visión general de la arquitectura del sistema IncuNest
keywords: [arquitectura, sistema, diseño, componentes]
---

# Arquitectura General del Sistema

## Introducción

IncuNest está diseñado siguiendo principios de **modularidad**, **seguridad** y **mantenibilidad**. Esta sección describe la arquitectura general del sistema, incluyendo hardware y software.

## Diagrama de Bloques del Sistema

```mermaid
graph TB
    subgraph POWER ["⚡ Alimentación"]
        direction LR
        AC[🔌 AC 110-220V]
        PSU[(Fuente 12V)]
        REG{{Reguladores}}
        UPS[(UPS Backup)]
    end
    
    subgraph CONTROL ["🧠 Control Central"]
        direction TB
        ESP32([ESP32 MCU])
        FLASH[(Flash/SPIFFS)]
        RTC[RTC DS3231]
    end
    
    subgraph SENSORS ["📊 Sensores"]
        direction LR
        TEMP1[🌡️ Temp. Ambiente]
        TEMP2[🌡️ Temp. Piel]
        HUM[💧 Humedad]
        WEIGHT[⚖️ Peso]
    end
    
    subgraph ACTUATORS ["⚙️ Actuadores"]
        direction LR
        HEATER[🔥 Calefactor]
        FAN[💨 Ventilador]
        HUMID[💦 Humidificador]
        BUZZER[🔔 Buzzer]
    end
    
    subgraph UI ["🖥️ Interfaz"]
        direction LR
        LCD[[Display LCD/TFT]]
        LEDS[💡 LEDs Estado]
        BUTTONS[🔘 Botones]
    end
    
    subgraph COMM ["📡 Comunicación"]
        direction LR
        WIFI{{WiFi}}
        API>REST API]
        WS>WebSocket]
        MQTT>MQTT]
    end
    
    AC --> PSU --> REG --> ESP32
    UPS -.->|backup| REG
    
    SENSORS -->|datos| ESP32
    ESP32 -->|control| ACTUATORS
    ESP32 -->|display| UI
    ESP32 <-->|red| COMM
    ESP32 <-->|storage| FLASH
    RTC -->|tiempo| ESP32
    
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

## Capas del Sistema

### 1. Capa de Hardware

La capa física incluye:

| Componente | Función | Criticidad |
|------------|---------|------------|
| ESP32 | Procesamiento central | Alta |
| Sensores | Adquisición de datos | Alta |
| Actuadores | Control ambiental | Alta |
| Alimentación | Energía del sistema | Crítica |
| Display | Interfaz local | Media |

### 2. Capa de Firmware

El firmware se organiza en módulos:

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

### 3. Capa de Aplicación

Interfaces disponibles:

- **Interfaz Local**: Display LCD/TFT + botones físicos
- **Interfaz Web**: Dashboard accesible vía WiFi
- **API REST**: Para integración con sistemas externos
- **MQTT**: Para IoT y monitoreo centralizado

## Flujo de Datos

```mermaid
sequenceDiagram
    participant S as 📊 Sensores
    participant C as ⚙️ Controlador
    participant A as 🔧 Actuadores
    participant UI as 🖥️ Interfaz
    participant N as 📡 Red
    
    rect rgb(255, 248, 220)
        Note over S,A: Loop de Control Rápido
        loop Cada 100ms
            S->>C: Datos de sensores
            C->>C: Procesar PID
            C->>A: Comandos de control
        end
    end
    
    rect rgb(220, 255, 220)
        Note over C,N: Loop de Comunicación
        loop Cada 1s
            C->>UI: Actualizar display
            C->>N: Enviar telemetría
        end
    end
    
    rect rgb(240, 248, 255)
        Note over N,C: Interacción Externa
        N-->>C: Comandos remotos
        UI-->>C: Input de usuario
    end
```

## Principios de Diseño

### Seguridad por Diseño

1. **Redundancia de sensores**: Múltiples sensores de temperatura
2. **Límites por hardware**: Termostatos físicos de respaldo
3. **Fail-safe**: El sistema falla hacia estado seguro
4. **Watchdog**: Reinicio automático ante bloqueos

### Modularidad

Cada módulo puede:
- Funcionar independientemente
- Ser probado aisladamente
- Ser reemplazado sin afectar otros módulos

### Eficiencia Energética

- Modo sleep cuando es posible
- Control PWM eficiente
- Optimización de ciclos de trabajo

## Estados del Sistema

```mermaid
stateDiagram-v2
    [*] --> INIT: ⚡ Power On
    INIT --> SELFTEST: ✅ Inicialización OK
    INIT --> ERROR: ❌ Fallo de inicio
    
    SELFTEST --> STANDBY: ✅ Tests OK
    SELFTEST --> ERROR: ❌ Fallo de test
    
    state "🔥 Operación Activa" as active {
        STANDBY --> HEATING: ▶️ Activar
        HEATING --> OPERATING: 🌡️ Temp. alcanzada
        OPERATING --> STANDBY: ⏹️ Desactivar
    }
    
    state "🚨 Estados de Alerta" as alert {
        OPERATING --> ALARM: ⚠️ Parámetro fuera de rango
        ALARM --> OPERATING: ✅ Alarma resuelta
        ALARM --> EMERGENCY: 🛑 Condición crítica
    }
    
    EMERGENCY --> [*]: 🔧 Apagado seguro
    ERROR --> [*]: 🔧 Requiere servicio
```

### Descripción de Estados

| Estado | Descripción | LED |
|--------|-------------|-----|
| INIT | Inicializando sistema | Azul parpadeando |
| SELFTEST | Ejecutando auto-diagnóstico | Azul fijo |
| STANDBY | Listo, esperando activación | Verde parpadeando |
| HEATING | Calentando a temperatura objetivo | Amarillo |
| OPERATING | Operación normal | Verde fijo |
| ALARM | Condición de alarma activa | Rojo parpadeando |
| EMERGENCY | Apagado de emergencia | Rojo fijo |
| ERROR | Error del sistema | Rojo/Azul alternando |

## Comunicaciones

### Protocolos Soportados

| Protocolo | Puerto | Uso |
|-----------|--------|-----|
| HTTP | 80 | Interfaz web |
| WebSocket | 81 | Datos en tiempo real |
| MQTT | 1883 | Telemetría IoT |
| mDNS | 5353 | Descubrimiento local |

### Estructura de Datos

Ejemplo de mensaje de telemetría:

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

## Próximos Documentos

- [Diseño del Sistema](./system-design) - Detalles técnicos del diseño
- [Comunicaciones](./communication) - Protocolos y APIs en detalle
