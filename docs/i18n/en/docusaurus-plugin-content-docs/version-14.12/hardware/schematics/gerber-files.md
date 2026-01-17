---
id: gerber-files
title: Archivos Gerber
sidebar_label: Archivos Gerber
sidebar_position: 3
description: Información sobre los archivos Gerber para fabricación del PCB
keywords: [gerber, fabricación, PCB, manufactura]
---
# Gerber Files

## General Description

Gerber files are the industry standard for PCB manufacturing. They contain all the information necessary to produce the layers of the printed circuit.

## Generated Files

### File List

| Archive | Description |
|---------|-------------|
| `IncuNest-F_Cu.gtl` | Top copper layer (Top) |
| `IncuNest-B_Cu.gbl` | Bottom copper layer (Bottom) |
| `IncuNest-F_Mask.gts` | Top welding mask |
| `IncuNest-B_Mask.gbs` | Bottom Solder Mask |
| `IncuNest-F_Silkscreen.gto` | Top screen printing |
| `IncuNest-B_Silkscreen.gbo` | Bottom silkscreen |
| `IncuNest-F_Paste.gtp` | Superior Solder Paste |
| `IncuNest-B_Paste.gbp` | Bottom Solder Paste |
| `IncuNest-Edge_Cuts.gm1` | Plate outline |
| `IncuNest.drl` | Drilling File (Excellon) |
| `IncuNest-NPTH.drl` | Non-metallic drills |

### Directory Structure

```
hardware/
└── kicad/
    └── gerber/
        ├── IncuNest-F_Cu.gtl
        ├── IncuNest-B_Cu.gbl
        ├── IncuNest-F_Mask.gts
        ├── IncuNest-B_Mask.gbs
        ├── IncuNest-F_Silkscreen.gto
        ├── IncuNest-B_Silkscreen.gbo
        ├── IncuNest-F_Paste.gtp
        ├── IncuNest-B_Paste.gbp
        ├── IncuNest-Edge_Cuts.gm1
        ├── IncuNest.drl
        ├── IncuNest-NPTH.drl
        └── IncuNest-job.gbrjob
```

## Export Settings

### KiCad Configuration

To generate the Gerber files from KiCad:

1. Open PCB Editor
2. **File > Plot...**
3. Configure options:

```
Plot format: Gerber
Output directory: ./gerber/

Layers to plot:
☑ F.Cu
☑ B.Cu
☑ F.Silkscreen
☑ B.Silkscreen
☑ F.Mask
☑ B.Mask
☑ Edge.Cuts

Options:
☑ Plot reference designators
☑ Plot footprint values
☑ Check zone fills before plotting
☐ Use Protel filename extensions

Gerber Options:
☑ Use extended X2 format
☑ Include netlist attributes
☐ Disable aperture macros
Coordinate format: 4.6, unit mm
```

4. Click **Plot**
5. Click **Generate Drill Files...**

### Drilling Configuration

```
Drill File Format: Excellon
☑ PTH and NPTH in single file
☑ Oval Holes Drill Mode
Map File Format: PostScript

Drill Units: Millimeters
Zeros Format: Decimal format
```

## File Verification

### Recommended Gerber Viewer

- **Gerbv** (Linux, free)
- **GerberViewer** (Online)
- **KiCad Gerber Viewer** (Included in KiCad)
- **Tracespace** (Online)

### Checklist

Before sending to manufacturing, verify:

- [ ] All layers present
- [ ] Correct plate contour
- [ ] Drills positioned correctly
- [ ] Readable screen printing
- [ ] No visible short circuits
- [ ] Pads correctly centered
- [ ] Visible and correct roads

### Visual Verification Example

```
Layer Stack (visualización):
┌─────────────────────────────────┐
│  Top Silkscreen (blanco)        │
├─────────────────────────────────┤
│  Top Soldermask (verde)         │
├─────────────────────────────────┤
│  Top Copper (cobrizo)           │
├─────────────────────────────────┤
│  FR-4 Substrate (amarillo)      │
├─────────────────────────────────┤
│  Bottom Copper (cobrizo)        │
├─────────────────────────────────┤
│  Bottom Soldermask (verde)      │
├─────────────────────────────────┤
│  Bottom Silkscreen (blanco)     │
└─────────────────────────────────┘
```

## Recommended Manufacturers

### For Prototyping

| Manufacturer | Location | Weather | Approximate Cost |
|---------|-----------|--------|--------|
| JLCPCB | China | 5-10 days | $2-5 (5 pcs) |
| PCBWay | China | 5-10 days | $5-10 (5 pcs) |
| OSH Park | USA | 12 days | $5/sq inch |
| Isler | Europe | 5-7 days | €8-15 |

### For Production

| Manufacturer | Location | Certifications |
|------------|-----------|-----------------|
| PCBWay | China | ISO 9001, UL |
| EuroCircuits | Europe | ISO 9001, IPC |
| Advanced Circuits | USA | ISO 9001, ITAR |

## Order Specifications

### Required Information

When ordering PCBs, specify:

```
┌────────────────────────────────────────┐
│ ESPECIFICACIONES DE PCB                │
├────────────────────────────────────────┤
│ Dimensiones: 100mm x 80mm              │
│ Capas: 2                               │
│ Espesor: 1.6mm                         │
│ Material: FR-4 TG130                   │
│ Cobre: 1oz (35µm)                      │
│ Acabado: HASL Lead-free                │
│ Máscara: Verde                         │
│ Serigrafía: Blanca                     │
│ Vía mínima: 0.3mm                      │
│ Pista mínima: 0.25mm                   │
│ Espaciado mínimo: 0.2mm                │
│                                        │
│ Opciones adicionales:                  │
│ ☐ ENIG (oro)                           │
│ ☐ Impedancia controlada                │
│ ☑ Test eléctrico                       │
│ ☐ UL marking                           │
└────────────────────────────────────────┘
```

### ZIP File for Manufacturing

Create a ZIP file with:

```bash
# Estructura del ZIP
IncuNest_Gerber_v1.0.zip
├── IncuNest-F_Cu.gtl
├── IncuNest-B_Cu.gbl
├── IncuNest-F_Mask.gts
├── IncuNest-B_Mask.gbs
├── IncuNest-F_Silkscreen.gto
├── IncuNest-Edge_Cuts.gm1
├── IncuNest.drl
└── README.txt
```

**README.txt content:**
```
IncuNest PCB v1.0
=================
Board Size: 100mm x 80mm
Layers: 2
Thickness: 1.6mm
Min Track: 0.25mm
Min Space: 0.2mm
Min Drill: 0.3mm
Surface Finish: HASL Lead-free
Solder Mask: Green
Silkscreen: White

Generated with KiCad 7.0
Date: 2026-01-15
```

## Assembly Service (PCBA)

If professional assembly is desired:

### Additional Files Needed

1. **Bill of Materials (BOM)**
- CSV or Excel format
- Include: Ref, Value, Footprint, Manufacturer, MPN

2. **Pick and Place (CPL)**
- Component position file
- Format: Ref, X, Y, Rotation, Layer

3. **Drawing (optional)**
- Assembly drawing
- Special notes

### Export from KiCad

**BOM:**
```
File > Fabrication Outputs > BOM...
```

**Pick and Place:**
```
File > Fabrication Outputs > Component Placement (.pos)...
```

## Version Control

Maintain versions of Gerber files:

```
gerber/
├── v1.0/
│   ├── IncuNest-F_Cu.gtl
│   └── ...
├── v1.1/
│   ├── IncuNest-F_Cu.gtl
│   └── ...
└── latest -> v1.1/
```

Include changes file:

```markdown
# Changelog

## v1.1 (2026-02-01)
- Corregido footprint de U3
- Ampliado ancho de pistas de potencia

## v1.0 (2026-01-15)
- Versión inicial
```

## Upcoming Sections

- [Circuit Diagrams](./circuit-diagrams)
- [PCB Layout](./pcb-layout)
- [PCB Assembly](../assembly/pcb-assembly)
