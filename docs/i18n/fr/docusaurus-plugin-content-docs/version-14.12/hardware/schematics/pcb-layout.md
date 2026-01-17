---
id: pcb-layout
title: PCB Mise en page
sidebar_label: Préparation des PCB
sidebar_position: 2
description: Informations sur la conception des PCB IncuNest
keywords: [PCB, layout, diseño, capas]
---

La disposition des PCB

# # Caractéristiques des PCB

Caractéristiques générales

124; Paramètre 124; Valeur 124;
- 124; - 124; - 124;
- 124; dimensions - 124; 100 mm x 80 mm - 124;
- 124; Caps - 124; 2 (haut et bas) - 124;
- 124; Épaisseur - 124; 1,6 mm - 124;
- 124; matériel - 124; FR-4 - 124;
124; épaisseur du cuivre 124; 1 oz (35 μm) 124;
- 124; Finition de surface - 124; HASL avec plomb ou sans plomb - 124;
124; masque de soudage 124; vert 124;
- 124; sérigraphie - 124; blanc - 124;

Règles de conception

- 124; Paramètre - 124; Valeur minimale - 124;
- 124; - 124;
- 124; largeur de la voie (signal)
- 124; largeur de la voie (puissance)
- 124; séparation pista-piste - 124; 0,2 mm (8000) - 124;
- 124; pista-pad-124; 0,2 mm (8000) - 124;
124; diamètre minimal par - - - - - -
- 124; forage minimum via-124; 0,3mm-124;
124; anneau minimum 124; 0,15 mm 124;

Répartition des composantes

Calque supérieur

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [POWER IN]     [REGULATORS]              [ESP32 MODULE]          │
│   ┌───────┐      ┌────┐ ┌────┐           ┌──────────────┐          │
│   │ 12V   │      │5V  │ │3.3V│           │              │          │
│   │ GND   │      │REG │ │REG │           │   ESP32      │          │
│   └───────┘      └────┘ └────┘           │   WROOM-32   │          │
│                                          │              │          │
│   [FUSE]    [TVS]                        │   [ANTENNA]  │          │
│   ┌───┐     ┌───┐                        └──────────────┘          │
│   │ F1│     │TVS│                                                   │
│   └───┘     └───┘                        [STATUS LED]              │
│                                          ┌───┐                      │
│                                          │LED│                      │
│   [SSR CONTROL]    [MOSFET CONTROL]      └───┘                      │
│   ┌──────────┐     ┌──────────────┐                                │
│   │ SSR      │     │   MOSFET     │      [BUZZER]                  │
│   │ Driver   │     │   Fan Driver │      ┌─────┐                   │
│   └──────────┘     └──────────────┘      │ BUZ │                   │
│                                          └─────┘                    │
│                                                                     │
│   [I2C CONNECTOR]  [ONEWIRE]      [ACTUATOR CONNECTORS]           │
│   ┌─────────┐      ┌─────────┐    ┌─────┐ ┌─────┐ ┌─────┐         │
│   │SDA SCL  │      │ DS18B20 │    │HEAT │ │ FAN │ │ HUM │         │
│   │VCC GND  │      │ CONN    │    │     │ │     │ │     │         │
│   └─────────┘      └─────────┘    └─────┘ └─────┘ └─────┘         │
│                                                                     │
│   [USB CONNECTOR]        [PROGRAMMING HEADER]                      │
│   ┌───────────┐          ┌────────────────┐                        │
│   │  MICRO B  │          │ TX RX EN BOOT  │                        │
│   └───────────┘          └────────────────┘                        │
│                                                                     │
│   ○ M1                                               M2 ○          │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
     ○ M3                                               M4 ○
```

Vue inférieure (Couche de bouton)

La couche inférieure contient principalement:
- Rez-de-chaussée (GND)
- Voies de retour des signaux
- Quelques pistes d'interconnexion

Zones PCB

Zone de puissance

```
┌─────────────────────────────────────┐
│  ZONA DE POTENCIA                   │
│  ┌─────────────────────────────────┐│
│  │ • Entrada 12V                   ││
│  │ • Reguladores                   ││
│  │ • Drivers de potencia (SSR, MOSFET) ││
│  │ • Capacitores de filtrado       ││
│  │                                 ││
│  │ Pistas: mínimo 1mm              ││
│  │ Separación: mayor a 0.5mm       ││
│  │ Via stitching para tierra       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

Zone numérique

```
┌─────────────────────────────────────┐
│  ZONA DIGITAL                       │
│  ┌─────────────────────────────────┐│
│  │ • ESP32 y componentes asociados ││
│  │ • Conectores de sensores        ││
│  │ • LED y buzzer                  ││
│  │                                 ││
│  │ Pistas: 0.25mm típico           ││
│  │ Impedancia controlada para USB  ││
│  │ Decoupling capacitors cercanos  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

Zone RF (WiFi)

```
┌─────────────────────────────────────┐
│  ZONA DE ANTENA                     │
│  ┌─────────────────────────────────┐│
│  │ • Keepout bajo antena ESP32     ││
│  │ • Sin cobre en ambas capas      ││
│  │ • Sin componentes cercanos      ││
│  │ • Distancia mínima: 15mm        ││
│  │                                 ││
│  │ ┌───────────────┐               ││
│  │ │   KEEPOUT     │               ││
│  │ │   ZONE        │               ││
│  │ │ (No copper)   │               ││
│  │ └───────────────┘               ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

# # Considérations de conception

Planète terrestre

- Rez-de-chaussée en couche inférieure
- Par couture autour de la plaque (tous les 5 mm)
- Analogue / séparation numérique des terres avec une connexion à un seul point

```
        Digital GND          Analog GND
            │                    │
            │                    │
    ┌───────┴────────────────────┴───────┐
    │                ★                   │  ← Punto de unión
    │         GROUND PLANE               │
    └────────────────────────────────────┘
```

Capacités de désengagement

Emplacement des condensateurs de contournement:

```
    ESP32
    ┌─────────────────┐
    │                 │
    │   ┌───┐   ┌───┐ │
    │   │C1 │   │C2 │ │
    │   │100│   │10n│ │
    │   │nF │   │F  │ │
    │   └─┬─┘   └─┬─┘ │
    │     │       │   │
    │   VCC     VCC   │
    └─────────────────┘
    
    Distancia máxima a pin: 3mm
```

Routage USB

- D + et D - voies différentielles
- Impédance : différence 90.
- Longueur équivalente (± 0,5 mm)
- Oui. Pas de trajectoires dans le couple différentiel

```
    USB CONN           ESP32
    ┌────┐            ┌─────┐
    │D+  ├────────────┤D+   │
    │    │ ═══════════│     │
    │D-  ├────────────┤D-   │
    └────┘            └─────┘
    
    Ancho de pista: 0.4mm
    Separación: 0.15mm
    Plano de tierra debajo
```

# # Liste des composants par zone

Zone de puissance

- 124; Ref - 124; Valeur - 124; Empreinte - 124;
- 124; - 124; - 124; - 124; - 124;
- 124; J1 - 124; Terminal 2 broches - 124; Terminal _ 5.08mm - 124;
- 124; F1 - 124; Fuse 10A - 124; Fuse _ 5x20mm - 124;
- 124; D1 - 124; TVS P6KE15 - 124; DO-201 - 124;
- 124; D2 - 124; SS34 - 124; SMA - 124;
- 124; U1 - 124; AMS1117-5.0 - 124; SOT-223 - 124;
- 124; U2 - 124; AMS1117-3.3 - 124; SOT-223 - 124;
- 124; C1-C4 - 124; 100μF / 25V - 124; chapeau _ 8x10mm - 124;
- 124; C5-C8 - 124; 10μF / 16V - 124; 0805 - 124;

Zone SP32

- 124; Ref - 124; Valeur - 124; Empreinte - 124;
- 124; - 124; - 124; - 124; - 124;
- 124; U3 - 124; ESP32-WROOM-32 - 124; ESP32-WROOM-124;
- 124; C9-C12 - 124; 100nF - 124; 0402 - 124;
- 124; R1-R2 - 124; 10k. - 124; 0402 - 124;
- 124; R3 - 124; 1kю (LED) - 124; 0402 - 124;
- 124; LED1-124; LED-124 verte; 0603-124;

Connecteurs

- 124; Ref - 124; Description - 124; Empreinte - 124;
- 124;
- 124; J2 - 124; Micro USB - 124; USB _ Micro _ B - 124;
- 124; J3 - 124; I2C Leader - 124; Pin _ Leader _ 1x4 - 124;
- 124; J4 - 124; OneWire - 124; Pin _ Leader _ 1x3 - 124;
- 124; J5-J7 - 124; actuateurs - 124; terminal _ 3,5 mm - 124;

# # Les fichiers de conception

Les fichiers de conception sont disponibles au format KiCad:

```
hardware/kicad/
├── IncuNest.kicad_pro
├── IncuNest.kicad_sch
├── IncuNest.kicad_pcb
├── fp-lib-table
├── sym-lib-table
└── gerber/
    └── (archivos de fabricación)
```

Sections suivantes

- [diagrammes circulants] (@ @ URL0 @)
- [Fichier Gerber] (@ @ URL1 @)