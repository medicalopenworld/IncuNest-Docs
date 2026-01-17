---
id: gerber-files
title: Ficheiros Gerber
sidebar_label: Ficheiros Gerber
sidebar_position: 3
description: Informações sobre os arquivos Gerber para fabricação do PCB
keywords: [gerber, fabricación, PCB, manufactura]
---

# Ficheiros Gerber

# Descrição Geral

Os arquivos Gerber são o padrão da indústria para a fabricação de PCBs. Contém todas as informações necessárias para produzir as camadas do circuito impresso.

# Ficheiros Gerados

## Lista de Ficheiros

| Arquivo | Descrição |
|---------|-------------|
| `IncuNest-F_Cu.gtl` | Capa de cobre superior (Top) |
| `IncuNest-B_Cu.gbl` | Capa de cobre inferior (Bottom) |
| `IncuNest-F_Mask.gts` | Máscara de solda superior |
| `IncuNest-B_Mask.gbs` | Máscara de solda inferior |
| `IncuNest-F_Silkscreen.gto` | Serigrafia superior |
| `IncuNest-B_Silkscreen.gbo` | Serigrafia inferior |
| `IncuNest-F_Paste.gtp` | Pasta de solda superior |
| `IncuNest-B_Paste.gbp` | Pasta de solda inferior |
| `IncuNest-Edge_Cuts.gm1` | Contorno da placa |
| `IncuNest.drl` | Arquivo de taladrado (Excellon) |
| `IncuNest-NPTH.drl` | Taladros no metalizados |

## Estrutura de Pastas

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

## Configuração da Exportação

## Configuração KiCad

Para gerar os ficheiros Gerber do KiCad:

1. Abrir PCB Editor
2. **File > Plot...**
3. Configurar as opções:

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

4. Clique **Plot**
5. Clique **Generate Drill Files...**

## Configuração do Taladrado

```
Drill File Format: Excellon
☑ PTH and NPTH in single file
☑ Oval Holes Drill Mode
Map File Format: PostScript

Drill Units: Millimeters
Zeros Format: Decimal format
```

## Verificação de Ficheiros

## Visor de Gerber Recomendado

- **Gerbv** (Linux, gratuito)
- **GerberViewer** (Online)
- **KiCad Gerber Viewer** (Incluido em KiCad)
- **Tracespace** (Online)

## Lista de Verificação

Antes de enviar para o fabrico, verificar:

- [ ] Todas as camadas presentes
- [ ] Contorno de placa correto
- [ ] Taladros posicionados corretamente
- [ ] Serigrafia legível
- [ ] Sem curto-circuitos visíveis
- [ ] Pads corretamente centrados
- [ ] Vias visíveis e corretas

## Exemplo de Verificação Visual

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

| Fabricante | Localização | Tempo | Custo Aproximado |
|------------|------------|--------------------|--------|--------------------|---------------|--------------|-----------------|---------------|--------------------|---------------------|-------------------------|--------------------|---------------------|---------------------|--------------------|---------------------|-----------
| JLCPCB | China | 5-10 dias | $2-5 (5 pcs) |
| PCBWay | China | 5-10 dias | $5-10 (5 pcs) |
| OSH Park | USA | 12 dias | $5/sq inch |
| Aisler | Europa | 5-7 dias | €8-15 |

### Para Produção

| Fabricante | Localização | Certificações |
|------------|------------|-----------------|
| PCBWay | China | ISO 9001, UL |
| EuroCircuits | Europa | ISO 9001, IPC |
| Advanced Circuits | USA | ISO 9001, ITAR |

## Especificações para Pedido

## Informação Requerida

Ao ordenar PCBs, especificar:

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

## Ficheiro ZIP para Fabricação

Criar um ficheiro ZIP com:

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

**Conteúdo de README.txt:**
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

## Serviço de Ensamblagem (PCBA)

Se você deseja montar profissional:

## Ficheiros Adicionais

1. **Bill of Materials (BOM)**
- Formato CSV ou Excel
- Incluir: Ref, Value, Footprint, Manufacturer, MPN

2. **Pick and Place (CPL)**
- Ficheiro de posição de componentes
- Formato: Ref, X, Y, Rotation, Layer

3. **Drawing (opcional)**
- Desenho de montagem
- Notas especiais

## Exportar do KiCad

**BOM:**
```
File > Fabrication Outputs > BOM...
```

**Pick and Place:**
```
File > Fabrication Outputs > Component Placement (.pos)...
```

## Controlo de Versões

Manter as versões dos ficheiros Gerber:

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

Incluir o ficheiro de alterações:

```markdown
# Changelog

## v1.1 (2026-02-01)
- Corregido footprint de U3
- Ampliado ancho de pistas de potencia

## v1.0 (2026-01-15)
- Versión inicial
```

## Próximas Secções

- [Diagramas de Circuito] (./circuit-diagrams)
- [Layout do PCB] (./pcb-layout)
- [Ensamblagem do PCB] (../assembly/pcb-assembly)