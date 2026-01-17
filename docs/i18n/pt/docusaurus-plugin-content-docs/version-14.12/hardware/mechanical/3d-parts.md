---
id: 3d-parts
title: Peças Impressas em 3D
sidebar_label: Peças 3D
sidebar_position: 4
description: Componentes impressos em 3D para IncuNest
keywords: [impresión 3D, PLA, PETG, STL, piezas]
---

# Peças Impressas em 3D

# Visão Geral

Várias peças de IncuNest são projetadas para fabricação por impressão 3D, o que permite:

- **Personalização** de acordo com necessidades locais
- **Reemplazo rápido** de peças
- **Bajo custo** de produção
- **Iteração** de design fácil

## Lista de Peças

| Pieza | Material | Tempo Est. | Filamento |
|-------|-----------|---------------|----------|-----------------|
| Suporte de sensor | PETG | 2h | 15g |
| Difusor de ar | PETG | 4h | 45g |
| Carcasa display | PLA | 3h | 30g |
| Suporte PCB | PLA | 1.5h | 20g |
| Botões | PLA | 0.5h | 5g |
| Guia de cabos | PLA | 1h | 10g |
| Tapa reservatório | PETG | 1h | 12g |
| **Total** | - | **~13h** | **~137g** |

## Configuração da Impressão

## Parâmetros Gerais

| Parâmetro | PLA | PETG |
|----------|-----|-------|
| Temperatura bocal | 200-210°C | 230-250°C |
| Temperatura cama | 60°C | 70-80°C |
| Velocidade | 50mm/s | 40mm/s |
| Altura de camada | 0.2mm | 0.2mm |
| Preenchimento | 20% | 25% |
| Paredes | 3 | 3 |
| Capas sup/inf | 4 | 4 |

## Considerações de Material

**PLA (Ácido Poliláctico)**
- Gálatas Fácil de imprimir
- Gálatas Baixo warping
- ❌ Sensível ao calor (>50°C)
- Uso: Peças estruturais afastadas do calor

**PETG (Polietileno Tereftalato Glicol)**
- Gálatas Resistente ao calor (até 80°C)
- Gálatas Flexível e duradouro
- Arrogatório️ Requer mais ajuste
- Uso: Peças perto do sistema de aquecimento

## Desenhos de Peças

## 1. Suporte Sensor

Permite montar o sensor SHT31/DHT22 na câmara.

```
      ┌───────────────┐
      │    ○    ○    │ ← Agujeros de montaje M3
      │  ┌───────┐   │
      │  │SENSOR │   │
      │  │ SLOT  │   │
      │  └───────┘   │
      │              │
      └──────────────┘
      
Dimensiones: 40 x 25 x 15 mm
```

**Ficheiros**: `sensor_mount.stl`, `sensor_mount.step`

## 2. Difusor Ar

Distribue o ar quente uniformemente na câmara.

```
┌─────────────────────────────────────────────────┐
│  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  │
│     ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○     │
│  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  │
├─────────────────────────────────────────────────┤
│                  CANAL DE AIRE                  │
│                                                 │
└─────────────────────────────────────────────────┘

Dimensiones: 400 x 50 x 20 mm
Agujeros: 5mm diámetro, patrón hexagonal
```

**Material recomendado**: PETG (resistência térmica)

**Ficheiros**: `air_diffuser.stl`, `air_diffuser.step`

## 3. Pasta do Display

Aloja o ecrã LCD 20x4 ou TFT 3.5".

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    VENTANA DISPLAY    │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  [○] [○] [○] [○]           │ ← Agujeros para botones
│                             │
└─────────────────────────────┘

Dimensiones LCD: 120 x 60 x 25 mm
Dimensiones TFT: 110 x 85 x 15 mm
```

**Ficheiros**: `display_case_lcd.stl`, `display_case_tft.stl`

## 4. Suporte PCB

Monta e protege a placa principal.

```
    ┌─────────────────────────┐
    │  ○              ○      │
    │    ┌─────────────┐     │
    │    │             │     │
    │    │  ÁREA PCB   │     │
    │    │             │     │
    │    └─────────────┘     │
    │  ○              ○      │
    └─────────────────────────┘
    
Dimensiones: 110 x 90 x 10 mm
Standoffs: 5mm altura, M3
```

**Ficheiros**: `pcb_mount.stl`

## 5. Botões

Tapas para os pulsadores táteis.

```
       ┌───────┐
      ╱         ╲
     │    ▲     │   ← Símbolo grabado
     │           │
      ╲_________╱
      
Diámetro: 12mm
Altura: 8mm
Símbolos: ▲ ▼ ● ◄
```

**Ficheiros**: @@CODE0@, `button_down.stl`, `button_select.stl`, `button_back.stl`

## Post-Processamento

### Acabado de Superfície

1. **Lijado**: Lijas 200 → 400 → 800
2. **Imprimção**: Spray primeiro para plásticos
3. **Pintura** (opcional): Aerosol para plásticos
4. **Sellado** (peças de água): Epoxi ou laca

## Tratamento Térmico (PETG)

Para melhorar a resistência térmica:

1. Precalentar forno a 80°C
2. Colocar um quarto 30 minutos
3. Desligar forno e deixar arrefecer lentamente
4. Não abrir até à temperatura ambiente

## Ficheiros Disponíveis

```
hardware/
└── 3d_prints/
    ├── stl/
    │   ├── sensor_mount.stl
    │   ├── air_diffuser.stl
    │   ├── display_case_lcd.stl
    │   ├── display_case_tft.stl
    │   ├── pcb_mount.stl
    │   ├── button_up.stl
    │   ├── button_down.stl
    │   ├── button_select.stl
    │   ├── button_back.stl
    │   ├── cable_guide.stl
    │   └── reservoir_cap.stl
    ├── step/
    │   └── [archivos STEP editables]
    └── gcode/
        └── [perfiles de impresión Cura/PrusaSlicer]
```

## Dicas de Impressão

### Para Peças Funcionals

- **Orientação**: Imprimir com a face de contacto para cima
- **Soportes**: Utilizar apenas quando necessário
- **Brim**: Adicionar para peças grandes
- **Enfriamento**: 100% para PLA, 50% para PETG

## Verificação de Qualidade

Antes de utilizar, verificar:

- [ ] Sem varping na base
- [ ] Agujeiros de parafusos limpos
- [ ] Sem fios/strings entre peças
- [ ] Dimensões corretas (±0.3mm)
- [ ] Sem camadas despegadas

## Personalização

Os ficheiros STEP podem ser alterados para:

- Adaptar a diferentes displays
- Ajustar as tolerâncias da impressora
- Adicionar logos ou texto personalizado
- Modificar os pontos de montagem

**Software recomendado**: Fusion 360, FreeCAD, TinkerCAD

## Próximas Secções

- [Lista de Materiais (BOM)] (../assembly/bom)
- [Guia de Ensamblagem PCB] (../assembly/pcb-assembly)