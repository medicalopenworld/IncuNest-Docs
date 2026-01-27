---
id: communication
title: Comunicaciones
sidebar_label: Communication & Protocols
sidebar_position: 3
description: Protocolos de comunicación y APIs de IncuNest
keywords: [comunicación, WiFi, API, MQTT, WebSocket]
---
# Communications

## Overview

IncuNest supports multiple communication protocols for different use cases:

| Protocol | Use Case | Port |
|-----------|-------------|--------|
| HTTP/REST | Web interface, integration | 80 |
| WebSocket | Real-time data | 81 |
| MQTT | IoT, centralized monitoring | 1883 |
| mDNS | Auto discovery | 5353 |

##WiFi Settings

### Modes of Operation

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

### Access Point (AP) Mode

When no WiFi is configured:

- **SSID**: `IncuNest_XXXX` (XXXX = last 4 digits of MAC)
- **Password**: `incunest123`
- **IP**: `192.168.4.1`

### Initial Configuration

1. Connect to the IncuNest AP
2. Navigate to `http://192.168.4.1`
3. Enter network credentials
4. The device will reboot into Station mode

## REST API

### Available Endpoints

#### System Status

```http
GET /api/status
```

Answer:
```json
{
  "device_id": "INCUNEST_001",
  "firmware_version": "1.0.0",
  "uptime": 3600,
  "state": "OPERATING",
  "wifi_rssi": -65
}
```

#### Sensor Data

```http
GET /api/sensors
```

Answer:
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

#### Temperature Control

```http
POST /api/control/temperature
Content-Type: application/json

{
  "setpoint": 36.5,
  "mode": "auto"
}
```

#### Configuration

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

#### Alarms

```http
GET /api/alarms
```

```http
POST /api/alarms/{id}/acknowledge
```

### Authentication

The API supports optional basic authentication:

```http
GET /api/status
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

##WebSocket

### Connection

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

### Server Messages

#### Sensor Update (every 1s)

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

#### Alarm Event

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

#### Status Change

```json
{
  "type": "state",
  "data": {
    "previous": "HEATING",
    "current": "OPERATING"
  }
}
```

### Client Commands

#### Subscribe to Topics

```json
{
  "type": "subscribe",
  "topic": "sensors"
}
```

Available topics: `sensors`, `alarms`, `state`, `all`

#### Change Setpoint

```json
{
  "type": "command",
  "action": "setTemperature",
  "value": 36.5
}
```

## MQTT

### Broker Configuration

```cpp
// En config.h
#define MQTT_BROKER "mqtt.ejemplo.com"
#define MQTT_PORT 1883
#define MQTT_USER "incunest"
#define MQTT_PASSWORD "password"
```

### Topic Structure

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

### Publication Examples

#### Telemetry

```
Topic: incunest/INCUNEST_001/sensors/all
Payload:
{
  "temperature": 36.5,
  "humidity": 65.2,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

#### State

```
Topic: incunest/INCUNEST_001/status
Payload:
{
  "state": "OPERATING",
  "uptime": 3600,
  "wifi_rssi": -65
}
```

### Command Subscription

```
Topic: incunest/INCUNEST_001/commands/execute
Payload:
{
  "action": "setTemperature",
  "value": 36.5
}
```

## Network Discovery (mDNS)

### Configuration

The device automatically advertises itself on the local network:

- **Hostname**: `incunest.local`
- **Service**: `_http._tcp`

### Use

```bash
# Desde Linux/Mac
avahi-browse -rt _http._tcp

# Desde navegador
http://incunest.local
```

## Network Security

### Recommendations

1. **Change default credentials** after installation
2. **Use secure WiFi network** (WPA2 minimum)
3. **Firewall**: Limit access to necessary ports
4. **HTTPS**: Deploy to production (certificate required)

### Recommended Firewall Settings

```
# Solo permitir acceso local
iptables -A INPUT -p tcp --dport 80 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 81 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j DROP
iptables -A INPUT -p tcp --dport 81 -j DROP
```

## Integration with External Systems

###Home Assistant

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

## Upcoming Documents

- [Complete REST API](../software/api/rest-api)
- [WebSocket Reference](../software/api/websocket)
- [MQTT Reference](../software/api/mqtt)
