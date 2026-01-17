---
id: installation
title: Guide d'installation
sidebar_label: Installation
sidebar_position: 1
description: Installation complète IncuNest Guide
keywords: [instalación, configuración, setup]
---

# Guide d'installation

Exigences antérieures

Avant de commencer l'installation, assurez-vous d'avoir :

Matériel
- IncuNest entièrement assemblé et testé
- Alimentation électrique 12V / 10A
- Câble d'alimentation secteur
- Connexion WiFi disponible

Logiciel
- Firmware chargé dans le ESP32
- Navigateur Web moderne (Chrome, Firefox, Edge)

# # Processus d'installation

Étape 1 : Lieu

Sélectionnez un emplacement approprié pour l'incubateur:

* * Exigences: * *
- Surface plate et stable
- À distance des courants d'air
- À distance du soleil direct
- Accès à l'alimentation électrique
- Température ambiante 18-25 ° C

Évitez : * *
- Près des fenêtres ou des portes
- Matériel de production de chaleur à proximité
- Lieux avec vibrations
- Zones à humidité extrême

Étape 2: Connexion électrique

1. Vérifiez que l'interrupteur est en position * * OFF * *
2. Connectez le câble d'alimentation à l'incubateur
3. Connectez le câble à une prise d'alimentation au sol
4. Vérifiez que la prise a une protection (idéalement UPS)

:: Avertissement de sécurité électrique
- Toujours utiliser une prise au sol
- Oui. Ne pas utiliser d'adaptateurs ou d'extensions de faible qualité
- Envisager d'utiliser un régulateur de tension dans les zones à alimentation instable
:: Le cas échéant;

♪ ♪ Étape 3 : Premier encendé

1. Placer l'interrupteur en position * * ON * *
2. La LED bleue commencera à clignoter (initialisation)
3. Attendez que le système complète l'autodiagnostic (~ 30 secondes)
4. La LED verte indique le système prêt

Séquence des DEL attendues: * *
```
[Azul parpadeando] → Auto-diagnóstico
[Amarillo] → Conectando WiFi
[Verde parpadeando] → Standby (listo)
```

Étape 4: Configuration du WiFi

Si c'est la première fois ou si le WiFi n'est pas réglé :

1. Le dispositif doit créer un point d'accès:
- * * SSID: * @ @ CODE0 @
- * * Mot de passe: * * @ @ CODE1 @

2. Connectez votre appareil (téléphone / ordinateur portable) à ce réseau

3. Ouvrez un navigateur et allez à @ @ CODE0 @

4. Remplissez le formulaire de configuration:
C'est la première fois qu'il s'agit d'un problème.

5. Appuyez sur

6. L'appareil sera redémarré et connecté à votre réseau

Étape 5: Vérifier la connexion

1. L'appareil obtiendra une IP de votre réseau
2. Vous pouvez trouver l'IP dans:
- Votre routeur
- Scannage réseau (comme Fing)
- mDNS: @ @ CODE0 @ @

3. Ouvrir le navigateur et accéder à l'IP

4. Vous devriez voir le tableau de bord d'IncuNest.

Étape 6: Configuration initiale

Configurer les paramètres

1. Accès * * Paramètres > Contrôle * *
2. Configuration & #160;:
- * * Température cible : * * 36,5 ° C (typique)
- * * humidité cible: * * 60% (typique)
3. Enregistrer les modifications

Vérifier les capteurs

1. Aller à * * État > Capteurs * *
2. Vérifiez que tous les capteurs montrent des lectures valides
3. Si un capteur montre une erreur, vérifiez les connexions

Configuration des alarmes

1. Accès * * Paramètres > Alarmes * *
2. Revoir les seuils par défaut:
C'est la première fois qu'il s'agit d'un problème.
3. Ajustement en fonction des besoins cliniques

Étape 7 : Étalonnage

Avant la première utilisation clinique, effectuer l'étalonnage:

1. Aller à * * Paramètres > Étalonnage * *
2. Suivez les instructions à l'écran
3. Utiliser un thermomètre de référence certifié

Voir [Guide de calibration] (@ @ URL0 @ @) pour des instructions détaillées.

Étape 8 : Essai de fonctionnement

Essai de réchauffement

1. Appuyez sur * * Démarrer * * sur le tableau de bord
2. Le système va commencer à chauffer
3. Vérifier :
- [] Ventilateur
- [Température qui monte progressivement]
- [] Pas d'alarmes inattendues

4. Attendez que vous atteigniez le point de consigne (~ 15-20 minutes)

5. Vérifier la stabilité (± 0,5 °C pendant 10 minutes)

Essai d'alarme

1. Configurer un point de réglage bas temporaire (par exemple 35 °C)
2. Vérifiez que l'alarme "haute température" sonne
3. Restaurer le point de consigne normal
4. Vérifiez que l'alarme est silencieuse.

Après l'installation Liste de contrôle

- [] Appareil activé correctement
- [] Connexion WiFi
- [Tableau de bord accessible]
- [Senseurs qui courent]
- [] Travail du catalyseur
- [] Ventilateur
- [] Fonctionnement de l'humidificateur (le cas échéant)
- [] Alarmes configurées
- [] Étalonnage terminé
- [] Essai de réchauffement réussi
- [] Essai d'alarme réussi

Résolution de problèmes

♪ ♪ Ça ne s'allume pas.

1. Vérifier la connexion électrique
2. Vérifier le fusible
3. Vérification de l'interrupteur

♪ ♪ Ne pas se connecter au WiFi

1. Vérifier les pouvoirs
2. Assurez-vous qu'il est 2.4GHz réseau
3. Près du routeur
4. Redémarrer le périphérique

Les capteurs montrent une erreur

1. Vérifier les connexions physiques
2. Dispositif de redémarrage
3. Vérifier le câblage en PCB

♪ ♪ Pas de température

1. Vérifier l'isolement de la caméra
2. Vérifier l'absence de fuite d'air
3. Vérifier le fonctionnement du chauffage

Prochaines étapes

- [Paramètres avancés] (@ @ URL0 @)
- [Calibration] (@ @ URL1 @)
- [Entretien] (@ @ URL2 @)