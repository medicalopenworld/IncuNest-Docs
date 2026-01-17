---
id: power-supply
title: Fonte de Alimentação
sidebar_label: Fonte de Alimentação
sidebar_position: 5
description: Sistema de alimentação de IncuNest
keywords: [fuente, alimentación, voltaje, corriente, UPS]
---

# Fonte de Alimentação

## Requisitos do Sistema

| Parâmetro | Valor |
|-----------|-------|
| Entrada AC | 110-220V, 50/60Hz |
| Saída DC Principal | 12V, 10A |
| Potência Total | 120W |
| Voltagens Lógicos | 5V, 3.3V |

## Diagrama do Sistema de Alimentação

```mermaid
flowchart TB
    AC[AC 110-220V] --> PSU[Fuente 12V/10A]
    PSU --> F1[Fusible 15A]
    F1 --> BUS12[Bus 12V]
    
    BUS12 --> HEATER[Calefactor]
    BUS12 --> FAN[Ventilador]
    BUS12 --> REG5[Regulador 5V]
    
    REG5 --> BUS5[Bus 5V]
    BUS5 --> LCD[LCD]
    BUS5 --> BUZZER[Buzzer]
    BUS5 --> HUMID[Humidificador]
    BUS5 --> REG33[Regulador 3.3V]
    
    REG33 --> BUS33[Bus 3.3V]
    BUS33 --> ESP32[ESP32]
    BUS33 --> SENSORS[Sensores]
```

## Fonte de Alimentação Principal

### Especificações Recomendadas

| Parâmetro | Mínimo | Recomendado |
|-----------|--------|-----------------|
| Voltagem de saída | 12V ±5% | 12V ±2% |
| Corrente | 10A | 12A |
| Regulação de carga | 5% | 2% |
| Ripple | 200mV | 100mV |
| Eficiência | 80% | 85%+ |
| Certificações | - | CE, UL, FCC |

### Fontes Recomendadas

| Modelo | Potência | Preço Aprox. |
|--------|----------|--------------------|
| Mean Well LRS-150-12 | 150W | $25 USD |
| Mean Well RS-150-12 | 150W | $30 USD |
| Fonte genérica 12V/10A | 120W | $15 USD |

## Circuito de Entrada

```
                    ┌─────────────────────────────────────┐
                    │                                     │
    AC L ───────────┤ L        FUENTE 12V/10A        +12V├───► 12V_OUT
                    │              150W                   │
    AC N ───────────┤ N                              GND ├───► GND
                    │                                     │
    AC PE ──────────┤ PE (Tierra)                        │
                    │                                     │
                    └─────────────────────────────────────┘
```

## Reguladores de Voltagem

## Regulador 5V

**Componente**: AMS1117-5.0 ou LM7805

```
           12V_IN
              │
          ┌───┴───┐
    C1    │       │    C2
   100µF  │ REG5V │   100µF
    ═══   │       │    ═══
     │    │       │     │
     │    │  OUT  │     │
     │    └───┬───┘     │
     │        │         │
     └────────┼─────────┘
              │
              ▼
            5V_OUT
```

| Parâmetro | Valor |
|-----------|-------|
| Entrada | 7-12V |
| Saída | 5V |
| Corrente máx | 1.5A |
| Dropout | 1.3V |

### Regulador 3.3V

**Componente**: AMS1117-3.3

```
           5V_IN
              │
          ┌───┴───┐
    C3    │       │    C4
   100µF  │REG3.3V│   100µF
    ═══   │       │    ═══
     │    │       │     │
     │    │  OUT  │     │
     │    └───┬───┘     │
     │        │         │
     └────────┼─────────┘
              │
              ▼
           3.3V_OUT
```

# Protecções

## Fusível Principal

```
    12V_IN ───[F1 15A]─── 12V_PROTECTED
```

- **Tipo**: Fusível de vidro 5x20mm
- **Valor**: 15A
- **Voltagem**: 250V

### Proteção contra Investimento da Polaridade

```
    12V_IN ───|◄──[D1]───── 12V_PROTECTED
              SS34
```

- **Componente**: Diodo Schottky SS34
- **Corriente**: 3A
- **Caída**: 0,5V

## TVS para Proteção contra Transitório

```
    SIGNAL ─────┬───── PROTECTED_SIGNAL
                │
               ─┴─
              │TVS│
               ─┬─
                │
               GND
```

## Sistema UPS (Opcional)

Para aplicações críticas, recomenda-se um sistema de apoio.

### Design Básico com Bateria

```mermaid
flowchart LR
    AC[AC Input] --> CHARGER[Cargador]
    CHARGER --> BAT[Batería 12V]
    BAT --> DCDC[DC-DC Conv]
    DCDC --> SYSTEM[Sistema]
    AC --> RELAY[Relé]
    RELAY -->|AC OK| DCDC
```

## Especificações da UPS

| Parâmetro | Valor |
|-----------|-------|
| Bateria | 12V 7Ah SLA |
| Autonomia | ~30 minutos |
| Tempo de comutação | menor que 10ms |
| Carregador | 13.8V, 1A |

## Circuito Simplificado

```
                    ┌──────────────┐
    AC ─────────────┤   CARGADOR   ├─────┬──────► 12V_OUT
                    │   12V/1A     │     │
                    └──────────────┘     │
                                         │
                    ┌──────────────┐     │
                    │   BATERÍA    ├─────┘
                    │  12V 7Ah     │
                    └──────────────┘
```

## Monitoramento de Alimentação

## Circuito Divisor de Voltagem

Para medir a tensão da bateria/fonte:

```
    12V_IN ───[R1 10K]───┬───[R2 3.3K]─── GND
                         │
                         └───► ADC_PIN (ESP32)
```

Voltagem máxima em ADC: V_ADC = 12V × (3.3K / (10K + 3.3K)) = 2.98V

### Código de Monitoramento

```cpp
#define VOLTAGE_PIN 39  // ADC1_CH3
#define VOLTAGE_DIVIDER_RATIO 4.03  // (10K + 3.3K) / 3.3K

float readSupplyVoltage() {
    int rawADC = analogRead(VOLTAGE_PIN);
    float voltage = (rawADC / 4095.0) * 3.3 * VOLTAGE_DIVIDER_RATIO;
    return voltage;
}

void checkPowerStatus() {
    float voltage = readSupplyVoltage();
    
    if (voltage < 11.0) {
        raiseAlarm(ALARM_LOW_VOLTAGE, "Voltaje bajo");
    } else if (voltage > 13.0) {
        raiseAlarm(ALARM_HIGH_VOLTAGE, "Voltaje alto");
    }
}
```

## Consumo por Subssistema

| Subsistema | Voltaje | Corrente Típica | Corrente Máxima |
|-----------|-----------|--------------------|-------------------|-------------------|
| ESP32 | 3.3V | 80mA | 500mA (WiFi TX) |
| Sensores | 3.3V | 10mA | 20mA |
| LCD | 5V | 50mA | 100mA |
| TFT | 3.3V | 100mA | 150mA |
| Buzzer | 5V | 30mA | 50mA |
| Calefator | 12V | 0-8A | 8.3A |
| Ventilador | 12V | 200mA | 500mA |
| Humidificador | 5V | 150mA | 200mA |

## Considerações de Desenho

## Disipação Calor

Os reguladores lineares dissipam calor:

```
P_disipada = (V_in - V_out) × I_out
```

Para o regulador 5V com carga de 1A:
```
P = (12V - 5V) × 1A = 7W
```

**Solução**: Usar dissipador de calor ou regulador switching.

### Desacoplamento

- Capacitor de 100μF em cada regulador
- Capacitor de 100nF cerca de cada IC
- Capacitor de 10μF perto do ESP32

## Lista de Componentes

| Ref | Componente | Valor | Quantidade |
|-----|-------------|-------|--------|
| PSU | Fonte switching | 12V 10A | 1 |
| U1 | Regulador | AMS1117-5.0 | 1 |
| U2 | Regulador | AMS1117-3.3 | 1 |
| F1 | Fusible | 15A 5x20mm | 1 |
| D1 | Diodo Schottky | SS34 | 1 |
| C1-C4 | Capacitor | 100μF 25V | 4 |
| C5-C10 | Capacitor | 100nF 50V | 6 |

## Próximas Secções

- [Ensamblagem PCB] (../assembly/pcb-assembly)