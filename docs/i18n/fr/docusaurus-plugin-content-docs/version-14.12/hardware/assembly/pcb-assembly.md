---
id: pcb-assembly
title: Assemblage des PCB
sidebar_label: Assemblage des PCB
sidebar_position: 2
description: Guide de montage des PCB IncuNest
keywords: [PCB, soldadura, ensamblaje, electrónica]
---

# Ensemble de PCB

♪ ♪ Avant de commencer

Outils nécessaires

- Soudeur à température contrôlée (320-380 ° C)
- Flux d'étain (0,8 mm recommandé)
- Flux supplémentaire (facultatif mais recommandé)
- Dessoudeur ou maille déserte
- Pinces pointues
- Lupa ou microscope (recommandé)
- Multimètre
- Support de troisième main ou PCB

Inspection précédente

Avant de commencer, vérifiez :

- [] PCB sans défauts visibles
- [] Tous les composants présents
- [] composants corrects selon BOM
- [] Zone de travail propre et bien éclairée

Ordre de montage

:: Conseil Règle générale
Vendu d'abord le plus bas, puis les composants plus élevés.
:: Le cas échéant;

♪ # # Niveau 1 : Composants SMD (le cas échéant)

1. Résistances SMD
2. Condensateurs SMD
3. Diodes SMD

♪ Niveau 2: Résistance au THT et diodes

```
Componente      Valor       Ubicación
─────────────────────────────────────
R1, R2, R3      10KΩ        Pull-ups
R4, R5          4.7KΩ       I2C
R6, R7, R8      330Ω        LEDs
R9, R10         1KΩ         Base transistores
D1              SS34        Protección
```

* * Technique de soudage : * *

1. Pliez les jambes à 90 °
2. Insérer dans les trous
3. S'assurer que le composant est plat
4. Vendu une épingle
5. Vérifier la position
6. Vendu la deuxième épingle
7. Couper l'excès de jambes

♪ Niveau 3: Condensateurs

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

♪ Niveau 4: semi-conducteurs

Régulateurs de tension

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

♪ ♪ Les MOSFET

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

Transistors

```
2N2222A (TO-92)
          ╭───╮
          │   │
          └┬┬┬┘
           │││
           EBC (Emisor-Base-Colector)
           
⚠️ Verificar pinout según fabricante
```

♪ Niveau 5: Connecteurs

1. * * Terminaux électriques * * - Soldat en premier
2. * * En-têtes pour ESP32 * * - Utilisez le module comme guide
3. * * Connecteurs JST * * - Pour capteurs et périphériques
4. * * Blocs terminaux * * - Pour actionneurs de puissance

```
Técnica para headers rectos:
1. Insertar header en PCB
2. Colocar ESP32/módulo sobre los pines
3. Soldar UN pin de cada extremo
4. Verificar alineación
5. Soldar resto de pines
6. Retirar módulo
```

♪ Niveau 6: composants élevés

1. Fusée et fusible
2. Modules (SP32, RTC, etc.)
3. dissipateurs de chaleur

# # Après vérification - Assemblage

Contrôle visuel

- [Toutes les soudures brillantes et coniques
- [] Pas de ponts de soudage
- [] Pas de composants tordus
- [] polarités correctes (condensateurs, diodes)
- [] Aucun résidu de flux excessif

Essais électriques

1. Continuité (sans nourriture)

```
Prueba              Resultado Esperado
────────────────────────────────────────
VCC - GND           NO continuidad (>1MΩ)
Entre pistas        NO continuidad
Conexiones          Continuidad (<1Ω)
```

♪ 2. Première nourriture

:: Mise en garde contre la sécurité
Utiliser une alimentation avec limite de courant (100mA initiale).
:: Le cas échéant;

1. Connexion multimètre en mode ampérimètre série
2. Appliquer 12V lentement
3. Vérifier la consommation < 50mA sans modules
4. Mesure des tensions de sortie:
- rail 5V: 4.9V - 5.1V
- rail 3.3V: 3.2V - 3.4V

# # 3. Essai avec ESP32

1. Insérer ESP32 dans les en-têtes
2. Alimentation du système
3. Vérifier la puissance de la LED ESP32
4. Connectez-vous par USB et vérifiez la communication série

Résolution de problèmes

Court-circuit dans les aliments

1. * * Déconnecter immédiatement * *
2. Inspection visuelle des ponts
3. Vérifier la polarité des condensateurs
4. Utilisez multimètre pour localiser le court
5. Résoudre les composants suspects un par un

Le régulateur est trop chauffé

* * Causes possibles : * *
- Court circuit à la sortie
- Charge excessive
- Condensateur d'entrée/sortie manquant

* * Solution : * *
- Vérifier le courant de charge
- Ajouter un dissipateur de chaleur
- Considérer le régulateur de commutation

* * * * SP32 Pas de réponse

1. Vérifier 3.3V tension dans les pins d'alimentation
2. Vérifier les connexions EN et IO0
3. Essayez le booty avec le bouton BOOT appuyé
4. Vérifier l'installation du pilote USB

♪ ♪ Conseils de soudure ♪

Température

124; composant 124; température 124;
- 124;
- 124; THT-124; 320-350 ° C-124;
- 124; petit SMD-124; 300-320 ° C-124;
124; gros connecteurs 124; 350-380 ° C 124;
124; pas de plomb 124; + 20-30 ° C 124;

Technique droite

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

♪ ♪ Séquence de soudage

1. Nettoyer la pointe du soudeur
2. Appliquer le soudeur sur le tampon Y (2s)
3. Appliquer l'étain au point de fixation
4. Supprimer l'étain
5. Supprimer le soudeur
6. Ne bougez pas avant d'être solidifié

Sections suivantes

- [Assemblée mécanique] (@ @ URL0 @)
- [Cablage] (@ @ URL1 @)
- [Évidence] (@ @ URL2 @)