---
id: mqtt
title: MQTT
sidebar_label: MQTT
sidebar_position: 3
description: Documentação do protocolo MQTT do IncuNest
keywords: [MQTT, IoT, telemetría, broker]
---

# MQTT

# Descrição Geral

IncuNest suporta o protocolo MQTT para integração com sistemas IoT, plataformas de monitoramento e soluções de telemedicina.

# Configuração

## Activar o MQTT

1. Acesse **Configuração > Rede > MQTT**
2. Complete os parâmetros:
- **Broker:** Endereço do servidor MQTT
- **Puerto:** 1883 (TCP) ou 8883 (TLS)
- **Utilizador:** (opcional)
- **Contrassenha:** (opcional)
- **Client ID:** ID único do dispositivo

### Parâmetros de Configuração

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

## Estrutura de Topics

## Base Topic

```
incunest/{device_id}/...
```

Exemplo: `incunest/INCUNEST_001/...`

## Topics de Publicação (IncuNest → Broker)

| Topic | Descrição | Frequência |
|-------|-------------|-----------------|
| `{base}/status` | Estado do sistema | Cada 30s |
| `{base}/sensors` | Leituras de Sensores | Cada 1s |
| `{base}/alarms` | Eventos de alarme | Al ocorrer |
| `{base}/state` | Alterações de estado | Ao mudar |

## Topics de Assinatura (Broker → IncuNest)

| Topic | Descrição |
|-------|-------------|
| `{base}/control/temperature/set` | Configurar setpoint de temperatura |
| `{base}/control/humidity/set` | Configurar setpoint de umidade |
| `{base}/control/state/set` | Alterar estado (start/stop) |
| `{base}/alarms/acknowledge` | Reconhecer alarme |
| `{base}/config/set` | Actualizar a configuração |

## Formatos de Mensagens

## Estado do Sistema

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

## Leituras de Sensores

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

## Evento de Alarma

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

## Mudança de Estado

**Topic:** `incunest/INCUNEST_001/state`

```json
{
  "timestamp": "2026-01-15T10:30:00Z",
  "state": "OPERATING",
  "previous": "PREHEATING"
}
```

## Comandos de Controlo

## Configurar a Temperatura

**Topic:** `incunest/INCUNEST_001/control/temperature/set`

```json
{
  "setpoint": 36.5
}
```

**Resposta em:** `incunest/INCUNEST_001/control/temperature/response`

```json
{
  "success": true,
  "setpoint": 36.5
}
```

## Configurar Humedad

**Topic:** `incunest/INCUNEST_001/control/humidity/set`

```json
{
  "setpoint": 60.0
}
```

## Mudar o Estado

**Topic:** `incunest/INCUNEST_001/control/state/set`

```json
{
  "action": "start"
}
```

**Valores válidos:** `start`, `stop`, `standby`

### Reconhecer Alarma

**Topic:** `incunest/INCUNEST_001/alarms/acknowledge`

```json
{
  "id": 1
}
```

# Integração Home Assistant

## Configuração YAML

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

IncuNest pode publicar configurações de auto-descubrimento:

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

# Integração Node-RED

## Flow de Monitoramento

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

## Exemplo Python com paho-mqtt

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

IncuNest configura LWT para notificar quando desligado:

**Topic:** `incunest/INCUNEST_001/status`

** Mensagem LWT:**
```json
{
  "online": false,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

Isto permite que outros sistemas detectem quando o dispositivo é desligado inesperadamente.

# Segurança

### TLS/SSL

Para conexões seguras, configure TLS:

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

## Autenticação

- Use sempre o utilizador/contraseña
- Considere certificados de cliente para maior segurança
- Use topics com prefixo único por dispositivo

## QoS (Quality of Service)

| QoS | Uso recomendado |
|-----|-----------------|
| 0 | Sensores (alta frequência, perda aceitável) |
| 1 | Comandos e alarmes |
| 2 | Configurações críticas |

## Próximas Secções

- [REST API] (./rest-api)
- [WebSocket] (./websocket)