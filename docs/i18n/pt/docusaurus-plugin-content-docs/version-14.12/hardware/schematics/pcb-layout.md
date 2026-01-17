---
id: pcb-layout
title: Layout PCB
sidebar_label: Layout PCB
sidebar_position: 2
description: Informações sobre o design do PCB IncuNest
keywords: [PCB, layout, diseño, capas]
---

# Layout do PCB

## Especificações do PCB

## Características Gerais

| Parâmetro | Valor |
|-----------|-------|
| Dimensões | 100mm x 80mm |
| Capas | 2 (Top e Bottom) |
| Espesor | 1.6mm |
| Material | FR-4 |
| Espesor de cobre | 1oz (35μm) |
| Acabado superficial | HASL com chumbo ou sem chumbo |
| Máscara de solda | Verde |
| Serigrafia | Blanca |

## Regras de Desenho

| Parâmetro | Valor Mínimo |
|-----------|---------------|
| Largura de pista (señal) | 0.25mm (10mil) |
| Largura de pista (potência) | 1.0mm (40mil) |
| Separação faixa-pista | 0,2mm (8mil) |
| Separação pista-pad | 0.2mm (8mil) |
| Diâmetro mínimo via | 0.4mm |
| Taladro mínimo via | 0.3mm |
| Anel anular mínimo | 0.15mm |

## Distribuição de Componentes

## Vista Superior (Top Layer)

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [POWER IN]     [REGULATORS]              [ESP32 MODULE]          │
│   ┌───────┐      ┌────┐ ┌────┐           ┌──────────────┐          │
│   │ 12V   │      │5V  │ │3.3V│           │              │          │
│   │ GND   │      │REG │ │REG │           │   ESP32      │          │
│   └───────┘      └────┘ └────┘           │   WROOM-32   │          │
│                                          │              │          │
│   [FUSE]    [TVS]                        │   [ANTENNA]  │          │
│   ┌───┐     ┌───┐                        └──────────────┘          │
│   │ F1│     │TVS│                                                   │
│   └───┘     └───┘                        [STATUS LED]              │
│                                          ┌───┐                      │
│                                          │LED│                      │
│   [SSR CONTROL]    [MOSFET CONTROL]      └───┘                      │
│   ┌──────────┐     ┌──────────────┐                                │
│   │ SSR      │     │   MOSFET     │      [BUZZER]                  │
│   │ Driver   │     │   Fan Driver │      ┌─────┐                   │
│   └──────────┘     └──────────────┘      │ BUZ │                   │
│                                          └─────┘                    │
│                                                                     │
│   [I2C CONNECTOR]  [ONEWIRE]      [ACTUATOR CONNECTORS]           │
│   ┌─────────┐      ┌─────────┐    ┌─────┐ ┌─────┐ ┌─────┐         │
│   │SDA SCL  │      │ DS18B20 │    │HEAT │ │ FAN │ │ HUM │         │
│   │VCC GND  │      │ CONN    │    │     │ │     │ │     │         │
│   └─────────┘      └─────────┘    └─────┘ └─────┘ └─────┘         │
│                                                                     │
│   [USB CONNECTOR]        [PROGRAMMING HEADER]                      │
│   ┌───────────┐          ┌────────────────┐                        │
│   │  MICRO B  │          │ TX RX EN BOOT  │                        │
│   └───────────┘          └────────────────┘                        │
│                                                                     │
│   ○ M1                                               M2 ○          │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
     ○ M3                                               M4 ○
```

### Vista Inferior (Bottom Layer)

A camada inferior contém principalmente:
- Plano de terra (GND)
- Faixas de retorno de sinal
- Algumas pistas de interconexão

## Zonas do PCB

## Zona de Potência

```
┌─────────────────────────────────────┐
│  ZONA DE POTENCIA                   │
│  ┌─────────────────────────────────┐│
│  │ • Entrada 12V                   ││
│  │ • Reguladores                   ││
│  │ • Drivers de potencia (SSR, MOSFET) ││
│  │ • Capacitores de filtrado       ││
│  │                                 ││
│  │ Pistas: mínimo 1mm              ││
│  │ Separación: mayor a 0.5mm       ││
│  │ Via stitching para tierra       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Zona Digital

```
┌─────────────────────────────────────┐
│  ZONA DIGITAL                       │
│  ┌─────────────────────────────────┐│
│  │ • ESP32 y componentes asociados ││
│  │ • Conectores de sensores        ││
│  │ • LED y buzzer                  ││
│  │                                 ││
│  │ Pistas: 0.25mm típico           ││
│  │ Impedancia controlada para USB  ││
│  │ Decoupling capacitors cercanos  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Zona de RF (WiFi)

```
┌─────────────────────────────────────┐
│  ZONA DE ANTENA                     │
│  ┌─────────────────────────────────┐│
│  │ • Keepout bajo antena ESP32     ││
│  │ • Sin cobre en ambas capas      ││
│  │ • Sin componentes cercanos      ││
│  │ • Distancia mínima: 15mm        ││
│  │                                 ││
│  │ ┌───────────────┐               ││
│  │ │   KEEPOUT     │               ││
│  │ │   ZONE        │               ││
│  │ │ (No copper)   │               ││
│  │ └───────────────┘               ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Considerações de Desenho

## Plano de Terra

- Plano de terra sólido em camada inferior
- Via stitching em torno da placa (cada 5mm)
- Separação de terras analógica/digital com conexão em um ponto

```
        Digital GND          Analog GND
            │                    │
            │                    │
    ┌───────┴────────────────────┴───────┐
    │                ★                   │  ← Punto de unión
    │         GROUND PLANE               │
    └────────────────────────────────────┘
```

## Capacitores de Desacoplo

Localização de capacitores de bypass:

```
    ESP32
    ┌─────────────────┐
    │                 │
    │   ┌───┐   ┌───┐ │
    │   │C1 │   │C2 │ │
    │   │100│   │10n│ │
    │   │nF │   │F  │ │
    │   └─┬─┘   └─┬─┘ │
    │     │       │   │
    │   VCC     VCC   │
    └─────────────────┘
    
    Distancia máxima a pin: 3mm
```

## Ruteo USB

- Faixas diferenciais D+ e D-
- Impedância: 90Ω diferencial
- Comprimento igualada (±0.5mm)
- Sem vias no par diferencial

```
    USB CONN           ESP32
    ┌────┐            ┌─────┐
    │D+  ├────────────┤D+   │
    │    │ ═══════════│     │
    │D-  ├────────────┤D-   │
    └────┘            └─────┘
    
    Ancho de pista: 0.4mm
    Separación: 0.15mm
    Plano de tierra debajo
```

## Lista de Componentes por Zona

## Zona de Potência

| Ref | Valor | Footprint |
|-----|-------|--------------|
| J1 | Terminal 2-pin | Terminal_5.08mm |
| F1 | Fusible 10A | Fuse_5x20mm |
| D1 | TVS P6KE15 | JO-201 |
| D2 | SS34 | SMA |
| U1 | AMS1117-5.0 | SOT-223 |
| U2 | AMS1117-3.3 | SOT-223 |
| C1-C4 | 100μF/25V | Cap_8x10mm |
| C5-C8 | 10μF/16V | 0805 |

## Zona do ESP32

| Ref | Valor | Footprint |
|-----|-------|--------------|
| U3 | ESP32-WROOM-32 | ESP32-WROOM |
| C9-C12 | 100nF | 0402 |
| R1-R2 | 10kΩ (I2C pull-up) | 0402 |
| R3 | 1kΩ (LED) | 0402 |
| LED1 | LED Verde | 0603 |

## Conectores

| Ref | Descrição | Footprint |
|-----|--------------|--------------|
| J2 | Micro USB | USB_Micro_B |
| J3 | I2C Header | Pin_Header_1x4 |
| J4 | OneWire | Pin_Header_1x3 |
| J5-J7 | Atuadores | Terminal_3.5mm |

## Ficheiros de Desenho

Os ficheiros de design estão disponíveis no formato KiCad:

```
hardware/kicad/
├── IncuNest.kicad_pro
├── IncuNest.kicad_sch
├── IncuNest.kicad_pcb
├── fp-lib-table
├── sym-lib-table
└── gerber/
    └── (archivos de fabricación)
```

## Próximas Secções

- [Diagramas de Circuito] (./circuit-diagrams)
- [Archivos Gerber] (./gerber-files)