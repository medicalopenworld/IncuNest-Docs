---
id: pcb-assembly
title: Montagem de PCB
sidebar_label: Montagem de PCB
sidebar_position: 2
description: Guía de ensamblaje del PCB de IncuNest
keywords: [PCB, soldadura, ensamblaje, electrónica]
---
# Montagem de PCB

## Antes de começar

### Ferramentas necessárias

- Ferro de soldar com temperatura controlável (320-380°C)
- Estanho com fluxo (recomendado 0,8 mm)
- Fluxo adicional (opcional, mas recomendado)
- Ferro de dessoldagem ou malha de dessoldagem
- Pinça de ponta fina
- Lupa ou microscópio (recomendado)
- Multímetro
- Suporte de terceira mão ou PCB

### Inspeção Preliminar

Antes de começar, verifique:

- [] PCB sem defeitos visíveis
- [] Todos os componentes presentes
- [] Corrigir componentes de acordo com BOM
- [ ] Área de trabalho limpa e bem iluminada

## Ordem de montagem

:::dica Regra Geral
Solde primeiro os componentes mais curtos e depois os mais altos.
:::

### Nível 1: componentes SMD (se aplicável)

1. Resistores SMD
2. Capacitores SMD
3. Diodos SMD

### Nível 2: Resistores e Diodos THT

```
Componente      Valor       Ubicación
─────────────────────────────────────
R1, R2, R3      10KΩ        Pull-ups
R4, R5          4.7KΩ       I2C
R6, R7, R8      330Ω        LEDs
R9, R10         1KΩ         Base transistores
D1              SS34        Protección
```

**Técnica de soldagem:**

1. Dobre as pernas em 90°
2. Insira nos orifícios
3. Certifique-se de que o componente esteja plano
4. Solde um pino
5. Verifique a posição
6. Solde o segundo pino
7. Corte o excesso de pernas

### Nível 3: Capacitores

```
Capacitores Cerámicos (primero)
──────────────────────────────
C1-C6: 100nF cerca de ICs

Capacitores Electrolíticos (después)
────────────────────────────────────
C7-C10: 100µF en reguladores
        ⚠️ RESPETAR POLARIDAD
        - Banda blanca = negativo
```

### Nível 4: Semicondutores

#### Reguladores de Tensão

```
           ┌─────────────────┐
           │   AMS1117-X.X   │
           │    ┌─┬─┬─┐      │
           │    │ │ │ │      │
           └────┴─┴─┴─┴──────┘
                 │ │ │
                GND│ OUT
                   IN

⚠️ Verificar orientación antes de soldar
⚠️ Considerar disipador si hay espacio
```

#### MOSFETs

```
IRLZ44N (TO-220)
           ┌───────┐
           │ ┌───┐ │
           │ │   │ │
           │ └───┘ │
           └─┬─┬─┬─┘
             │ │ │
             G D S
             
Montaje:
1. Aplicar pasta térmica si usa disipador
2. Insertar en PCB
3. Fijar con tornillo si hay disipador
4. Soldar pines
```

#### Transistores

```
2N2222A (TO-92)
          ╭───╮
          │   │
          └┬┬┬┘
           │││
           EBC (Emisor-Base-Colector)
           
⚠️ Verificar pinout según fabricante
```

### Nível 5: Conectores

1. **Terminais de alimentação** - Solde primeiro
2. **Cabeçalhos para ESP32** - Use o módulo como guia
3. **Conectores JST** – Para sensores e periféricos
4. **Blocos de terminais** - Para atuadores de potência

```
Técnica para headers rectos:
1. Insertar header en PCB
2. Colocar ESP32/módulo sobre los pines
3. Soldar UN pin de cada extremo
4. Verificar alineación
5. Soldar resto de pines
6. Retirar módulo
```

### Nível 6: Componentes Altos

1. Fusível e porta-fusível
2. Módulos (ESP32, RTC, etc.)
3. Dissipadores de calor

## Verificação pós-montagem

### Inspeção Visual

- [] Todas as soldas brilhantes e cônicas
- [ ] Sem pontes de solda
- [] Sem componentes torcidos
- [] Polaridades corretas (capacitores, diodos)
- [] Nenhum resíduo de fluxo excessivo

### Testes elétricos

#### 1. Continuidade (sem energia)

```
Prueba              Resultado Esperado
────────────────────────────────────────
VCC - GND           NO continuidad (>1MΩ)
Entre pistas        NO continuidad
Conexiones          Continuidad (<1Ω)
```

#### 2. Primeira alimentação

:::aviso Procedimento Seguro
Utilize fonte de alimentação com limite de corrente (100mA inicial).
:::

1. Conecte o multímetro no modo amperímetro em série
2. Aplique 12V lentamente
3. Verifique o consumo < 50mA sem módulos
4. Meça as tensões de saída:
- Trilho 5V: 4,9V - 5,1V ✓
- Trilho 3,3V: 3,2V - 3,4V ✓

#### 3. Experimente com ESP32

1. Insira ESP32 nos cabeçalhos
2. Ligue o sistema
3. Verifique o LED de alimentação do ESP32
4. Conecte via USB e verifique a comunicação serial

## Solução de problemas

### Curto-circuito de energia

1. **Desconecte imediatamente**
2. Inspecione visualmente as pontes
3. Verifique a polaridade dos capacitores
4. Use o multímetro para localizar o curto
5. Dessolde componentes suspeitos um por um

### Regulador superaquece

**Possíveis causas:**
- Curto-circuito na saída
- Excesso de carga
- Capacitor de entrada/saída ausente

**Solução:**
- Verifique a corrente de carga
- Adicionar dissipador de calor
- Considere a troca do regulador

### ESP32 não responde

1. Verifique a tensão de 3,3 V nos pinos de alimentação
2. Verifique as conexões EN e IO0
3. Teste a inicialização com o botão BOOT pressionado
4. Verifique o driver USB instalado

## Dicas de soldagem

### Temperatura

| Componente | Temperatura |
|------------|-------------|
| Componentes THT | 320-350°C |
| SMD pequeno | 300-320°C |
| Conectores grandes | 350-380°C |
| Sem chumbo | +20-30°C |

### Técnica Correta

```
     INCORRECTO          CORRECTO
         │                   │
    ╭────┴────╮         ╭────┴────╮
    │ ░░░░░░░ │         │    ●    │
    │ fría    │         │ cónica  │
    └─────────┘         └─────────┘
    
    ╭────┬────╮         ╭────┬────╮
    │    ░    │         │    ●    │
    │ exceso  │         │ justa   │
    └─────────┘         └─────────┘
```

### Sequência de soldagem

1. Limpe a ponta do ferro de solda
2. Aplique o ferro de solda na almofada E no pino (2s)
3. Aplique estanho no ponto de junta
4. Remova a lata
5. Remova o ferro de solda
6. Não se mova até solidificar

## Próximas seções

- [Montagem Mecânica](./mechanical-assembly)
- [Com fio](./wiring)
- [Testes](./testing)
