---
id: communication
title: Comunicaciones
sidebar_label: Comunicação e Protocolos
sidebar_position: 3
description: Protocolos de comunicación y APIs de IncuNest
keywords: [comunicación, WiFi, API, MQTT, WebSocket]
---
# Comunicações

## Visão geral

O IncuNest oferece suporte a vários protocolos de comunicação para diferentes casos de uso:

| Protocolo | Caso de uso | Porto |
|-----------|-------------|--------|
| HTTP/REST | Interface web, integração | 80 |
| WebSocket | Dados em tempo real | 81 |
| MQTT | IoT, monitoramento centralizado | 1883 |
| mDNS | Descoberta automática | 5353 |

##Configurações de Wi-Fi

### Modos de operação

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

### Modo Ponto de Acesso (AP)

Quando nenhum WiFi está configurado:

- **SSID**: `IncuNest_XXXX` (XXXX = últimos 4 dígitos do MAC)
- **Senha**: `incunest123`
- **IP**: `192.168.4.1`

### Configuração inicial

1. Conecte-se ao AP IncuNest
2. Navegue até `http://192.168.4.1`
3. Insira as credenciais de rede
4. O dispositivo será reiniciado no modo Estação

## API REST

### Terminais disponíveis

#### Status do sistema

```http
GET /api/status
```

Responder:
```json
{
  "device_id": "INCUNEST_001",
  "firmware_version": "1.0.0",
  "uptime": 3600,
  "state": "OPERATING",
  "wifi_rssi": -65
}
```

#### Dados do sensor

```http
GET /api/sensors
```

Responder:
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

#### Controle de temperatura

```http
POST /api/control/temperature
Content-Type: application/json

{
  "setpoint": 36.5,
  "mode": "auto"
}
```

#### Configuração

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

#### Alarmes

```http
GET /api/alarms
```

```http
POST /api/alarms/{id}/acknowledge
```

### Autenticação

A API oferece suporte à autenticação básica opcional:

```http
GET /api/status
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

##WebSocket

### Conexão

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

### Mensagens do Servidor

#### Atualização do sensor (a cada 1s)

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

#### Evento de Alarme

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

#### Mudança de status

```json
{
  "type": "state",
  "data": {
    "previous": "HEATING",
    "current": "OPERATING"
  }
}
```

### Comandos do cliente

#### Inscreva-se nos tópicos

```json
{
  "type": "subscribe",
  "topic": "sensors"
}
```

Tópicos disponíveis: `sensors`, `alarms`, `state`, `all`

#### Alterar ponto de ajuste

```json
{
  "type": "command",
  "action": "setTemperature",
  "value": 36.5
}
```

##MQTT

### Configuração do corretor

```cpp
// En config.h
#define MQTT_BROKER "mqtt.ejemplo.com"
#define MQTT_PORT 1883
#define MQTT_USER "incunest"
#define MQTT_PASSWORD "password"
```

### Estrutura do tópico

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

### Exemplos de Publicações

#### Telemetria

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

### Assinatura de comando

```
Topic: incunest/INCUNEST_001/commands/execute
Payload:
{
  "action": "setTemperature",
  "value": 36.5
}
```

## Descoberta de rede (mDNS)

### Configuração

O dispositivo se anuncia automaticamente na rede local:

- **Nome do host**: `incunest.local`
- **Serviço**: `_http._tcp`

### Usar

```bash
# Desde Linux/Mac
avahi-browse -rt _http._tcp

# Desde navegador
http://incunest.local
```

## Segurança de rede

### Recomendações

1. **Alterar credenciais padrão** após a instalação
2. **Use uma rede WiFi segura** (mínimo WPA2)
3. **Firewall**: Limite o acesso às portas necessárias
4. **HTTPS**: Implantar em produção (é necessário certificado)

### Configurações de firewall recomendadas

```
# Solo permitir acceso local
iptables -A INPUT -p tcp --dport 80 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 81 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j DROP
iptables -A INPUT -p tcp --dport 81 -j DROP
```

## Integração com Sistemas Externos

###Assistente Doméstico

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

### Nó-RED

```json
{
  "id": "mqtt_incunest",
  "type": "mqtt in",
  "topic": "incunest/+/sensors/all",
  "broker": "mqtt_broker"
}
```

## Próximos documentos

- [API REST completa](../software/api/rest-api)
- [Referência do WebSocket](../software/api/websocket)
- [Referência MQTT](../software/api/mqtt)
