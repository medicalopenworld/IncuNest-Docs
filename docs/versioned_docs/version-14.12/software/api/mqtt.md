---
id: mqtt
title: MQTT
sidebar_label: MQTT
sidebar_position: 3
description: Documentación del protocolo MQTT de IncuNest
keywords: [MQTT, IoT, telemetría, broker]
---

# MQTT

## Descripción General

IncuNest soporta el protocolo MQTT para integración con sistemas IoT, plataformas de monitoreo y soluciones de telemedicina.

## Configuración

### Habilitar MQTT

1. Acceda a **Configuración > Red > MQTT**
2. Complete los parámetros:
   - **Broker:** Dirección del servidor MQTT
   - **Puerto:** 1883 (TCP) o 8883 (TLS)
   - **Usuario:** (opcional)
   - **Contraseña:** (opcional)
   - **Client ID:** ID único del dispositivo

### Parámetros de Configuración

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

## Estructura de Topics

### Base Topic

```
incunest/{device_id}/...
```

Ejemplo: `incunest/INCUNEST_001/...`

### Topics de Publicación (IncuNest → Broker)

| Topic | Descripción | Frecuencia |
|-------|-------------|------------|
| `{base}/status` | Estado del sistema | Cada 30s |
| `{base}/sensors` | Lecturas de sensores | Cada 1s |
| `{base}/alarms` | Eventos de alarma | Al ocurrir |
| `{base}/state` | Cambios de estado | Al cambiar |

### Topics de Suscripción (Broker → IncuNest)

| Topic | Descripción |
|-------|-------------|
| `{base}/control/temperature/set` | Configurar setpoint de temperatura |
| `{base}/control/humidity/set` | Configurar setpoint de humedad |
| `{base}/control/state/set` | Cambiar estado (start/stop) |
| `{base}/alarms/acknowledge` | Reconocer alarma |
| `{base}/config/set` | Actualizar configuración |

## Formatos de Mensajes

### Estado del Sistema

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

### Lecturas de Sensores

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

### Evento de Alarma

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

### Cambio de Estado

**Topic:** `incunest/INCUNEST_001/state`

```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "state": "OPERATING",
  "previous": "PREHEATING"
}
```

## Comandos de Control

### Configurar Temperatura

**Topic:** `incunest/INCUNEST_001/control/temperature/set`

```json
{
  "setpoint": 36.5
}
```

**Respuesta en:** `incunest/INCUNEST_001/control/temperature/response`

```json
{
  "success": true,
  "setpoint": 36.5
}
```

### Configurar Humedad

**Topic:** `incunest/INCUNEST_001/control/humidity/set`

```json
{
  "setpoint": 60.0
}
```

### Cambiar Estado

**Topic:** `incunest/INCUNEST_001/control/state/set`

```json
{
  "action": "start"
}
```

**Valores válidos:** `start`, `stop`, `standby`

### Reconocer Alarma

**Topic:** `incunest/INCUNEST_001/alarms/acknowledge`

```json
{
  "id": 1
}
```

## Integración Home Assistant

### Configuración YAML

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

IncuNest puede publicar configuración de auto-descubrimiento:

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

## Integración Node-RED

### Flow de Monitoreo

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

## Ejemplo Python con paho-mqtt

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

IncuNest configura LWT para notificar cuando se desconecta:

**Topic:** `incunest/INCUNEST_001/status`

**Mensaje LWT:**
```json
{
  "online": false,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

Esto permite que otros sistemas detecten cuando el dispositivo se desconecta inesperadamente.

## Seguridad

### TLS/SSL

Para conexiones seguras, configure TLS:

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

### Autenticación

- Use siempre usuario/contraseña
- Considere certificados de cliente para mayor seguridad
- Use topics con prefijo único por dispositivo

## QoS (Quality of Service)

| QoS | Uso recomendado |
|-----|-----------------|
| 0 | Sensores (alta frecuencia, pérdida aceptable) |
| 1 | Comandos y alarmas |
| 2 | Configuración crítica |

## Próximas Secciones

- [REST API](./rest-api)
- [WebSocket](./websocket)
