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
flowchart TB
    subgraph POWER["⚡ Alimentación"]
        AC[AC 110-220V]
        PSU[Fuente 12V]
        REG[Reguladores]
        UPS[UPS Backup]
    end
    
    subgraph CONTROL["🧠 Control Central"]
        ESP32[ESP32 MCU]
        FLASH[Flash/SPIFFS]
        RTC[RTC DS3231]
    end
    
    subgraph SENSORS["📊 Sensores"]
        TEMP1[Temp. Ambiente]
        TEMP2[Temp. Piel]
        HUM[Humedad]
        WEIGHT[Peso]
    end
    
    subgraph ACTUATORS["⚙️ Actuadores"]
        HEATER[Calefactor]
        FAN[Ventilador]
        HUMID[Humidificador]
        BUZZER[Buzzer]
    end
    
    subgraph UI["🖥️ Interfaz"]
        LCD[Display LCD/TFT]
        LEDS[LEDs Estado]
        BUTTONS[Botones]
    end
    
    subgraph COMM["📡 Comunicación"]
        WIFI[WiFi]
        API[REST API]
        WS[WebSocket]
        MQTT[MQTT]
    end
    
    AC --> PSU --> REG --> ESP32
    UPS -.-> REG
    
    SENSORS --> ESP32
    ESP32 --> ACTUATORS
    ESP32 --> UI
    ESP32 <--> COMM
    ESP32 <--> FLASH
    RTC --> ESP32
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
    participant S as Sensores
    participant C as Controlador
    participant A as Actuadores
    participant UI as Interfaz
    participant N as Red
    
    loop Cada 100ms
        S->>C: Datos de sensores
        C->>C: Procesar PID
        C->>A: Comandos de control
    end
    
    loop Cada 1s
        C->>UI: Actualizar display
        C->>N: Enviar telemetría
    end
    
    N-->>C: Comandos remotos
    UI-->>C: Input de usuario
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
    [*] --> INIT: Power On
    INIT --> SELFTEST: Inicialización OK
    INIT --> ERROR: Fallo de inicio
    
    SELFTEST --> STANDBY: Tests OK
    SELFTEST --> ERROR: Fallo de test
    
    STANDBY --> HEATING: Activar
    HEATING --> OPERATING: Temp. alcanzada
    
    OPERATING --> STANDBY: Desactivar
    OPERATING --> ALARM: Parámetro fuera de rango
    
    ALARM --> OPERATING: Alarma resuelta
    ALARM --> EMERGENCY: Condición crítica
    
    EMERGENCY --> [*]: Apagado seguro
    ERROR --> [*]: Requiere servicio
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
