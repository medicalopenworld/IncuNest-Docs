---
id: getting-started
title: Guia de Início Rápido
sidebar_label: Guia Rápido
sidebar_position: 2
description: Guia completo para começar com o IncuNest
keywords: [início, instalação, configuração, ESP32]
---
# Guia de início rápido

Este guia irá guiá-lo pelas etapas necessárias para configurar e colocar seu IncuNest em funcionamento.

## Pré-requisitos

### Hardware necessário

- **ESP32-WROOM-32** ou ESP32-WROVER
- Sensores de temperatura (DHT22 ou SHT31)
- Elemento de aquecimento (resistência cerâmica)
- Fonte de alimentação 12V/10A
- Tela LCD 20x4 ou TFT de 3,5"
- PCB principal do IncuNest (consulte [BOM completo](./hardware/assembly/bom))

### Software necessário

- [Código do Visual Studio](https://code.visualstudio.com/)
- [IDE da plataformaIO](https://platformio.org/install/ide?install=vscode)
- [Git](https://git-scm.com/)
- Navegador moderno (Chrome, Firefox, Edge)

## Etapa 1: clonar o repositório

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

## Etapa 2: Configurar o ambiente de desenvolvimento

### Instalar PlatformIO

1. Abra o código do Visual Studio
2. Vá para Extensões (Ctrl+Shift+X)
3. Procure por "IDE PlatformIO"
4. Instale a extensão

### Abra o projeto

1. No VS Code, selecione **Arquivo > Abrir Pasta**
2. Navegue até a pasta `IncuNest/firmware`
3. PlatformIO detectará automaticamente o projeto

## Etapa 3: Configuração de firmware

### Arquivo de configuração

Copie o arquivo de configuração de exemplo:

```bash
cd firmware
cp include/config_example.h include/config.h
```

### Editar configurações

Abra `include/config.h` e ajuste os parâmetros:

```cpp
// Configuración WiFi
#define WIFI_SSID "TuRedWiFi"
#define WIFI_PASSWORD "TuContraseña"

// Configuración de Sensores
#define TEMP_SENSOR_PIN 4
#define HUMIDITY_SENSOR_PIN 5

// Parámetros de Control
#define DEFAULT_TARGET_TEMP 36.5
#define DEFAULT_TARGET_HUMIDITY 60.0

// Parámetros PID
#define KP 2.0
#define KI 0.5
#define KD 1.0
```

## Etapa 4: compilar e fazer upload

### Compilar Firmware

```bash
# Usando PlatformIO CLI
pio run

# O usando el botón de Build en VS Code (✓)
```

### Carregar para ESP32

1. Conecte o ESP32 via USB
2. Execute:

```bash
pio run --target upload
```

Ou use o botão Upload (→) no VS Code.

## Etapa 5: Verifique a operação

### Monitor serial

Abra o monitor serial para verificar a inicialização:

```bash
pio device monitor --baud 115200
```

Você deveria ver:

```
[INFO] IncuNest v1.0.0 Starting...
[INFO] Initializing sensors...
[OK] Temperature sensor initialized
[OK] Humidity sensor initialized
[INFO] Connecting to WiFi...
[OK] Connected! IP: 192.168.1.100
[INFO] Starting control loop...
[OK] System ready!
```

### Acesse a interface da web

1. Abra um navegador
2. Navegue até `http://[IP_DEL_ESP32]`
3. Você deverá ver o painel do IncuNest

## Etapa 6: calibração inicial

:::aviso Importante
A calibração é essencial para garantir medições precisas e seguras.
:::

### Calibrar sensores de temperatura

1. Vá para **Configurações > Calibração**
2. Coloque um termômetro de referência certificado dentro da câmara
3. Ajuste o deslocamento até que as leituras correspondam
4. Salve as configurações

### Calibrar sensor de umidade

1. Use uma solução salina saturada como referência
2. Coloque a solução dentro da câmara selada
3. Aguarde 24 horas pela estabilização
4. Ajuste o deslocamento nas configurações

## Verificação final

Preencha a seguinte lista de verificação antes de usar o IncuNest:

- [ ] Sensores de temperatura funcionando corretamente
- [] Sensor de umidade calibrado
- [] O sistema de aquecimento responde ao controle
- [] Alarmes de segurança ativos
- [] Interface web acessível
- [] Registro de dados funcionando

## Solução de problemas

### ESP32 não inicia

1. Verifique a conexão USB
2. Experimente outro cabo USB
3. Pressione e segure BOOT enquanto conecta

### Não conecta ao WiFi

1. Verifique as credenciais em `config.h`
2. Certifique-se de que a rede seja de 2,4 GHz
3. Aproxime o dispositivo do roteador

### Leituras incorretas do sensor

1. Verifique as conexões do sensor
2. Verifique se os pinos estão configurados corretamente
3. Execute a calibração novamente

## Próximas etapas

- 📖 [Guia de instalação completo](./guides/installation)
- 🔧 [Configurações avançadas](./guides/configuration)
- 📊 [Calibração detalhada](./guides/calibration)
- 🛠️ [Manutenção](./guides/maintenance)
