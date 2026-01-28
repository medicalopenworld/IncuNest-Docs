---
id: simulation
title: Simulação de Hardware
sidebar_label: Simulação
sidebar_position: 2
description: Guia para simular o hardware do IncuNest usando Wokwi
keywords: [simulação, Wokwi, hardware, ESP32, desenvolvimento, testes]
---

# Simulação de Hardware

## Introdução

A simulação de hardware permite testar e desenvolver o firmware do IncuNest sem precisar de todos os componentes físicos. Utilizamos o [Wokwi](https://wokwi.com/), um simulador de eletrônica online que suporta ESP32 e muitos dos componentes usados neste projeto.

:::tip Vantagens da Simulação
- **Desenvolvimento rápido**: Teste código sem hardware físico
- **Depuração segura**: Sem risco de danificar componentes
- **Acessibilidade**: Qualquer um pode contribuir para o projeto
- **Educação**: Ideal para aprender sobre o sistema
:::

## Começando com Wokwi

### Pré-requisitos

1. Navegador web moderno (Chrome, Firefox, Edge)
2. Conta no [Wokwi](https://wokwi.com/) (opcional, mas recomendado para salvar projetos)
3. Conhecimentos básicos de Arduino/ESP32

### Criar um Novo Projeto

1. Visite [wokwi.com](https://wokwi.com/)
2. Clique em "New Project"
3. Selecione "ESP32" como plataforma
4. Adicione os componentes necessários do painel lateral

## Compatibilidade de Componentes BOM

Abaixo está a análise de compatibilidade entre os componentes do [BOM do IncuNest](./assembly/bom) e o hardware suportado pelo Wokwi.

### Componentes Totalmente Suportados ✅

| Componente | Uso no IncuNest | Componente Wokwi |
|------------|-----------------|------------------|
| ESP32-WROOM-32 | MCU principal | `wokwi-esp32-devkit-v1` |
| DHT22 | Sensor temp/umidade (backup) | `wokwi-dht22` |
| DS18B20 | Sensor temperatura de pele | `wokwi-ds18b20` |
| HX711 + Célula de carga | Medição de peso | `wokwi-hx711` |
| Módulo cartão SD | Registro de dados | `wokwi-microsd-card` |
| LCD 20x4 I2C | Display básico | `wokwi-lcd2004` |
| Buzzer | Alarme sonoro | `wokwi-buzzer` |
| LEDs RGB | Indicadores de estado | `wokwi-rgb-led` |
| Botões | Interface de usuário | `wokwi-pushbutton` |
| Resistores | Vários circuitos | `wokwi-resistor` |
| Termistor NTC | Sensor temperatura analógico | `wokwi-ntc-temperature-sensor` |
| Relé | Controle de atuadores | `wokwi-relay-module` |
| Potenciômetro | Simulação de sensores analógicos | `wokwi-potentiometer` |

### Componentes Parcialmente Suportados ⚠️

| Componente | Uso no IncuNest | Alternativa Wokwi | Notas |
|------------|-----------------|-------------------|-------|
| DS3231 RTC | Relógio em tempo real | Usar biblioteca DS3231 | Compatível via I2C, sem componente dedicado |
| TFT ILI9488 | Display avançado | `wokwi-ili9341` | ILI9341 é compatível, resolução diferente |
| Touch XPT2046 | Tela sensível ao toque | `wokwi-ili9341` | Incluído no display ILI9341 |
| MOSFET IRLZ44N | Controle PWM de atuadores | Simular com lógica digital | Sem componente físico, simular comportamento |
| Ventilador 12V | Circulação de ar | `wokwi-led` como indicador | Usar LED para visualizar estado |
| Transistor 2N2222A | Controle de sinais | Simular com lógica digital | Sem componente físico em simulação |

### Componentes Não Suportados ❌

| Componente | Uso no IncuNest | Alternativa Sugerida |
|------------|-----------------|---------------------|
| SHT31 | Sensor temp/umidade principal | Usar DHT22 como substituto |
| Resistência PTC 100W | Elemento aquecedor | Simular com variável no código |
| Umidificador ultrassônico | Controle de umidade | Simular com variável no código |
| KSD301 | Termostato de segurança 45°C | Simular lógica de proteção no código |
| Diodo SS34 | Proteção de circuito | Não necessário em simulação |
| Reguladores AMS1117 | Regulação de tensão | Não necessário em simulação |
| Fonte de alimentação | Energia do sistema | Não necessário em simulação |

## Projeto de Simulação Base

### Estrutura do Projeto Wokwi

Um projeto básico de simulação do IncuNest requer os seguintes arquivos:

```
incunest-simulation/
├── diagram.json      # Definição do circuito
├── wokwi.toml        # Configuração do projeto
└── src/
    └── main.cpp      # Código fonte
```

### Diagrama de Conexões Básico

```json
{
  "version": 1,
  "author": "IncuNest Project",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-esp32-devkit-v1", "id": "esp", "top": 0, "left": 0 },
    { "type": "wokwi-dht22", "id": "dht", "top": -50, "left": 150 },
    { "type": "wokwi-ds18b20", "id": "ds18", "top": -50, "left": 250 },
    { "type": "wokwi-lcd2004", "id": "lcd", "top": 150, "left": 0 },
    { "type": "wokwi-buzzer", "id": "buzzer", "top": -50, "left": 350 },
    { "type": "wokwi-led", "id": "heater_led", "top": 100, "left": 300, "attrs": { "color": "red" } },
    { "type": "wokwi-led", "id": "fan_led", "top": 100, "left": 350, "attrs": { "color": "blue" } }
  ],
  "connections": [
    ["esp:GND.1", "dht:GND", "black", ["v:20"]],
    ["esp:3V3", "dht:VCC", "red", ["v:10"]],
    ["esp:D4", "dht:DATA", "green", ["h:10"]],
    ["esp:GND.1", "ds18:GND", "black", ["v:30"]],
    ["esp:3V3", "ds18:VCC", "red", ["v:15"]],
    ["esp:D5", "ds18:DQ", "yellow", ["h:15"]],
    ["esp:GND.1", "lcd:GND", "black", ["v:40"]],
    ["esp:3V3", "lcd:VCC", "red", ["v:20"]],
    ["esp:D21", "lcd:SDA", "blue", ["h:20"]],
    ["esp:D22", "lcd:SCL", "purple", ["h:25"]],
    ["esp:D32", "buzzer:1", "orange", ["h:30"]],
    ["esp:GND.1", "buzzer:2", "black", ["v:50"]],
    ["esp:D25", "heater_led:A", "red", ["h:35"]],
    ["esp:GND.1", "heater_led:C", "black", ["v:55"]],
    ["esp:D26", "fan_led:A", "blue", ["h:40"]],
    ["esp:GND.1", "fan_led:C", "black", ["v:60"]]
  ]
}
```

### Código de Exemplo

```cpp
#include <Arduino.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

// Definição de pinos (conforme hardware/overview.md)
#define PIN_DHT22       4
#define PIN_DS18B20     5
#define PIN_HEATER_PWM  25
#define PIN_FAN_PWM     26
#define PIN_BUZZER      32

// Configuração de sensores
DHT dht(PIN_DHT22, DHT22);
OneWire oneWire(PIN_DS18B20);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Variáveis de controle
float targetTemp = 36.5;
float currentTemp = 0;
float currentHumidity = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("IncuNest Simulation - Iniciando...");
  
  // Inicializar sensores
  dht.begin();
  sensors.begin();
  
  // Inicializar display
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("IncuNest v14.12");
  lcd.setCursor(0, 1);
  lcd.print("Modo Simulacao");  // Note: Use "Simulação" with proper encoding if supported
  
  // Configurar pinos de saída
  pinMode(PIN_HEATER_PWM, OUTPUT);
  pinMode(PIN_FAN_PWM, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Ler sensores
  currentHumidity = dht.readHumidity();
  float dhtTemp = dht.readTemperature();
  
  sensors.requestTemperatures();
  float ds18Temp = sensors.getTempCByIndex(0);
  
  // Usar temperatura média
  currentTemp = (dhtTemp + ds18Temp) / 2.0;
  
  // Controle simples de temperatura
  if (currentTemp < targetTemp - 0.5) {
    digitalWrite(PIN_HEATER_PWM, HIGH);  // Ligar aquecedor
    digitalWrite(PIN_FAN_PWM, HIGH);     // Ligar ventilador
  } else if (currentTemp > targetTemp + 0.5) {
    digitalWrite(PIN_HEATER_PWM, LOW);   // Desligar aquecedor
    digitalWrite(PIN_FAN_PWM, HIGH);     // Manter ventilador
  } else {
    digitalWrite(PIN_HEATER_PWM, LOW);
    digitalWrite(PIN_FAN_PWM, LOW);
  }
  
  // Atualizar display
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(currentTemp, 1);
  lcd.print(" C    ");
  
  lcd.setCursor(0, 1);
  lcd.print("Umid: ");
  lcd.print(currentHumidity, 1);
  lcd.print(" %    ");
  
  lcd.setCursor(0, 2);
  lcd.print("Alvo: ");
  lcd.print(targetTemp, 1);
  lcd.print(" C  ");
  
  lcd.setCursor(0, 3);
  lcd.print("Estado: ");
  lcd.print(digitalRead(PIN_HEATER_PWM) ? "AQUEC." : "ESTAV.");
  
  // Log serial
  Serial.printf("T:%.1f H:%.1f Alvo:%.1f\n", 
                currentTemp, currentHumidity, targetTemp);
  
  delay(2000);
}
```

## Integração com Firmware

Para uma simulação mais completa, consulte as seguintes seções de software:

- [Arquitetura do Firmware](../software/firmware/architecture) - Estrutura do código
- [Configuração Inicial](../software/firmware/setup) - Configuração do ambiente de desenvolvimento
- [Sistema de Controle](../software/firmware/control-system) - Lógica de controle PID
- [Integração de Sensores](../software/firmware/sensors-integration) - Manipulação de sensores

### Usando o Firmware Real no Wokwi

1. Clone o repositório do firmware IncuNest
2. Copie os arquivos fonte para seu projeto Wokwi
3. Ajuste as definições de pinos conforme o diagrama de simulação
4. Comente ou simule os componentes não suportados

## Limitações da Simulação

:::warning Diferenças do Hardware Real
A simulação tem limitações importantes que você deve considerar:
:::

### Não é Possível Simular

1. **Comportamento térmico real**: A inércia térmica e a distribuição de calor
2. **Ruído nos sensores**: As leituras simuladas são ideais
3. **Tempos de resposta**: Os atuadores respondem instantaneamente
4. **Consumo de energia**: Sem simulação de corrente/potência
5. **Comunicação WiFi real**: Apenas simulação básica

### Recomendações

- Use a simulação para desenvolvimento e depuração inicial
- **Sempre teste com hardware real** antes do uso clínico
- Valide os algoritmos de controle com dados reais
- Considere as tolerâncias dos componentes reais

## Recursos Adicionais

### Links Úteis

- [Documentação Wokwi](https://docs.wokwi.com/)
- [Hardware Suportado pelo Wokwi](https://docs.wokwi.com/getting-started/supported-hardware)
- [Referência DHT22 no Wokwi](https://docs.wokwi.com/parts/wokwi-dht22)
- [Referência ESP32 no Wokwi](https://docs.wokwi.com/parts/wokwi-esp32-devkit-v1)
- [Referência HX711 no Wokwi](https://docs.wokwi.com/parts/wokwi-hx711)

### Projetos de Exemplo

- [Projeto base de simulação IncuNest](https://wokwi.com/) *(em breve)*
- [Exemplos de ESP32 com sensores](https://wokwi.com/projects)

## Contribuir para a Simulação

Se você deseja melhorar o ambiente de simulação:

1. Identifique componentes que possam ser melhor simulados
2. Crie projetos de exemplo no Wokwi
3. Documente suas descobertas e compartilhe com a comunidade
4. Consulte o guia de [Contribuição](../contributing)

## Próximas Seções

- [Componentes Eletrônicos](./electronics/main-board) - Detalhes do hardware real
- [Lista de Materiais](./assembly/bom) - BOM completo do projeto
- [Visão Geral do Software](../software/overview) - Arquitetura do firmware
