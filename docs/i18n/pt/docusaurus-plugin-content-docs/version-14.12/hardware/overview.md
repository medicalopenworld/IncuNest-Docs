---
id: overview
title: Hardware - Visión General
sidebar_label: Visión General
sidebar_position: 1
description: Visión general del hardware de IncuNest
keywords: [hardware, componentes, PCB, electrónica]
---
# Hardware - Visão geral

## Introdução

O hardware IncuNest foi projetado com os seguintes princípios:

- **Acessibilidade**: Componentes disponíveis globalmente
- **Simplicidade**: Fácil de montar e reparar
- **Segurança**: Múltiplas camadas de proteção
- **Modularidade**: Componentes intercambiáveis

## Diagrama do sistema

```mermaid
flowchart TB
    subgraph POWER["Alimentación"]
        AC[AC 110-220V]
        PSU[Fuente 12V/10A]
        VREG5[Regulador 5V]
        VREG3[Regulador 3.3V]
    end
    
    subgraph MAIN["Placa Principal"]
        ESP32[ESP32-WROOM-32]
        CONN[Conectores]
    end
    
    subgraph SENSORS["Sensores"]
        TEMP1[DHT22/SHT31]
        TEMP2[DS18B20]
        WEIGHT[Celda de Carga]
    end
    
    subgraph ACTUATORS["Actuadores"]
        HEATER[Calefactor 100W]
        FAN[Ventilador 12V]
        HUMID[Humidificador]
    end
    
    subgraph DISPLAY["Interfaz"]
        LCD[LCD 20x4]
        TFT[TFT 3.5" opcional]
        LED[LEDs Estado]
        BTN[Botones]
        BUZ[Buzzer]
    end
    
    AC --> PSU
    PSU --> VREG5 --> ESP32
    PSU --> VREG3
    PSU --> ACTUATORS
    
    ESP32 <--> SENSORS
    ESP32 --> ACTUATORS
    ESP32 <--> DISPLAY
```

## Componentes Principais

### 1. Unidade de controle

| Componente | Especificação | Função |
|--------|----------------|--------|
| ESP32-WROOM-32 | 240 MHz, 520 KB de RAM | MCU principal |
| Flash 4MB | W25Q32 | Armazenamento |
| RTC DS3231 | Precisão ±2ppm | Relógio em tempo real |
| EEPROM24C32 | 32Kbit | Configurações |

### 2. Sensores

| Sensor | Interface | Precisão | Uso |
|--------|----------|-----------|-----|
| SHT31 | I2C | ±0,3°C, ±2% UR | Temperatura ambiente/zumbido |
| DS18B20 | 1 fio | ±0,5°C | Temperatura. couro |
| HX711 + Célula | Série | 0,1g | Peso (opcional) |

### 3. Atuadores

| Atuador | Especificação | Controle |
|----------|----------------|--------|
| Resistência cerâmica | 100W, 12V | PWM via MOSFET |
| Ventilador | 12V, 0,5A | PWM |
| Umidificador | Ultrassônico 5V | Ligado/Desligado |
| Campainha | 5V, 85dB | PWM/Digital |

### 4. Interface do usuário

| Componente | Especificação | Conexão |
|--------|----------------|----------|
| LCD 20x4 | Compatível com HD44780 | I2C |
| TFT 3,5" | ILI9488, 480x320 | SPI |
| LEDs | RGB, indicadores | GPIO |
| Botões | Toque 4x | GPIO |

## Diagrama de Bloco Elétrico

```
┌─────────────────────────────────────────────────────────────────┐
│                      FUENTE DE ALIMENTACIÓN                      │
├──────────────────┬──────────────────┬──────────────────────────┤
│     12V/10A      │     5V/3A        │       3.3V/1A            │
│    (Actuadores)  │   (Lógica 5V)    │    (ESP32, Sensores)     │
└────────┬─────────┴────────┬─────────┴──────────┬───────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌────────────────┐  ┌──────────────┐      ┌──────────────┐
│   CALEFACTOR   │  │    BUZZER    │      │    ESP32     │
│   100W PWM     │  │    ALARMA    │      │   MCU        │
└────────────────┘  └──────────────┘      └──────┬───────┘
         │                                        │
         │              ┌─────────────────────────┼─────────────┐
         │              │                         │             │
         ▼              ▼                         ▼             ▼
┌────────────────┐ ┌────────────┐         ┌────────────┐ ┌────────────┐
│  VENTILADOR    │ │   DISPLAY  │         │  SENSORES  │ │   WiFi     │
│   12V PWM      │ │  LCD/TFT   │         │  I2C/1Wire │ │  Integrado │
└────────────────┘ └────────────┘         └────────────┘ └────────────┘
```

## Especificações Elétricas

### Consumo de energia

| Estado | Corrente 12V | Poder |
|--------|---------------|----------|
| Espera | 0,5A | 6W |
| Aquecimento (100%) | 10A | 120W |
| Funcionamento normal | 3-5A | 36-60W |
| Somente monitoramento | 0,3A | 3,6 W |

### Proteções

- **Fusível principal**: 15A, 12V
- **Proteção contra reversão de polaridade**: Diodo Schottky
- **Reguladores com proteção térmica**
- **TVS em linhas de sinal**

## Atribuição de pinos ESP32

```cpp
// Sensores
#define PIN_DHT22           4    // Sensor temp/hum ambiente
#define PIN_DS18B20         5    // Sensor temp piel
#define PIN_SDA             21   // I2C Data
#define PIN_SCL             22   // I2C Clock
#define PIN_HX711_DT        16   // Celda de carga data
#define PIN_HX711_SCK       17   // Celda de carga clock

// Actuadores
#define PIN_HEATER_PWM      25   // Control calefactor
#define PIN_FAN_PWM         26   // Control ventilador
#define PIN_HUMIDIFIER      27   // Control humidificador
#define PIN_BUZZER          32   // Alarma sonora

// Display TFT (SPI)
#define PIN_TFT_CS          15   // TFT Chip Select
#define PIN_TFT_DC          2    // TFT Data/Command
#define PIN_TFT_RST         4    // TFT Reset
#define PIN_TFT_MOSI        23   // SPI MOSI
#define PIN_TFT_SCLK        18   // SPI Clock

// LEDs de estado
#define PIN_LED_RED         12   // LED Alarma
#define PIN_LED_GREEN       13   // LED OK
#define PIN_LED_BLUE        14   // LED Info

// Botones
#define PIN_BTN_UP          33   // Botón arriba
#define PIN_BTN_DOWN        34   // Botón abajo
#define PIN_BTN_SELECT      35   // Botón selección
#define PIN_BTN_BACK        36   // Botón volver
```

## Estrutura Mecânica

### Dimensões Gerais

| Parâmetro | Valor |
|-----------|-------|
| Dimensões externas | 60x40x50cm |
| Espaço interno | 50x30x30cm |
| Peso (vazio) | ~15kg |
| Material de habitação | Acrílico 6mm + PLA |

### Componentes Mecânicos

1. **Câmara principal**: Acrílico transparente
2. **Base estrutural**: MDF ou alumínio
3. **Sistema de aquecimento**: Dutos de ar
4. **Isolamento**: isopor
5. **Portas de acesso**: Com vedações herméticas

## Próximas seções

- [Componentes eletrônicos](./electronics/main-board) - Detalhes da PCB
- [Estrutura Mecânica](./mechanical/enclosure) - Projeto físico
- [Montagem](./assembly/bom) - Guia de construção
