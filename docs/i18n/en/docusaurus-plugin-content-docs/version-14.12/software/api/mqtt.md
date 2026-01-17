---
id: mqtt
title: MQTT
sidebar_label: MQTT
sidebar_position: 3
description: Documentación del protocolo MQTT de IncuNest
keywords: [MQTT, IoT, telemetría, broker]
---
# MQTT

## General Description

IncuNest supports the MQTT protocol for integration with IoT systems, monitoring platforms and telemedicine solutions.

## Configuration

### Enable MQTT

1. Go to **Settings > Network > MQTT**
2. Fill in the parameters:
- **Broker:** MQTT server address
- **Port:** 1883 (TCP) or 8883 (TLS)
- **User:** (optional)
- **Password:** (optional)
- **Client ID:** Unique device ID

### Configuration Parameters

```json
{
  "mqtt": {
    "enabled": true,
    "broker": "mqtt.example.com",
    "port": 1883,
    "username": "incunest",
    "password": "secreto",
    "client_id": "incunest_001",
    "use_tls": false,
    "keepalive": 60,
    "qos": 1,
    "retain": true
  }
}
```

## Topics Structure

### Base Topic

```
incunest/{device_id}/...
```

Example: `incunest/INCUNEST_001/...`

### Posting Topics (IncuNest → Broker)

| Topic | Description | Frequency |
|-------|-------------|------------|
| `{base}/status` | System status | Every 30s |
| `{base}/sensors` | Sensor readings | Every 1s |
| `{base}/alarms` | Alarm events | When it occurs |
| `{base}/state` | Status changes | When changing |

### Subscription Topics (Broker → IncuNest)

| Topic | Description |
|-------|-------------|
| `{base}/control/temperature/set` | Configure temperature setpoint |
| `{base}/control/humidity/set` | Configure humidity setpoint |
| `{base}/control/state/set` | Change status (start/stop) |
| `{base}/alarms/acknowledge` | Acknowledge alarm |
| `{base}/config/set` | Update configuration |

## Message Formats

### System Status

**Topic:** `incunest/INCUNEST_001/status`

```json
{
  "online": true,
  "firmware": "1.0.0",
  "state": "OPERATING",
  "uptime": 3600,
  "wifi_rssi": -65,
  "heap_free": 180000
}
```

### Sensor Readings

**Topic:** `incunest/INCUNEST_001/sensors`

```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "temperature": {
    "ambient": 36.5,
    "skin": 36.8,
    "setpoint": 36.5
  },
  "humidity": {
    "current": 65.2,
    "setpoint": 60.0
  },
  "actuators": {
    "heater_power": 45,
    "fan_speed": 50,
    "humidifier": false
  }
}
```

### Alarm Event

**Topic:** `incunest/INCUNEST_001/alarms`

```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "id": 1,
  "code": "TEMP_HIGH",
  "level": "WARNING",
  "message": "Temperatura alta: 37.8°C",
  "active": true
}
```

### Status Change

**Topic:** `incunest/INCUNEST_001/state`

```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "state": "OPERATING",
  "previous": "PREHEATING"
}
```

## Control Commands

### Set Temperature

**Topic:** `incunest/INCUNEST_001/control/temperature/set`

```json
{
  "setpoint": 36.5
}
```

**Response in:** `incunest/INCUNEST_001/control/temperature/response`

```json
{
  "success": true,
  "setpoint": 36.5
}
```

### Set Humidity

**Topic:** `incunest/INCUNEST_001/control/humidity/set`

```json
{
  "setpoint": 60.0
}
```

### Change Status

**Topic:** `incunest/INCUNEST_001/control/state/set`

```json
{
  "action": "start"
}
```

**Valid values:** `start`, `stop`, `standby`

### Acknowledge Alarm

**Topic:** `incunest/INCUNEST_001/alarms/acknowledge`

```json
{
  "id": 1
}
```

## Home Assistant Integration

### YAML Configuration

```yaml
# configuration.yaml
mqtt:
  sensor:
    - name: "IncuNest Temperatura"
      state_topic: "incunest/INCUNEST_001/sensors"
      value_template: "{{ value_json.temperature.ambient }}"
      unit_of_measurement: "°C"
      device_class: temperature
    
    - name: "IncuNest Humedad"
      state_topic: "incunest/INCUNEST_001/sensors"
      value_template: "{{ value_json.humidity.current }}"
      unit_of_measurement: "%"
      device_class: humidity
    
    - name: "IncuNest Estado"
      state_topic: "incunest/INCUNEST_001/status"
      value_template: "{{ value_json.state }}"
  
  number:
    - name: "IncuNest Setpoint Temp"
      command_topic: "incunest/INCUNEST_001/control/temperature/set"
      command_template: '{"setpoint": {{ value }}}'
      min: 25
      max: 38
      step: 0.1
      unit_of_measurement: "°C"
  
  button:
    - name: "IncuNest Start"
      command_topic: "incunest/INCUNEST_001/control/state/set"
      payload_press: '{"action": "start"}'
    
    - name: "IncuNest Stop"
      command_topic: "incunest/INCUNEST_001/control/state/set"
      payload_press: '{"action": "stop"}'
```

### Home Assistant Discovery

IncuNest can publish auto-discovery settings:

**Topic:** `homeassistant/sensor/incunest_001_temp/config`

```json
{
  "name": "IncuNest Temperatura",
  "unique_id": "incunest_001_temp",
  "state_topic": "incunest/INCUNEST_001/sensors",
  "value_template": "{{ value_json.temperature.ambient }}",
  "unit_of_measurement": "°C",
  "device_class": "temperature",
  "device": {
    "identifiers": ["INCUNEST_001"],
    "name": "IncuNest",
    "model": "IncuNest v1.0",
    "manufacturer": "Medical Open World"
  }
}
```

## Node-RED Integration

### Monitoring Flow

```json
[
  {
    "id": "mqtt_in",
    "type": "mqtt in",
    "topic": "incunest/+/sensors",
    "qos": "1",
    "broker": "mqtt_broker"
  },
  {
    "id": "json_parse",
    "type": "json",
    "wires": [["check_alarm"]]
  },
  {
    "id": "check_alarm",
    "type": "function",
    "func": "if (msg.payload.temperature.ambient > 37.5) {\n  msg.alert = true;\n  msg.payload = 'ALERTA: Temperatura alta';\n  return msg;\n}\nreturn null;",
    "wires": [["notification"]]
  },
  {
    "id": "notification",
    "type": "email",
    "to": "alertas@hospital.com"
  }
]
```

## Python example with paho-mqtt

```python
import paho.mqtt.client as mqtt
import json

BROKER = "mqtt.example.com"
DEVICE_ID = "INCUNEST_001"

def on_connect(client, userdata, flags, rc):
    print(f"Conectado con código: {rc}")
    # Suscribirse a todos los topics del dispositivo
    client.subscribe(f"incunest/{DEVICE_ID}/#")

def on_message(client, userdata, msg):
    topic = msg.topic
    payload = json.loads(msg.payload.decode())
    
    if "sensors" in topic:
        temp = payload["temperature"]["ambient"]
        humidity = payload["humidity"]["current"]
        print(f"Temp: {temp}°C, Humedad: {humidity}%")
    
    elif "alarms" in topic:
        print(f"ALARMA: {payload['message']}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Autenticación (si es necesario)
client.username_pw_set("usuario", "contraseña")

client.connect(BROKER, 1883, 60)

# Configurar setpoint
def set_temperature(setpoint):
    topic = f"incunest/{DEVICE_ID}/control/temperature/set"
    payload = json.dumps({"setpoint": setpoint})
    client.publish(topic, payload)

# Iniciar loop
client.loop_start()

# Ejemplo: cambiar setpoint
set_temperature(36.5)
```

## Last Will and Testament (LWT)

IncuNest configures LWT to notify when disconnected:

**Topic:** `incunest/INCUNEST_001/status`

**LWT message:**
```json
{
  "online": false,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

This allows other systems to detect when the device disconnects unexpectedly.

## Security

### TLS/SSL

For secure connections, configure TLS:

```cpp
// Certificado del broker (CA)
const char* ca_cert = R"(
-----BEGIN CERTIFICATE-----
MIIDxTCCAq2gAwIBAgIQAqxcJmoLQ...
-----END CERTIFICATE-----
)";

WiFiClientSecure secureClient;
secureClient.setCACert(ca_cert);

mqttClient.begin("mqtt.example.com", 8883, secureClient);
```

### Authentication

- Always use username/password
- Consider client certificates for added security
- Use topics with unique prefix per device

## QoS (Quality of Service)

| QoS | Recommended use |
|-----|-----------------|
| 0 | Sensors (high frequency, acceptable loss) |
| 1 | Commands and alarms |
| 2 | Critical Configuration |

## Upcoming Sections

- [REST API](./rest-api)
- [WebSocket](./websocket)
