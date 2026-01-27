---
id: pcb-assembly
title: PCB Assembly
sidebar_label: Ensamblaje PCB
sidebar_position: 2
description: Guía de ensamblaje del PCB de IncuNest
keywords: [PCB, soldadura, ensamblaje, electrónica]
---
# PCB Assembly

## Before You Start

### Tools Needed

- Controllable temperature soldering iron (320-380°C)
- Tin with flux (0.8mm recommended)
- Additional flux (optional but recommended)
- Desoldering iron or desoldering mesh
- Fine point tweezers
- Magnifying glass or microscope (recommended)
- Multimeter
- Third hand or PCB support

### Preliminary Inspection

Before starting, check:

- [ ] PCB without visible defects
- [ ] All components present
- [ ] Correct components according to BOM
- [ ] Clean and well-lit work area

## Assembly Order

:::tip General Rule
Weld the shorter components first, then the taller ones.
:::

### Level 1: SMD components (if applicable)

1. SMD resistors
2. SMD Capacitors
3. SMD diodes

### Level 2: Resistors and THT Diodes

```
Componente      Valor       Ubicación
─────────────────────────────────────
R1, R2, R3      10KΩ        Pull-ups
R4, R5          4.7KΩ       I2C
R6, R7, R8      330Ω        LEDs
R9, R10         1KΩ         Base transistores
D1              SS34        Protección
```

**Welding technique:**

1. Bend the legs at 90°
2. Insert into the holes
3. Ensure that the component is flat
4. Solder a pin
5. Check position
6. Solder the second pin
7. Cut excess legs

### Level 3: Capacitors

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

### Level 4: Semiconductors

#### Voltage Regulators

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

#### Transistors

```
2N2222A (TO-92)
          ╭───╮
          │   │
          └┬┬┬┘
           │││
           EBC (Emisor-Base-Colector)
           
⚠️ Verificar pinout según fabricante
```

### Level 5: Connectors

1. **Power Terminals** - Solder first
2. **Headers for ESP32** - Use the module as a guide
3. **JST Connectors** - For sensors and peripherals
4. **Terminal blocks** - For power actuators

```
Técnica para headers rectos:
1. Insertar header en PCB
2. Colocar ESP32/módulo sobre los pines
3. Soldar UN pin de cada extremo
4. Verificar alineación
5. Soldar resto de pines
6. Retirar módulo
```

### Level 6: High Components

1. Fuse and fuse holder
2. Modules (ESP32, RTC, etc.)
3. Heat sinks

## Post-Assembly Verification

### Visual Inspection

- [ ] All bright and tapered welds
- [ ] Without solder bridges
- [ ] No twisted components
- [ ] Correct polarities (capacitors, diodes)
- [ ] No excessive flux residue

### Electrical Tests

#### 1. Continuity (without power)

```
Prueba              Resultado Esperado
────────────────────────────────────────
VCC - GND           NO continuidad (>1MΩ)
Entre pistas        NO continuidad
Conexiones          Continuidad (<1Ω)
```

#### 2. First Feeding

:::warning Safe Procedure
Use power supply with current limit (100mA initial).
:::

1. Connect multimeter in series ammeter mode
2. Apply 12V slowly
3. Check consumption < 50mA without modules
4. Measure output voltages:
- 5V rail: 4.9V - 5.1V ✓
- 3.3V rail: 3.2V - 3.4V ✓

#### 3. Try with ESP32

1. Insert ESP32 into headers
2. Power the system
3. Check ESP32 power LED
4. Connect via USB and verify serial communication

## Troubleshooting

### Power Short Circuit

1. **Disconnect immediately**
2. Visually inspect for bridges
3. Check polarity of capacitors
4. Use multimeter to locate the short
5. Desolder suspicious components one by one

### Regulator Overheats

**Possible causes:**
- Short circuit at the output
- Excess load
- Missing input/output capacitor

**Solution:**
- Check charging current
- Add heat sink
- Consider regulator switching

### ESP32 Not Responding

1. Check voltage 3.3V on power pins
2. Check EN and IO0 connections
3. Test boot with BOOT button pressed
4. Verify installed USB driver

## Soldering Tips

### Temperature

| Component | Temperature |
|------------|-------------|
| THT Components | 320-350°C |
| Small SMD | 300-320°C |
| Large connectors | 350-380°C |
| Lead Free | +20-30°C |

### Correct Technique

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

### Welding Sequence

1. Clean soldering iron tip
2. Apply soldering iron to pad AND pin (2s)
3. Apply tin to the joint point
4. Remove tin
5. Remove soldering iron
6. Do not move until it solidifies

## Upcoming Sections

- [Mechanical Assembly](./mechanical-assembly)
- [Wired](./wiring)
- [Tests](./testing)
