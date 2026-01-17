---
id: configuration
title: Paramètres
sidebar_label: Paramètres
sidebar_position: 2
description: Guide de configuration avancée IncuNest
keywords: [configuración, parámetros, ajustes]
---

Paramètres

Panneau de configuration

Accédez aux paramètres du menu * * Paramètres * * sur l'interface web ou naviguez vers @ @ CODE0 @ @.

Paramètres de contrôle

Paramètres de température

- 124; Paramètre - 124; Description - 124; Gamme - 124; Par défaut - 124;
- 124; - 124; - 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124; Température cible - 124; 25,0 - 37,5 ° C - 124; 36,5 ° C - 124;
- 124; @ @ CODE1 @ @ - 124; Mode de commande - 124; auto / manuel - 124; voiture - 124;
- 124; @ CODE2 @ @ - 124; Histérésis - 124; 0,1 - 1,0 ° C - 124; 0,3 ° C - 124;

PID Paramètres

```json
{
  "pid": {
    "kp": 2.0,
    "ki": 0.5,
    "kd": 1.0,
    "output_min": 0,
    "output_max": 100,
    "sample_time": 1000
  }
}
```

- 124; Paramètre - 124; Description - 124; Effet - 124;
- 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124; Gain proportionnel - 124; Major = réponse plus rapide, dépassement possible - 124;
C'est pas vrai.
- 124; @ CODE2 @ @ - 124;

Syntonisation PID

Méthode Ziegler-Nichols : * *

1. Configurer Ki = 0, Kd = 0
2. Augmenter le Kp à une oscillation soutenue
3. Note Ku (Kp critique) et Tu (période d'oscillation)
4. Calculer :
- Kp = 0,6 × Ku
- Ki = 2 × Kp / Tu
- Kd = Kp × Tu / 8

Paramètres Humidad

- 124; Paramètre - 124; Description - 124; Gamme - 124; Par défaut - 124;
- 124; - 124; - 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124; Humidité cible - 124; 40 - 80% - 124; 60 - 124;
- 124; @ @ CODE1 @ @ - 124; Mode de commande - 124; auto / manuel - 124; voiture - 124;
- 124; @ CODE2 @ @ - 124; Histérésis - 124; 2 - 10% - 124; 5% - 124;

Configuration de l'alarme

Seuils de température

```json
{
  "alarms": {
    "temperature": {
      "high_warning": 37.5,
      "high_alarm": 38.0,
      "low_warning": 34.0,
      "low_alarm": 32.0
    }
  }
}
```

Les pouces de Hummedad

```json
{
  "alarms": {
    "humidity": {
      "high_warning": 75.0,
      "high_alarm": 85.0,
      "low_warning": 45.0,
      "low_alarm": 35.0
    }
  }
}
```

Comportement d'alarme

- 124; Paramètre - 124; Description - 124; Par défaut - 124;
- 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124; Activer l'alarme sonore - 124; true - 124;
- 124; @ @ CODE1 @ @ - 124; Volume (si réglable) - 124; 100% - 124;
- 124; @ @ CODE2 @ @ - 124; Auto-silence (0 = jamais) - 124;
- 124; @ @ CODE3 @ @ - 124;

Paramètres du réseau

Wi-Fi

```json
{
  "wifi": {
    "ssid": "MiRed",
    "password": "contraseña",
    "hostname": "incunest",
    "static_ip": null,
    "gateway": null,
    "subnet": null,
    "dns": null
  }
}
```

* * IP statique (facultatif): * *

```json
{
  "wifi": {
    "static_ip": "192.168.1.100",
    "gateway": "192.168.1.1",
    "subnet": "255.255.255.0",
    "dns": "8.8.8.8"
  }
}
```

Serveur Web

- 124; Paramètre - 124; Description - 124; Par défaut - 124;
- 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124;
- 124; @ @ CODE1 @ - 124; Puerto WebSocket - 124; 81 - 124;
- 124; @ @ CODE2 @ @ - 124; Authentification activée - 124; faux - 124;
- 124; @ @ CODE3 @ @ - 124; Utilisateur - 124; administrateur - 124;
- 124; @ CODE4 @ @ - 124; Mot de passe - 124; administrateur - 124;

♪ ♪ MQTT

Voir [Documentation MQTT] (@ @ URL0 @ @) pour une configuration détaillée.

Configuration d'étalonnage

# # Déconnectés des capteurs

```json
{
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  }
}
```

Voir [Guide de calibration] (@ @ URL0 @ @) pour les procédures détaillées.

Configuration du système

Généralités

```json
{
  "system": {
    "device_name": "IncuNest Principal",
    "device_id": "INCUNEST_001",
    "language": "es",
    "timezone": "America/Mexico_City",
    "units": "metric"
  }
}
```

# # Enregistrement des données

```json
{
  "logging": {
    "enabled": true,
    "interval": 60,
    "max_records": 10000,
    "auto_export": false
  }
}
```

- 124; Paramètre - 124; Description - 124; Par défaut - 124;
- 124; - 124; - 124;
- 124; @ @ CODE0 @ @ - 124; Activer l'enregistrement - 124; true - 124;
- 124; @ @ CODE1 @ @ - 124; Intervalle entre les enregistrements (secondes) - 124;
124; @ @ CODE2 @ @ - 124; maximum des enregistrements stockés - 124; - 10000 - 124;
- 124; @ @ CODE3 @ @ - 124;

Afficher

```json
{
  "display": {
    "brightness": 80,
    "timeout": 300,
    "show_clock": true,
    "temp_decimals": 1
  }
}
```

# # Fichier de configuration

La configuration est stockée dans SPIFFS au format JSON:

* * Lieu: * * @ @ CODE0

Structure complète

```json
{
  "version": "1.0.0",
  "device": {
    "name": "IncuNest Principal",
    "id": "INCUNEST_001"
  },
  "control": {
    "temperature": {
      "setpoint": 36.5,
      "mode": "auto",
      "hysteresis": 0.3
    },
    "humidity": {
      "setpoint": 60.0,
      "mode": "auto",
      "hysteresis": 5.0
    },
    "pid": {
      "kp": 2.0,
      "ki": 0.5,
      "kd": 1.0
    }
  },
  "alarms": {
    "temperature": {
      "high_warning": 37.5,
      "high_alarm": 38.0,
      "low_warning": 34.0,
      "low_alarm": 32.0
    },
    "humidity": {
      "high_warning": 75.0,
      "high_alarm": 85.0,
      "low_warning": 45.0,
      "low_alarm": 35.0
    },
    "buzzer_enabled": true
  },
  "network": {
    "wifi": {
      "ssid": "MiRed",
      "password": "contraseña"
    },
    "mqtt": {
      "enabled": false
    }
  },
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  },
  "logging": {
    "enabled": true,
    "interval": 60
  }
}
```

Soutien et restauration

Paramètres d'exportation

1. Aller à * * Paramètres > Système > Support * *
2. Cliquez sur * * Paramètres d'exportation * *
3. Le fichier sera téléchargé

Paramètres d' importation

1. Aller à * * Paramètres > Système > Support * *
2. Cliquez sur * * Paramètres d'importation * *
3. Sélectionnez le fichier de sauvegarde
4. Examiner les changements et confirmer

Restaurer les valeurs de l'usine

1. Aller à * * Paramètres > Système > Réinitialiser * *
2. Confirmer l ' action
3. Le périphérique sera redémarré avec la configuration par défaut

* * Méthode matérielle : * * Maintenez le bouton de réinitialisation enfoncé pendant 10 secondes.

Sections suivantes

- [Calibration] (@ @ URL0 @)
- [Entretien] (@ @ URL1 @)