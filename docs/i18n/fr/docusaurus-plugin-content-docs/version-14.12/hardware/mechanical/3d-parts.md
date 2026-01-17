---
id: 3d-parts
title: Pièces imprimées 3D
sidebar_label: Pièces 3D
sidebar_position: 4
description: Composants imprimés 3D pour IncuNest
keywords: [impresión 3D, PLA, PETG, STL, piezas]
---

♪ Pièces imprimées 3D

Vision générale

Plusieurs pièces IncuNest sont conçues pour l'impression 3D, ce qui permet:

- * * Personnalisation * * selon les besoins locaux
- * * Remplacement rapide * * de pièces
* * * Faible coût * * de production
- * * Conception facile * *

Liste des parties

- 124; Partie - 124; Matériel - 124; Heure Est. - 124; Filament - 124;
- 124;
124; support du capteur 124; PETG 124; 2h 124; 15g 124;
- 124; diffuseur d ' air - 124; PETG - 124; 4h - 124; 45g - 124;
124; affichage du boîtier 124; PLA 124; 3h 124; 30g 124;
- 124; support PCB - 124; PLA - 124; 1,5h - 124; 20g - 124;
- 124; Boutons - 124; PLA - 124; 0,5h - 124; 5g - 124;
- 124; guide de câbles - 124; PLA - 124; 1h - 124; 10g - 124;
- 124; Tapa reservorio-124; PETG-124; 1h-124; 12g-124;
Ça va ?

Paramètres d'impression

Paramètres généraux

124; Paramètre 124; PLA 124; PETG 124;
124; - 124; - 124; - 124;
- 124; température de la buse - 124; 200-210 ° C - 124; 230-250 ° C - 124;
- 124; lit de température - 124; 60 °C - 124; 70-80 °C - 124;
124; vitesse 124; 50 mm/s 124; 40 mm/s 124;
124; hauteur de la couche 124; 0,2 mm 124; 0,2 mm 124;
- 124; remplir - 124; 20 % - 124; 25 % - 124;
124; Paredes 124; 3 - 124; 3 - 124;
- 124; Caps sup / inf-124; 4-124; 4-124;

# # Considérations sur le matériel

* * PLA (acide polylactique) * *
- Facile à imprimer
- ♪ Sous la guerre ♪
- Sensible à la chaleur (> 50 °C)
- Utilisation: Pièces structurales loin de la chaleur

* * PETG (polyéthylène téréphtalate de glycol) * *
- résistant à la chaleur (jusqu'à 80 °C)
- - Flexible et durable
- Oui. Il faut davantage d'ajustements
- Utilisation: Pièces près du système de chauffage

Conceptions de pièces

♪ 1. Support du capteur

Il permet de monter le capteur SHT31 / DHT22 sur la caméra.

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

* * Fichiers * *: @ @ CODE0 @, @ @ CODE1 @ @

♪ 2. Distributeur d ' air

Distribuez l'air chaud uniformément dans la caméra.

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

* * Matériel recommandé * *: PETG (résistance thermique)

* * Fichiers * *: @ @ CODE0 @, @ @ CODE1 @ @

♪ 3. Boîtier d ' affichage

Chargez l'écran LCD 20x4 ou TFT 3.5. "

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

* * Fichiers * *: @ @ CODE0 @, @ @ CODE1 @ @

4. Soutien aux PCB

Roulez et protégez la plaque principale.

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

* * Fichiers * *: @ @ CODE0 @ @

5. Boutons

Tapas pour pousseurs tactiles.

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

* * Fichiers * *: @ @ CODE0 @ @, @ @ CODE1 @ @, @ @ CODE2 @ @, @ @ CODE3 @ @

Après le traitement

Finition de surface

1. * * Vendu * *: Vendu 200 → 400 → 800
2. * * Impression * *: Vaporiser d'abord pour les plastiques
3. * * Peinture * * (facultatif): Aérosol pour plastiques
4. * * Scellement * * (parties d ' eau): Époxie ou laque

Traitement thermique (PETG)

Pour améliorer la résistance thermique:

1. Préchauffer le four à 80 °C
2. Placer la pièce 30 minutes
3. Éteignez le four et laissez refroidir lentement
4. Ne pas ouvrir à la température ambiante

# # Fichiers disponibles

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

♪ ♪ Conseils pour imprimer

Pour les pièces fonctionnelles

- * * Orientation * *: Imprimer avec le visage du contact vers le haut
- * * Soutien * *: Utiliser uniquement lorsque nécessaire
* * * Brim * *: Ajouter pour les grandes pièces
- * * froid * *: 100% pour PLA, 50% pour PETG

# # Vérification de la qualité

Avant d'utiliser, vérifiez :

- [] Pas de distorsion à la base
- [] Nettoyer les trous de vis
- [] Pas de chaînes / chaînes entre les parties
- [] Dimensions correctes (± 0,3 mm)
- [] Pas de couches retirées

Personnalisation

Les fichiers STEP peuvent être modifiés pour :

- S'adapter à différents affichages
- Régler les tolérances de l'imprimante
- Ajoutez des logos ou du texte personnalisé
- Modifier les points de montage

* * Logiciel recommandé * *: Fusion 360, FreeCAD, TinkerCAD

Sections suivantes

- [Liste des matériaux (BOM)] (@ @ URL0 @)
- [Guide de l'assemblée du CCP] (@ @ URL1 @)