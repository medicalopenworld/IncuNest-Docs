---
id: 3d-parts
title: Piezas Impresas en 3D
sidebar_label: 3D Parts
sidebar_position: 4
description: Componentes impresos en 3D para IncuNest
keywords: [impresión 3D, PLA, PETG, STL, piezas]
---
# 3D Printed Parts

## Overview

Several IncuNest parts are designed for 3D printing manufacturing, allowing:

- **Customization** according to local needs
- **Quick replacement** of parts
- **Low cost** of production
- **Easy Design Iteration**

## Parts List

| Piece | Materials | Est. Weather | Filament |
|-------|----------|-------------|-----------|
| Sensor support | PETG | 2h | 15g |
| Air diffuser | PETG | 4h | 45g |
| Display casing | PLA | 3h | 30g |
| PCB Support | PLA | 1.5h | 20g |
| Buttons | PLA | 0.5h | 5g |
| Cable guide | PLA | 1h | 10g |
| Reservoir cover | PETG | 1h | 12g |
| **Total** | - | **~1pm** | **~137g** |

## Print Settings

### General Parameters

| Parameter | PLA | PETG |
|-----------|-----|------|
| Nozzle temperature | 200-210°C | 230-250°C |
| Bed temperature | 60°C | 70-80°C |
| Speed | 50mm/s | 40mm/s |
| Layer height | 0.2mm | 0.2mm |
| Filling | 20% | 25% |
| Walls | 3 | 3 |
| Top/bottom layers | 4 | 4 |

### Material Considerations

**PLA (Polylactic Acid)**
- ✅ Easy to print
- ✅ Low warping
- ❌ Sensitive to heat (>50°C)
- Use: Structural parts away from heat

**PETG (Polyethylene Terephthalate Glycol)**
- ✅ Heat resistant (up to 80°C)
- ✅ Flexible and durable
- ⚠️ Requires more adjustment
- Use: Parts near the heating system

## Piece Designs

### 1. Sensor Support

Allows the SHT31/DHT22 sensor to be mounted on the camera.

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

**Files**: `sensor_mount.stl`, `sensor_mount.step`

### 2. Air Diffuser

Distributes hot air evenly in the chamber.

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

**Recommended material**: PETG (thermal resistance)

**Files**: `air_diffuser.stl`, `air_diffuser.step`

### 3. Display Housing

It houses the 20x4 LCD or 3.5" TFT screen.

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

**Files**: `display_case_lcd.stl`, `display_case_tft.stl`

### 4. PCB Support

Mounts and protects the main board.

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

**Files**: `pcb_mount.stl`

### 5. Buttons

Covers for the touch buttons.

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

**Files**: `button_up.stl`, `button_down.stl`, `button_select.stl`, `button_back.stl`

## Post-Processing

### Surface Finish

1. **Sanding**: Sandpaper 200 → 400 → 800
2. **Primer**: Spray primer for plastics
3. **Paint** (optional): Spray for plastics
4. **Sealing** (water parts): Epoxy or lacquer

### Heat Treatment (PETG)

To improve thermal resistance:

1. Preheat oven to 80°C
2. Place piece for 30 minutes
3. Turn off oven and let it cool slowly
4. Do not open until room temperature

## Available Files

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

## Printing Tips

### For Functional Parts

- **Orientation**: Print with the contact side facing up
- **Supports**: Use only when necessary
- **Brim**: Add for large pieces
- **Cooling**: 100% for PLA, 50% for PETG

### Quality Verification

Before use, check:

- [ ] No base warping
- [ ] Clean screw holes
- [ ] No threads/strings between pieces
- [ ] Correct dimensions (±0.3mm)
- [ ] No peeling off layers

## Customization

STEP files can be modified to:

- Adapt to different displays
- Adjust printer tolerances
- Add logos or custom text
- Modify mount points

**Recommended software**: Fusion 360, FreeCAD, TinkerCAD

## Upcoming Sections

- [Bill of Materials (BOM)](../assembly/bom)
- [PCB Assembly Guide](../assembly/pcb-assembly)
