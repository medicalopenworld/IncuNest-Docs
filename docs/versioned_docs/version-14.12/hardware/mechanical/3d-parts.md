---
id: 3d-parts
title: Piezas Impresas en 3D
sidebar_label: Piezas 3D
sidebar_position: 4
description: Componentes impresos en 3D para IncuNest
keywords: [impresión 3D, PLA, PETG, STL, piezas]
---

# Piezas Impresas en 3D

## Visión General

Varias piezas de IncuNest están diseñadas para fabricación mediante impresión 3D, lo que permite:

- **Personalización** según necesidades locales
- **Reemplazo rápido** de piezas
- **Bajo costo** de producción
- **Iteración** de diseño fácil

## Lista de Piezas

| Pieza | Material | Tiempo Est. | Filamento |
|-------|----------|-------------|-----------|
| Soporte de sensor | PETG | 2h | 15g |
| Difusor de aire | PETG | 4h | 45g |
| Carcasa display | PLA | 3h | 30g |
| Soporte PCB | PLA | 1.5h | 20g |
| Botones | PLA | 0.5h | 5g |
| Guía de cables | PLA | 1h | 10g |
| Tapa reservorio | PETG | 1h | 12g |
| **Total** | - | **~13h** | **~137g** |

## Configuración de Impresión

### Parámetros Generales

| Parámetro | PLA | PETG |
|-----------|-----|------|
| Temperatura boquilla | 200-210°C | 230-250°C |
| Temperatura cama | 60°C | 70-80°C |
| Velocidad | 50mm/s | 40mm/s |
| Altura de capa | 0.2mm | 0.2mm |
| Relleno | 20% | 25% |
| Paredes | 3 | 3 |
| Capas sup/inf | 4 | 4 |

### Consideraciones de Material

**PLA (Ácido Poliláctico)**
- ✅ Fácil de imprimir
- ✅ Bajo warping
- ❌ Sensible al calor (>50°C)
- Uso: Piezas estructurales alejadas del calor

**PETG (Polietileno Tereftalato Glicol)**
- ✅ Resistente al calor (hasta 80°C)
- ✅ Flexible y duradero
- ⚠️ Requiere más ajuste
- Uso: Piezas cerca del sistema de calefacción

## Diseños de Piezas

### 1. Soporte de Sensor

Permite montar el sensor SHT31/DHT22 en la cámara.

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

**Archivos**: `sensor_mount.stl`, `sensor_mount.step`

### 2. Difusor de Aire

Distribuye el aire caliente uniformemente en la cámara.

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

**Material recomendado**: PETG (resistencia térmica)

**Archivos**: `air_diffuser.stl`, `air_diffuser.step`

### 3. Carcasa del Display

Aloja la pantalla LCD 20x4 o TFT 3.5".

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

**Archivos**: `display_case_lcd.stl`, `display_case_tft.stl`

### 4. Soporte de PCB

Monta y protege la placa principal.

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

**Archivos**: `pcb_mount.stl`

### 5. Botones

Tapas para los pulsadores táctiles.

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

**Archivos**: `button_up.stl`, `button_down.stl`, `button_select.stl`, `button_back.stl`

## Post-Procesamiento

### Acabado de Superficie

1. **Lijado**: Lijas 200 → 400 → 800
2. **Imprimación**: Spray primer para plásticos
3. **Pintura** (opcional): Aerosol para plásticos
4. **Sellado** (piezas de agua): Epoxi o laca

### Tratamiento Térmico (PETG)

Para mejorar la resistencia térmica:

1. Precalentar horno a 80°C
2. Colocar pieza 30 minutos
3. Apagar horno y dejar enfriar lentamente
4. No abrir hasta temperatura ambiente

## Archivos Disponibles

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

## Consejos de Impresión

### Para Piezas Funcionales

- **Orientación**: Imprimir con la cara de contacto hacia arriba
- **Soportes**: Usar solo cuando sea necesario
- **Brim**: Añadir para piezas grandes
- **Enfriamiento**: 100% para PLA, 50% para PETG

### Verificación de Calidad

Antes de usar, verificar:

- [ ] Sin warping en la base
- [ ] Agujeros de tornillos limpios
- [ ] Sin hilos/strings entre piezas
- [ ] Dimensiones correctas (±0.3mm)
- [ ] Sin capas despegadas

## Personalización

Los archivos STEP pueden modificarse para:

- Adaptar a diferentes displays
- Ajustar tolerancias de impresora
- Añadir logos o texto personalizado
- Modificar puntos de montaje

**Software recomendado**: Fusion 360, FreeCAD, TinkerCAD

## Próximas Secciones

- [Lista de Materiales (BOM)](../assembly/bom)
- [Guía de Ensamblaje PCB](../assembly/pcb-assembly)
