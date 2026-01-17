---
id: gerber-files
title: Fichiers Gerber
sidebar_label: Fichiers Gerber
sidebar_position: 3
description: Informations sur les fichiers Gerber pour la fabrication de PCB
keywords: [gerber, fabricación, PCB, manufactura]
---

♪ Les fichiers Gerber

Description générale

Les fichiers Gerber sont la norme de l'industrie pour la fabrication des BPC. Ils contiennent toutes les informations nécessaires pour produire les couches du circuit imprimé.

Fichiers générés

Liste de fichiers

- 124; dossier - 124; description - 124;
- 124;
- 124; @ @ CODE0 @ @ - 124; couche supérieure de cuivre (en haut) - 124;
- 124; @ @ CODE1 @ - 124; couche inférieure de cuivre (Bottom) - 124;
- 124; @ @ CODE2 @ @ - 124;
- 124; @ @ CODE3 @ @ - 124;
- 124; @ @ CODE4 @ @ - 124;
- 124; @ @ CODE5 @ @ - 124;
- 124; @ @ CODE6 @ @ - 124;
- 124; @ @ CODE7 @ @ - 124;
- 124; @ @ CODE8 @ @ - 124;
- 124; @ @ CODE9 @ @ - 124;
- 124; @ @ CODE10 @ @ - 124;

Structure du conseil

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

Paramètres d'exportation

Configuration KiCad

Pour générer les fichiers Gerber de KiCad :

1. Ouvrir l'éditeur de PCB
2. ♪ Fichier > Emplacement... ♪
3. Configuration des options & #160;:

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

4. Cliquez sur * * Emplacement * *
5. Cliquez sur * * Générer des fichiers de forage... * *

Configuration de forage

```
Drill File Format: Excellon
☑ PTH and NPTH in single file
☑ Oval Holes Drill Mode
Map File Format: PostScript

Drill Units: Millimeters
Zeros Format: Decimal format
```

♪ # Vérification des fichiers

Visionneuse Gerber recommandée

* * * Gerbv * * (sans Linux)
- * * GerberViewer * * (en ligne)
- * * KiCad Gerber Viewer * * (inclus dans KiCad)
- * * Tracepace * * (en ligne)

Liste de contrôle

Avant d'envoyer à la fabrication, vérifiez :

- [] Toutes les couches présentes
- [] Profil correct de la plaque
- [] Forages correctement positionnés
- [] Sérigraphie lisible
- [] Aucun court-circuit visible
- [Pads correctement concentré]
- [] Voies visibles et correctes

# # Exemple de vérification visuelle

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

# # Fabricants recommandés

Pour le prototypage

124; fabricant 124; emplacement 124; heure 124; coût approximatif 124;
- 124; - 124; - 124; - 124; - 124; - 124;
124; JLCPP 124; Chine 124; 5-10 jours 124; 2-5 (5 pcs) 124;
124; PCBWay - 124; Chine - 124; 5-10 jours - 124; 5-10 (5 pcs) - 124;
124; SSH Park - 124; États-Unis - 124; 12 jours - 124; 5 $ / pouce carré - 124;
- 124; Aisler - 124; Europe - 124; 5-7 jours - 124; 8-15 - 124 €;

Pour la production

124; constructeur 124; emplacement 124; homologation 124;
- 124; - 124; - 124; - 124; - 124;
- 124; PCBWay - 124; Chine - 124; ISO 9001, UL - 124;
- 124; EuroCircuits - 124; Europe - 124; ISO 9001, IPC - 124;
124; circuits avancés 124; États-Unis 124; ISO 9001, ITAR 124;

# # Spécifications pour la commande

# # # Information requise

Lors de la commande des PCB, préciser:

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

Fichier ZIP pour la fabrication

Créer un fichier ZIP avec :

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

Contenu de README.txt: * *
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

Service d'assemblage (PCBA)

Si vous voulez une assemblée professionnelle :

# # Fichiers supplémentaires nécessaires

1. * * * BOM * *
- Format CSV ou Excel
- Inclure : Réf, Valeur, Empreinte, Fabricant, MPN

2. * * choix et lieu (CPL) * *
- Fichier de position des composants
- Format: Réf, X, Y, Rotation, Calque

3. * * Dessin (optionnel) * *
- Dessin de montage
- Notes spéciales

Exportation de KiCad

♪ BOM: ♪
```
File > Fabrication Outputs > BOM...
```

♪ Choisir et placer: ♪
```
File > Fabrication Outputs > Component Placement (.pos)...
```

Contrôle des versions

Maintenez les versions des fichiers Gerber :

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

Inclure le fichier de modification :

```markdown
# Changelog

## v1.1 (2026-02-01)
- Corregido footprint de U3
- Ampliado ancho de pistas de potencia

## v1.0 (2026-01-15)
- Versión inicial
```

Sections suivantes

- [diagrammes circulants] (@ @ URL0 @)
- [Plan du CCP] (@ @ URL1 @)
- [Assemblage de PCB] (@ @ URL2 @)