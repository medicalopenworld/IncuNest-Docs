---
id: gerber-files
title: Archivos Gerber
sidebar_label: Archivos Gerber
sidebar_position: 3
description: Información sobre los archivos Gerber para fabricación del PCB
keywords: [gerber, fabricación, PCB, manufactura]
---

# Archivos Gerber

## Descripción General

Los archivos Gerber son el estándar de la industria para la fabricación de PCBs. Contienen toda la información necesaria para producir las capas del circuito impreso.

## Archivos Generados

### Lista de Archivos

| Archivo | Descripción |
|---------|-------------|
| `IncuNest-F_Cu.gtl` | Capa de cobre superior (Top) |
| `IncuNest-B_Cu.gbl` | Capa de cobre inferior (Bottom) |
| `IncuNest-F_Mask.gts` | Máscara de soldadura superior |
| `IncuNest-B_Mask.gbs` | Máscara de soldadura inferior |
| `IncuNest-F_Silkscreen.gto` | Serigrafía superior |
| `IncuNest-B_Silkscreen.gbo` | Serigrafía inferior |
| `IncuNest-F_Paste.gtp` | Pasta de soldadura superior |
| `IncuNest-B_Paste.gbp` | Pasta de soldadura inferior |
| `IncuNest-Edge_Cuts.gm1` | Contorno de la placa |
| `IncuNest.drl` | Archivo de taladrado (Excellon) |
| `IncuNest-NPTH.drl` | Taladros no metalizados |

### Estructura de Directorios

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

## Configuración de Exportación

### Configuración KiCad

Para generar los archivos Gerber desde KiCad:

1. Abrir PCB Editor
2. **File > Plot...**
3. Configurar opciones:

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

### Configuración de Taladrado

```
Drill File Format: Excellon
☑ PTH and NPTH in single file
☑ Oval Holes Drill Mode
Map File Format: PostScript

Drill Units: Millimeters
Zeros Format: Decimal format
```

## Verificación de Archivos

### Visor de Gerber Recomendado

- **Gerbv** (Linux, gratuito)
- **GerberViewer** (Online)
- **KiCad Gerber Viewer** (Incluido en KiCad)
- **Tracespace** (Online)

### Lista de Verificación

Antes de enviar a fabricación, verificar:

- [ ] Todas las capas presentes
- [ ] Contorno de placa correcto
- [ ] Taladros posicionados correctamente
- [ ] Serigrafía legible
- [ ] Sin cortocircuitos visibles
- [ ] Pads correctamente centrados
- [ ] Vias visibles y correctas

### Ejemplo de Verificación Visual

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

## Fabricantes Recomendados

### Para Prototipado

| Fabricante | Ubicación | Tiempo | Costo Aproximado |
|------------|-----------|--------|------------------|
| JLCPCB | China | 5-10 días | $2-5 (5 pcs) |
| PCBWay | China | 5-10 días | $5-10 (5 pcs) |
| OSH Park | USA | 12 días | $5/sq inch |
| Aisler | Europa | 5-7 días | €8-15 |

### Para Producción

| Fabricante | Ubicación | Certificaciones |
|------------|-----------|-----------------|
| PCBWay | China | ISO 9001, UL |
| EuroCircuits | Europa | ISO 9001, IPC |
| Advanced Circuits | USA | ISO 9001, ITAR |

## Especificaciones para Pedido

### Información Requerida

Al ordenar PCBs, especificar:

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

### Archivo ZIP para Fabricación

Crear un archivo ZIP con:

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

**Contenido de README.txt:**
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

## Servicio de Ensamblaje (PCBA)

Si se desea ensamblaje profesional:

### Archivos Adicionales Necesarios

1. **Bill of Materials (BOM)**
   - Formato CSV o Excel
   - Incluir: Ref, Value, Footprint, Manufacturer, MPN

2. **Pick and Place (CPL)**
   - Archivo de posición de componentes
   - Formato: Ref, X, Y, Rotation, Layer

3. **Drawing (opcional)**
   - Dibujo de ensamblaje
   - Notas especiales

### Exportar desde KiCad

**BOM:**
```
File > Fabrication Outputs > BOM...
```

**Pick and Place:**
```
File > Fabrication Outputs > Component Placement (.pos)...
```

## Control de Versiones

Mantener versiones de los archivos Gerber:

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

Incluir archivo de cambios:

```markdown
# Changelog

## v1.1 (2026-02-01)
- Corregido footprint de U3
- Ampliado ancho de pistas de potencia

## v1.0 (2026-01-15)
- Versión inicial
```

## Próximas Secciones

- [Diagramas de Circuito](./circuit-diagrams)
- [Layout del PCB](./pcb-layout)
- [Ensamblaje del PCB](../assembly/pcb-assembly)
