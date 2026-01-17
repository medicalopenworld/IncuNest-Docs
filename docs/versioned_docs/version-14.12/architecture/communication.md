---
id: communication
title: Comunicaciones
sidebar_label: Comunicaciones
sidebar_position: 3
description: Protocolos de comunicación y APIs de IncuNest
keywords: [comunicación, WiFi, API, MQTT, WebSocket]
---

# Comunicaciones

## Visión General

IncuNest soporta múltiples protocolos de comunicación para diferentes casos de uso:

| Protocolo | Caso de Uso | Puerto |
|-----------|-------------|--------|
| HTTP/REST | Interfaz web, integración | 80 |
| WebSocket | Datos en tiempo real | 81 |
| MQTT | IoT, monitoreo centralizado | 1883 |
| mDNS | Descubrimiento automático | 5353 |

## Configuración WiFi

### Modos de Operación

```mermaid
flowchart TB
    START[Inicio] --> CHECK{¿WiFi configurado?}
    CHECK -->|No| AP[Modo Access Point]
    CHECK -->|Sí| CONNECT[Intentar conexión]
    
    CONNECT --> SUCCESS{¿Conectado?}
    SUCCESS -->|Sí| STA[Modo Station]
    SUCCESS -->|No| RETRY{¿Reintentos < 5?}
    
    RETRY -->|Sí| CONNECT
    RETRY -->|No| AP
    
    AP --> CONFIG[Portal de configuración]
    CONFIG --> SAVE[Guardar credenciales]
    SAVE --> CONNECT
    
    STA --> OPERATE[Operación normal]
```

### Modo Access Point (AP)

Cuando no hay WiFi configurado:

- **SSID**: `IncuNest_XXXX` (XXXX = últimos 4 dígitos del MAC)
- **Password**: `incunest123`
- **IP**: `192.168.4.1`

### Configuración Inicial

1. Conectar al AP de IncuNest
2. Navegar a `http://192.168.4.1`
3. Ingresar credenciales de red
4. El dispositivo reiniciará en modo Station

## API REST

### Endpoints Disponibles

#### Estado del Sistema

```http
GET /api/status
```

Respuesta:
```json
{
  "device_id": "INCUNEST_001",
  "firmware_version": "1.0.0",
  "uptime": 3600,
  "state": "OPERATING",
  "wifi_rssi": -65
}
```

#### Datos de Sensores

```http
GET /api/sensors
```

Respuesta:
```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "temperature": {
    "ambient": 36.5,
    "skin": 36.8,
    "unit": "celsius"
  },
  "humidity": {
    "relative": 65.2,
    "unit": "percent"
  }
}
```

#### Control de Temperatura

```http
POST /api/control/temperature
Content-Type: application/json

{
  "setpoint": 36.5,
  "mode": "auto"
}
```

#### Configuración

```http
GET /api/config
```

```http
POST /api/config
Content-Type: application/json

{
  "pid": {
    "kp": 2.0,
    "ki": 0.5,
    "kd": 1.0
  },
  "alarms": {
    "temp_high": 38.0,
    "temp_low": 34.0
  }
}
```

#### Alarmas

```http
GET /api/alarms
```

```http
POST /api/alarms/{id}/acknowledge
```

### Autenticación

La API soporta autenticación básica opcional:

```http
GET /api/status
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

## WebSocket

### Conexión

```javascript
const ws = new WebSocket('ws://incunest.local:81');

ws.onopen = function() {
    console.log('Conectado a IncuNest');
    ws.send(JSON.stringify({ type: 'subscribe', topic: 'sensors' }));
};

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Datos recibidos:', data);
};
```

### Mensajes del Servidor

#### Actualización de Sensores (cada 1s)

```json
{
  "type": "sensors",
  "data": {
    "temperature": 36.5,
    "humidity": 65.2,
    "timestamp": 1705314600000
  }
}
```

#### Evento de Alarma

```json
{
  "type": "alarm",
  "data": {
    "id": 1,
    "level": "WARNING",
    "message": "Temperatura alta",
    "timestamp": 1705314600000
  }
}
```

#### Cambio de Estado

```json
{
  "type": "state",
  "data": {
    "previous": "HEATING",
    "current": "OPERATING"
  }
}
```

### Comandos del Cliente

#### Suscribirse a Tópicos

```json
{
  "type": "subscribe",
  "topic": "sensors"
}
```

Tópicos disponibles: `sensors`, `alarms`, `state`, `all`

#### Cambiar Setpoint

```json
{
  "type": "command",
  "action": "setTemperature",
  "value": 36.5
}
```

## MQTT

### Configuración del Broker

```cpp
// En config.h
#define MQTT_BROKER "mqtt.ejemplo.com"
#define MQTT_PORT 1883
#define MQTT_USER "incunest"
#define MQTT_PASSWORD "password"
```

### Estructura de Tópicos

```
incunest/
├── {device_id}/
│   ├── status          # Estado del dispositivo
│   ├── sensors/
│   │   ├── temperature
│   │   ├── humidity
│   │   └── all
│   ├── actuators/
│   │   ├── heater
│   │   └── fan
│   ├── alarms/
│   │   ├── active
│   │   └── history
│   ├── config/
│   │   ├── get
│   │   └── set
│   └── commands/
│       └── execute
```

### Ejemplos de Publicación

#### Telemetría

```
Topic: incunest/INCUNEST_001/sensors/all
Payload:
{
  "temperature": 36.5,
  "humidity": 65.2,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

#### Estado

```
Topic: incunest/INCUNEST_001/status
Payload:
{
  "state": "OPERATING",
  "uptime": 3600,
  "wifi_rssi": -65
}
```

### Suscripción a Comandos

```
Topic: incunest/INCUNEST_001/commands/execute
Payload:
{
  "action": "setTemperature",
  "value": 36.5
}
```

## Descubrimiento de Red (mDNS)

### Configuración

El dispositivo se anuncia automáticamente en la red local:

- **Hostname**: `incunest.local`
- **Servicio**: `_http._tcp`

### Uso

```bash
# Desde Linux/Mac
avahi-browse -rt _http._tcp

# Desde navegador
http://incunest.local
```

## Seguridad de Red

### Recomendaciones

1. **Cambiar credenciales por defecto** después de la instalación
2. **Usar red WiFi segura** (WPA2 mínimo)
3. **Firewall**: Limitar acceso a puertos necesarios
4. **HTTPS**: Implementar en producción (requiere certificado)

### Configuración de Firewall Recomendada

```
# Solo permitir acceso local
iptables -A INPUT -p tcp --dport 80 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 81 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j DROP
iptables -A INPUT -p tcp --dport 81 -j DROP
```

## Integración con Sistemas Externos

### Home Assistant

```yaml
# configuration.yaml
sensor:
  - platform: mqtt
    name: "IncuNest Temperature"
    state_topic: "incunest/INCUNEST_001/sensors/temperature"
    unit_of_measurement: "°C"
    
  - platform: mqtt
    name: "IncuNest Humidity"
    state_topic: "incunest/INCUNEST_001/sensors/humidity"
    unit_of_measurement: "%"
```

### Node-RED

```json
{
  "id": "mqtt_incunest",
  "type": "mqtt in",
  "topic": "incunest/+/sensors/all",
  "broker": "mqtt_broker"
}
```

## Próximos Documentos

- [API REST Completa](../software/api/rest-api)
- [WebSocket Reference](../software/api/websocket)
- [MQTT Reference](../software/api/mqtt)
