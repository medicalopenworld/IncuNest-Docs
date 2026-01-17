---
id: websocket
title: WebSocket API
sidebar_label: WebSocket
sidebar_position: 2
description: Documentação da API WebSocket do IncuNest para comunicação em tempo real
keywords: [API, WebSocket, tiempo real, streaming]
---

# WebSocket API

# Descrição Geral

A API WebSocket do IncuNest fornece comunicação bidirecional em tempo real, ideal para atualizações contínuas de sensores e controle interativo.

**Endpoint:** `ws://<device_ip>/ws`

# # Ligação

## JavaScript

```javascript
const ws = new WebSocket('ws://192.168.1.100/ws');

ws.onopen = () => {
  console.log('Conectado a IncuNest');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Mensaje recibido:', data);
};

ws.onerror = (error) => {
  console.error('Error WebSocket:', error);
};

ws.onclose = () => {
  console.log('Conexión cerrada');
};
```

## Python

```python
import websockets
import asyncio
import json

async def connect():
    async with websockets.connect('ws://192.168.1.100/ws') as ws:
        # Suscribirse a actualizaciones de sensores
        await ws.send(json.dumps({
            "type": "subscribe",
            "channel": "sensors"
        }))
        
        async for message in ws:
            data = json.loads(message)
            print(f"Recibido: {data}")

asyncio.run(connect())
```

## Formato de Mensagens

Todas as mensagens usam JSON com a estrutura:

```json
{
  "type": "tipo_mensaje",
  "timestamp": "2026-01-15T10:30:00Z",
  "data": { ... }
}
```

## Mensagens do Servidor

## Atualização de Sensores

Cada segundo é enviado automaticamente para clientes subscritos.

```json
{
  "type": "sensor_update",
  "timestamp": "2026-01-15T10:30:00.000Z",
  "data": {
    "temperature": {
      "ambient": 36.5,
      "skin": 36.8
    },
    "humidity": 65.2,
    "heater_power": 45,
    "fan_speed": 50,
    "humidifier": false
  }
}
```

## Evento de Alarma

```json
{
  "type": "alarm",
  "timestamp": "2026-01-15T10:30:00Z",
  "data": {
    "id": 1,
    "code": "TEMP_HIGH",
    "level": "WARNING",
    "message": "Temperatura alta: 37.8°C",
    "active": true
  }
}
```

## Mudança de Estado

```json
{
  "type": "state_change",
  "timestamp": "2026-01-15T10:30:00Z",
  "data": {
    "previous_state": "PREHEATING",
    "new_state": "OPERATING"
  }
}
```

## Confirmação de Comando

```json
{
  "type": "command_response",
  "timestamp": "2026-01-15T10:30:00Z",
  "data": {
    "command_id": "cmd_12345",
    "success": true,
    "message": "Setpoint actualizado"
  }
}
```

## Mensagens do Cliente

### Subscrever ao Canal

```json
{
  "type": "subscribe",
  "channel": "sensors"
}
```

**Canais disponíveis:**
- `sensors` - Actualizações de sensores
- `alarms` - Eventos de alarme
- `state` - Alterações de estado
- `all` - Todos os eventos

## Cancelar Subscrição

```json
{
  "type": "unsubscribe",
  "channel": "sensors"
}
```

## Configurar a Temperatura

```json
{
  "type": "command",
  "command_id": "cmd_12345",
  "action": "set_temperature",
  "data": {
    "setpoint": 36.5
  }
}
```

## Configurar Humedad

```json
{
  "type": "command",
  "command_id": "cmd_12346",
  "action": "set_humidity",
  "data": {
    "setpoint": 60.0
  }
}
```

### Reconhecer Alarma

```json
{
  "type": "command",
  "command_id": "cmd_12347",
  "action": "acknowledge_alarm",
  "data": {
    "alarm_id": 1
  }
}
```

## Iniciar/Deter Sistema

```json
{
  "type": "command",
  "command_id": "cmd_12348",
  "action": "set_state",
  "data": {
    "state": "start"
  }
}
```

**Estados válidos:**
- `start` - Iniciar operação
- `stop` - Parar (standby)
- `standby` - Modo espera

## Ping (Keep- alive)

```json
{
  "type": "ping"
}
```

Resposta:
```json
{
  "type": "pong",
  "timestamp": "2026-01-15T10:30:00Z"
}
```

## Implementação Completa (JavaScript)

```javascript
class IncuNestWebSocket {
  constructor(ip) {
    this.url = `ws://${ip}/ws`;
    this.ws = null;
    this.commandId = 0;
    this.pendingCommands = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('Conectado a IncuNest');
        this.reconnectAttempts = 0;
        this.startPing();
        resolve();
      };
      
      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };
      
      this.ws.onerror = (error) => {
        console.error('Error WebSocket:', error);
        reject(error);
      };
      
      this.ws.onclose = () => {
        console.log('Conexión cerrada');
        this.stopPing();
        this.attemptReconnect();
      };
    });
  }

  handleMessage(message) {
    // Manejar respuestas a comandos
    if (message.type === 'command_response') {
      const pending = this.pendingCommands.get(message.data.command_id);
      if (pending) {
        if (message.data.success) {
          pending.resolve(message.data);
        } else {
          pending.reject(new Error(message.data.message));
        }
        this.pendingCommands.delete(message.data.command_id);
      }
      return;
    }
    
    // Notificar a listeners
    const listeners = this.listeners.get(message.type) || [];
    listeners.forEach(callback => callback(message.data, message.timestamp));
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  off(eventType, callback) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  subscribe(channel) {
    this.send({ type: 'subscribe', channel });
  }

  unsubscribe(channel) {
    this.send({ type: 'unsubscribe', channel });
  }

  sendCommand(action, data) {
    return new Promise((resolve, reject) => {
      const commandId = `cmd_${++this.commandId}`;
      
      this.pendingCommands.set(commandId, { resolve, reject });
      
      this.send({
        type: 'command',
        command_id: commandId,
        action,
        data
      });
      
      // Timeout de 10 segundos
      setTimeout(() => {
        if (this.pendingCommands.has(commandId)) {
          this.pendingCommands.delete(commandId);
          reject(new Error('Timeout esperando respuesta'));
        }
      }, 10000);
    });
  }

  setTemperature(setpoint) {
    return this.sendCommand('set_temperature', { setpoint });
  }

  setHumidity(setpoint) {
    return this.sendCommand('set_humidity', { setpoint });
  }

  start() {
    return this.sendCommand('set_state', { state: 'start' });
  }

  stop() {
    return this.sendCommand('set_state', { state: 'stop' });
  }

  acknowledgeAlarm(alarmId) {
    return this.sendCommand('acknowledge_alarm', { alarm_id: alarmId });
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  startPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }

  stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconectando... Intento ${this.reconnectAttempts}`);
      setTimeout(() => this.connect(), 3000);
    }
  }

  disconnect() {
    this.stopPing();
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Uso
const incuNest = new IncuNestWebSocket('192.168.1.100');

incuNest.connect().then(() => {
  // Suscribirse a sensores
  incuNest.subscribe('sensors');
  
  // Escuchar actualizaciones
  incuNest.on('sensor_update', (data, timestamp) => {
    console.log(`Temperatura: ${data.temperature.ambient}°C`);
    console.log(`Humedad: ${data.humidity}%`);
  });
  
  // Escuchar alarmas
  incuNest.on('alarm', (data) => {
    console.warn(`ALARMA: ${data.message}`);
  });
  
  // Cambiar setpoint
  incuNest.setTemperature(36.5)
    .then(() => console.log('Setpoint actualizado'))
    .catch(err => console.error(err));
});
```

## Gestão de Erros

## Códigos Erros

| Código | Descrição |
|--------|-------------|
| 1000 | Feche normal |
| 1001 | Endpoint desaparecido |
| 1006 | Feche anormal |
| 4000 | Erro de autenticação |
| 4001 | Comando inválido |
| 4002 | Parâmetros inválidos |

## Religação Automática

```javascript
function connectWithRetry(url, maxRetries = 5) {
  let retries = 0;
  
  function connect() {
    const ws = new WebSocket(url);
    
    ws.onclose = () => {
      if (retries < maxRetries) {
        retries++;
        const delay = Math.min(1000 * Math.pow(2, retries), 30000);
        console.log(`Reconectando en ${delay}ms...`);
        setTimeout(connect, delay);
      }
    };
    
    ws.onopen = () => {
      retries = 0;
    };
    
    return ws;
  }
  
  return connect();
}
```

## Próximas Secções

- [REST API] (./rest-api)
- [MQTT] (./mqtt)