---
id: communication
title: Communications
sidebar_label: Communications
sidebar_position: 3
description: Protocoles de communication et API IncuNest
keywords: [comunicación, WiFi, API, MQTT, WebSocket]
---

# Communications

Vision générale

IncuNest prend en charge plusieurs protocoles de communication pour différents cas d'utilisation:

- 124; Protocole - 124; Cas d ' utilisation - 124; Port - 124;
- 124; - 124; - 124;
- 124; HTTP / REST - 124; Interface Web, intégration - 124; 80 - 124;
- 124; WebSocket - 124; données en temps réel - 124; 81 - 124;
- 124; MQTT - 124; IdO, surveillance centralisée - 124; 1883 - 124;
124; mDNS 124; Découverte automatique 124; 5353 124;

Configuration WiFi

Modes de fonctionnement

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

Point d'accès au mode (AP)

Quand il n'y a pas de configuration WiFi:

- * * * SSID * *: @ @ CODE0 @ @ (XXXX = 4 derniers chiffres de la MAC)
- * * Mot de passe * *: @ @ CODE1 @ @
- * * IP * *: @ @ CODE2 @

Configuration initiale

1. Connectez-vous à l'IncuNest AP
2. Naviguez à @ @ CODE0 @
3. Entrée des identifiants réseau
4. L'appareil redémarre en mode Station

L'API REST

Points de fin disponibles

État du système

```http
GET /api/status
```

Réponse
```json
{
  "device_id": "INCUNEST_001",
  "firmware_version": "1.0.0",
  "uptime": 3600,
  "state": "OPERATING",
  "wifi_rssi": -65
}
```

Données des capteurs

```http
GET /api/sensors
```

Réponse
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

Contrôle de température

```http
POST /api/control/temperature
Content-Type: application/json

{
  "setpoint": 36.5,
  "mode": "auto"
}
```

Configuration

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

Alarmes

```http
GET /api/alarms
```

```http
POST /api/alarms/{id}/acknowledge
```

Authentification

L'API prend en charge l'authentification de base facultative:

```http
GET /api/status
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

♪ ♪ WebSocket

Connexion

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

Messages du serveur

Mise à jour des capteurs (toutes les 1 s)

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

Alarme

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

Changement d'État

```json
{
  "type": "state",
  "data": {
    "previous": "HEATING",
    "current": "OPERATING"
  }
}
```

Commandes du client

Abonnez-vous aux sujets

```json
{
  "type": "subscribe",
  "topic": "sensors"
}
```

Sujets disponibles: @ @ CODE0 @, @ @ CODE1 @, @ @ CODE2 @ @, @ @ CODE3 @ @

Changer le paramètre

```json
{
  "type": "command",
  "action": "setTemperature",
  "value": 36.5
}
```

♪ ♪ MQTT

Configuration du courtier

```cpp
// En config.h
#define MQTT_BROKER "mqtt.ejemplo.com"
#define MQTT_PORT 1883
#define MQTT_USER "incunest"
#define MQTT_PASSWORD "password"
```

Structure des sujets

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

Exemples de publication

Télémétrie

```
Topic: incunest/INCUNEST_001/sensors/all
Payload:
{
  "temperature": 36.5,
  "humidity": 65.2,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

État

```
Topic: incunest/INCUNEST_001/status
Payload:
{
  "state": "OPERATING",
  "uptime": 3600,
  "wifi_rssi": -65
}
```

Abonnement aux commandes

```
Topic: incunest/INCUNEST_001/commands/execute
Payload:
{
  "action": "setTemperature",
  "value": 36.5
}
```

Découverte rouge (mDNS)

Configuration

L'appareil est automatiquement annoncé sur le réseau local:

* * Nom d'hôte * *: @ @ CODE0 @ @
- * * Service * *: @ @ CODE1 @

♪ ♪ Utilisation

```bash
# Desde Linux/Mac
avahi-browse -rt _http._tcp

# Desde navegador
http://incunest.local
```

Sécurité du réseau

Recommandations

1. * * Modifier les identifiants par défaut * * après installation
2. * * Utiliser un réseau WiFi sécurisé * * (au minimum WPA2)
3. * * Pare-feu * * : Limiter l'accès aux ports nécessaires
4. * * HTTPS * *: Mise en œuvre en production (certificat requis)

Paramètres recommandés du pare-feu

```
# Solo permitir acceso local
iptables -A INPUT -p tcp --dport 80 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 81 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j DROP
iptables -A INPUT -p tcp --dport 81 -j DROP
```

Intégration avec les systèmes externes

Assistant à domicile

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

♪ # # # Noeud-RED

```json
{
  "id": "mqtt_incunest",
  "type": "mqtt in",
  "topic": "incunest/+/sensors/all",
  "broker": "mqtt_broker"
}
```

Documents suivants

- [Compléter l'API REST] (@ @ URL0 @)
- [Référence WebSocket] (@ @ URL1 @)
- [Référence MQTT] (@ @ URL2 @)