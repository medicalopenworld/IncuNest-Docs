---
id: configuration
title: Configuración
sidebar_label: Configuración
sidebar_position: 2
description: Guía de configuración avanzada de IncuNest
keywords: [configuración, parámetros, ajustes]
---
#Configuração

## Painel de configurações

Acesse as configurações no menu **Configurações** na interface da web ou navegue até `http://{device_ip}/config`.

## Configurações de controle

### Parâmetros de temperatura

| Parâmetro | Descrição | Alcance | Padrão |
|-----------|-------------|-------|---------|
| __CÓDIGO1__ | Temperatura alvo | 25,0 - 37,5°C | 36,5°C |
| __CÓDIGO2__ | Modo de controle | automático/manual | carro |
| __CÓDIGO3__ | Histerese | 0,1 - 1,0°C | 0,3ºC |

### Parâmetros PID

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

| Parâmetro | Descrição | Efeito |
|-----------|-------------|--------|
| __CÓDIGO0__ | Ganho proporcional | Maior = resposta mais rápida, possível ultrapassagem |
| __CÓDIGO1__ | Lucro abrangente | Maior = elimina erro estático, possível oscilação |
| __CÓDIGO2__ | Ganho derivado | Maior = reduz overshoot, sensível ao ruído |

#### Ajuste PID

**Método Ziegler-Nichols:**

1. Defina Ki=0, Kd=0
2. Aumente Kp até oscilação sustentada
3. Anote Ku (Kp crítico) e Tu (período de oscilação)
4. Calcule:
- Kp = 0,6 × Ku
- Ki = 2 × Kp/Tu
- Kd = Kp × Tu / 8

### Parâmetros de umidade

| Parâmetro | Descrição | Alcance | Padrão |
|-----------|-------------|-------|---------|
| __CÓDIGO3__ | Humidade alvo | 40 - 80% | 60% |
| __CÓDIGO4__ | Modo de controle | automático/manual | carro |
| __CÓDIGO5__ | Histerese | 2 - 10% | 5% |

## Configurações de alarme

### Limites de temperatura

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

### Limites de umidade

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

### Comportamento do alarme

| Parâmetro | Descrição | Padrão |
|-----------|-------------|---------|
| __CÓDIGO0__ | Habilitar alarme sonoro | verdade |
| __CÓDIGO1__ | Volume (se ajustável) | 100% |
| __CÓDIGO2__ | Silenciar automaticamente (0=nunca) | 0 |
| __CÓDIGO3__ | Atraso antes de ativar | 30 anos |

## Configurações de rede

### Wi-fi

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

**IP estático (opcional):**

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

### Servidor Web

| Parâmetro | Descrição | Padrão |
|-----------|-------------|---------|
| __CÓDIGO0__ | Porta HTTP | 80 |
| __CÓDIGO1__ | Porta WebSocket | 81 |
| __CÓDIGO2__ | Autenticação habilitada | falso |
| __CÓDIGO3__ | Usuário | administrador |
| __CÓDIGO4__ | Senha | administrador |

###MQTT

Consulte [Documentação MQTT](../software/api/mqtt) para configuração detalhada.

## Configurações de calibração

### Deslocamentos do sensor

```json
{
  "calibration": {
    "temp_ambient_offset": 0.0,
    "temp_skin_offset": 0.0,
    "humidity_offset": 0.0
  }
}
```

Consulte o [Guia de calibração](./calibration) para procedimentos detalhados.

## Configuração do sistema

### Em geral

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

### Registro de dados

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

| Parâmetro | Descrição | Padrão |
|-----------|-------------|---------|
| __CÓDIGO0__ | Habilitar registro | verdade |
| __CÓDIGO1__ | Intervalo entre registros (segundos) | 60 |
| __CÓDIGO2__ | Máximo de registros armazenados | 10.000 |
| __CÓDIGO3__ | Exportar automaticamente | falso |

###Mostrar

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

## Arquivo de configuração

A configuração é armazenada em SPIFFS no formato JSON:

**Local:** `/config.json`

### Estrutura Completa

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

## Backup e restauração

### Exportar configurações

1. Vá para **Configurações > Sistema > Backup**
2. Clique em **Exportar configuração**
3. O arquivo `incunest_config_FECHA.json` será baixado

### Configurações de importação

1. Vá para **Configurações > Sistema > Backup**
2. Clique em **Importar configuração**
3. Selecione o arquivo de backup
4. Revise as alterações e confirme

### Redefinição de fábrica

1. Vá para **Configurações > Sistema > Redefinir**
2. Confirme a ação
3. O dispositivo será reiniciado com as configurações padrão

**Método de hardware:** Pressione e segure o botão reset por 10 segundos.

## Próximas seções

- [Calibração](./calibration)
- [Manutenção](./maintenance)
