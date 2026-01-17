---
id: troubleshooting
title: Résolution des problèmes
sidebar_label: Résolution des problèmes
sidebar_position: 5
description: Guide de diagnostic et de résolution de problèmes IncuNest
keywords: [problemas, errores, diagnóstico, solución]
---

Résolution de problèmes

Le diagnostic rapide

Indicateurs LED

124; état DEL 124; sens 124; action 124;
- 124; - 124; - 124; - 124; - 124;
124; Clignements bleus 124; Ouverture 124; Attendre 124;
- 124; jaune fixe - 124; Connexion WiFi - 124; Vérification réseau - 124;
- 124; vert fixe - 124; veille - 124; normale - 124;
- 124; clignotants verts - 124; Fonctionnement - 124; Normal - 124;
124; rouge fixe - 124; erreur critique - 124; Voir code d'erreur 124;
- 124; clignotants rouges - 124; alarme active - 124; alarme avertisseur - 124;
124; pas de LED - 124; pas d'énergie - 124; vérifier la puissance - 124;

Codes d'erreur

124; Code 124; Description 124; Solution 124;
- 124; - 124; - 124; - 124; - 124;
124; E01 - 124;
- 124; E02 - 124; Capteur de température de la peau - 124; Vérification DS18B20 - 124;
- 124; E03 - 124; Erreur de capteur - 124; Contrôle SHT31 - 124;
- 124; E04 - 124;
- 124; E05 - 124; Défaillance du ventilateur - 124; Vérifier la connexion et le moteur - 124;
- 124; E06 - 124; Erreur de communication WiFi - 124; Vérifier les lettres de créances - 124;
124; E07 - 124; erreur de mémoire - 124; dispositif de redémarrage - 124;
- 124; E08 - 124; erreur de configuration - 124; configuration de remise - 124;

Problèmes de feu

♪ ♪ L'équipe ne s'allume pas.

* * Symptômes: * * Pas de LED, pas de réponse

* * Causes possibles et solutions : * *

1. * * Pas d ' alimentation * *
- Vérifiez que le câble est connecté
- Vérifier avec un autre appareil
- Vérifier la position de l'interrupteur

2. * * Fuse moulée * *
- Localiser le fusible porta
- Vérifier la continuité du fusible
- Remplacer par un fusible de spécification égale

3. * * alimentation électrique endommagée * *
- Vérifier la tension de sortie (doit être 12V DC)
- Remplacer la source si nécessaire

♪ ♪ L'équipement est constamment redémarré

* * Symptômes: * * LED clignotant, redémarrage continu

* * Causes possibles et solutions : * *

1. * * Alimentation électrique insuffisante * *
- Vérifier l'ampérage de la source (minimum 10A)
- Vérifier la chute de tension à basse charge

2. * * Fret court * *
- Débranchez les actionneurs un par un
- Identifier la composante court-circuit

3. * * Erreur de firmware * *
- Essayez le mode récupération
- firmware de rechange

Problèmes de température

♪ ♪ Il n'atteint pas la température cible

* * Temps prévu: * * 15-20 minutes pour atteindre 36 ° C

* * Causes possibles et solutions : * *

1. * * Perte de chaleur excessive * *
- Vérifier la fermeture complète de la caméra
- Vérifier les timbres et les joints
- Réduire les débits d'air ambiant

2. * * Chaleur insuffisante * *
- Vérifier la puissance du chauffage (doit être 100W)
- Vérifier les connexions électriques
- Mesure de la résistance des éléments PTC

3. ♪ Le ventilateur ne marche pas ♪
- Oui. La chaleur n'est pas distribuée
- Vérifier le fonctionnement du ventilateur

4. * * Mauvaise configuration * *
- Vérifier la configuration
- Contrôle du mode de contrôle (voiture vs manuel)

Surchauffe (très haute température)

* * Symptômes: * * Alarme à haute température, température > 38 ° C

* * ACTION PRIMAIRE : * * Ouvrir la caméra, retirer le patient si nécessaire

* * Causes possibles et solutions : * *

1. * * Réglez la commande PID * *
- Examiner les paramètres PID
- Réduire Kp s'il y a dépassement

2. * * capteur mal étalonné * *
- Vérifier l'étalonnage avec le thermomètre de référence
- Appliquer la correction offset

3. * * capteur endommagé * *
- Oui. Si vous lisez des valeurs erronées régulièrement
- Remplacer le capteur

4. * * Relais de chauffage paralysant * *
- Vérifiez que le chauffage est éteint.
- Remplacer relais / SSR si endommagé

La température oscille

* * Symptômes: * * La température monte et descend continuellement

* * Causes possibles et solutions : * *

1. * * Paramètres PID incorrects * *
C'est la première fois qu'il s'agit d'un problème.

2. * * Vous êtes très faible * *
- Augmenter la valeur de l'historésis

3. * * Bruit du capteur * *
- Vérifier les connexions
- Mettre en œuvre un filtrage logiciel supplémentaire

♪ ♪ Problèmes des zones humides ♪

♪ Très faible fumée

* * Causes possibles et solutions : * *

1. * * Réserve vide * *
- Remplir d'eau distillée

2. L'humidificateur ne marche pas
- Vérifier la connexion électrique
- Vérifier la membrane ultrasonore
- Dépôts minéraux propres

3. * * puces d'air * *
- Vérifiez les timbres de la caméra

♪ Très forte humidité (condensation)

* * Causes possibles et solutions : * *

1. ♪ Position trop haut ♪
- Réduire le seuil d'humidité

2. L'humidificateur n'est pas éteint
- Vérifier le contrôle / relais de l'humidificateur
- Vérifier le capteur d'humidité

3. * * Insuffisance de ventilation * *
- Vérifier le fonctionnement du ventilateur

Problèmes de connectivité

♪ ♪ Ne pas se connecter au WiFi

* * Symptômes: * * LED jaune permanent, mode AP actif

* * Causes possibles et solutions : * *

1. * * Créances incorrectes * *
- Vérifier le SSID (sensible au capital)
- Vérifiez le mot de passe

2. * * Réseau non compatible * *
- ESP32 seulement supports 2,4GHz
- Vérifiez que le réseau est 2.4GHz

3. Un signe faible
- Dispositif d'approche du routeur
- Vérifier l'ICRS dans le diagnostic (-70 dBm ou mieux)

4.
- Vérifier le filtre MAC
- Vérifier la limite de l'appareil

♪ ♪ Perdre la connexion WiFi fréquemment

* * Causes possibles et solutions : * *

1. * * Interférence * *
- Changer le canal du routeur
- Retirer des autres dispositifs 2.4GHz

2. * * Rapport insuffisant * *
- Réinitialisation du périphérique
- Vérifier le tas libre

3. * * Configuration d'économie d'énergie * *
- Désactiver l'alimentation WiFi dans le firmware

♪ ♪ Je ne peux pas accéder à l'interface web.

1. * * Vérifier la bonne adresse IP * *
- Utiliser un scanner réseau
- Essayez @ @ CODE0 @

2. * * Port bloqué * *
- Vérifiez le pare-feu
- Vérifiez que le port 80 est ouvert

3. * * Le serveur Web n'a pas démarré * *
- Réinitialisation du périphérique
- Vérifier le journal de démarrage

Problèmes de capteurs

Le capteur montre "Error" ou "NaN"

* * Causes possibles et solutions : * *

1. * * Connexion gratuite * *
- Vérifier le câblage
- Vérifier les soudures

2. * * capteur endommagé * *
- Essai avec capteur de remplacement
- Mesure de la continuité

3. * * Adresse I2C incorrecte * *
- Lancer le scanner I2C
- Vérifier l'adresse configurée

♪ ♪ Lectures incorrectes mais stables

1. ♪ Tu as besoin de calibrage
- Voir [Guide de calibration] (@ @ URL0 @)

2. * * Mauvaise compensation * *
- Vérifier l'offset
- Réinitialiser aux valeurs par défaut

♪ ♪ Lectures erratiques

1. * * Bruit électrique * *
- Vérifier la connexion au sol
- Enlever les câbles des capteurs de sources sonores
- Ajouter un condensateur déconnecté

2. * * Câbles très longs * *
- Utiliser des câbles empilés
- Réduire la longueur si possible

Problèmes d'alarme

♪ ♪ L'alarme sonne sans cause apparente

1. * * Seuil très serré * *
- Augmentation de la marge des seuils
- Vérifier l'alerte historique

2. ♪ Capteur avec bruit ♪
- Voir la section de lecture erratique

3. * * Mauvais étalonnage * *
- Vérifier l'étalonnage du capteur

♪ ♪ L'alarme ne sonne pas quand je devrais

1. * * Buzzer désactivé * *
- Vérifier les paramètres du Buzzer

2. ♪ Buzzer endommagé ♪
- Essayez directement.
- Vérifier la connexion

3. * * Des seuils très larges * *
- Vérifier les paramètres de seuil

Mode de récupération

Si le dispositif ne répond normalement pas:

1. * * Débranchez la puissance * *
2. * * Maintenez le bouton BOOT / FLASH enfoncé * *
3. * * Branchez la puissance * *
4. * * Laisser tomber le bouton après 5 secondes * *
5. * * L'appareil entrera en mode récupération * *

De cette façon, vous pouvez:
- firmware réfléchissant
- Réinitialiser la configuration
- Diagnostic d'accès

♪ # Diagnostic avancé

Accès en série

Pour un diagnostic détaillé, connectez-vous par USB et ouvrez un moniteur série à 115200 baud.

```bash
# Linux/Mac
screen /dev/ttyUSB0 115200

# O con PlatformIO
pio device monitor
```

Commandes de diagnostic

Sur l'écran série, écrivez :

- 124; commandement - 124; description - 124;
- 124;
- 124; @ @ CODE0 @ @ - 124;
- 124; @ @ CODE1 @ @ - 124; Lecteurs de capteurs - 124;
- 124; @ @ CODE2 @ @ - 124; Configuration actuelle - 124;
- 124; @ @ CODE3 @ @ - 124; WiFi State - 124;
- 124; @ @ CODE4 @ @ - 124;
- 124; @ @ CODE5 @ @ - 124; Reboot - 124;
- 124; @ @ CODE6 @ @ - 124;

Registres système

Les journaux peuvent être vus dans:
- Moniteur série
- Interface Web : @ @ CODE0 @ @
- API: @ @ CODE1 @

Quand contacter le support

Contacter le support technique si:

- Oui. Le problème persiste après avoir essayé des solutions
- Oui. Il y a des dommages physiques visibles
- Remplacement des principaux éléments requis
- Réétalonnage certifié requis
- Oui. Il y a un comportement de sécurité anormale.

* * Informations à fournir : * *

- Numéro de série du périphérique
- Version Firmware
- Description détaillée du problème
- Codes d'erreur affichés
- Actions déjà essayées
- Photos / vidéos le cas échéant

Sections suivantes

- [Entretien] (@ @ URL0 @)
- [FAQ] (@ @ URL1 @)