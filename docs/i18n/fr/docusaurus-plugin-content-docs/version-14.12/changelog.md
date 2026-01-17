---
id: changelog
title: Modifier le registre
sidebar_label: Changer de journal
sidebar_position: 12
description: Historique des versions IncuNest
keywords: [changelog, versiones, historial, actualizaciones]
---

♪ Changement d'enregistrement (changement de journal)

Tous les changements notables apportés à ce projet seront documentés dans ce dossier.

Le format est basé sur [Keep a Changelog] (@ @ URL0 @ @),
et ce projet adhère à [Semantic Versioning] (@ @ URL1 @ @).

♪ ♪ [Non publié]

Prévu
- Support du capteur de poids
Mode de transport
- Entreprise d'application mobile
- Intégration avec les systèmes hospitaliers (HL7 / FHIR)

---

# # [10.0] - 2026-01-15

♪ ♪ ♪ ♪ Ajouté ♪
- Contrôle de température PID avec retour
- Surveillance de l'humidité relative
- Interface web réactive pour la surveillance à distance
- Système d'alarme Mulchivel
- Enregistrement des données dans SPIFFS
- Support écran LCD 20x4
- Support de l ' écran TFT 3.5 "
- API REST pour l'intégration externe
- WebSocket pour les mises à jour en temps réel
- Documentation complète en anglais et espagnol
- Prise en charge de la mise à jour OTA

Matériel
- PCB principal v1.0
- Conception du boîtier d'impression 3D
- Intégration avec les capteurs DHT22 et SHT31
- Système de chauffage avec résistance en céramique
- Système d'humidification passive

Documentation
- Guide de démarrage rapide
- Manuel complet de montage
- Guide d'étalonnage
- Documentation API

---

# # [0,9.0-bêta] - 2025-11-01

♪ ♪ ♪ ♪ Ajouté ♪
- Première version fonctionnelle du contrôle de température
- Interface LCD de base
- Connexion WiFi de base

♪ ♪ ♪ ♪ ♪ ♪
- Stabilité de la commande PID
- Reconnaissance Wi-Fi automatique

♪ ♪ ♪ ♪ ♪ ♪
- Interface web incomplète
- Documents en attente

---

# # [0,5.0-alpha] - 2025-08-15

♪ ♪ ♪ ♪ Ajouté ♪
- prototype matériel initial
- Lecture de base du capteur
- Cadre firmware

Limitations
- Développement uniquement
- Oui. Ne pas utiliser dans des environnements réels

---

Guide de mise à jour

De 0.9.x à 1.0.0

1. * * Soutenez votre configuration * * avant la mise à jour
2. * * Mise à jour du firmware * * via OTA ou USB
3. * * Examiner les nouveaux paramètres * * à @ CODE0 @
4. * * Réchauffer les capteurs * * après mise à jour

```bash
# Actualizar firmware
cd firmware
git pull origin main
pio run --target upload
```

# # Notes de compatibilité

- 124; Version précédente - 124; Compatible avec 1.0.0 - 124; Notes - 124;
- 124; - 124; - 124;
- 124; 0,9.x - 124;
- 124; 0,5.x - 124;
- 124; < 0,5) 124;

---

Les conventions des versions

* * * MAJOR.MINOR.PATCH * * (ej: 1.2.3)
- * * * MAJOR * *: Modifications incompatibles avec les versions précédentes
- * * * MINOR * *: Nouvelles fonctionnalités compatibles
* * * PATCH * *: corrections de bug compatibles

♪ # Mots clés Pré-édition

* * * alpha * * : Développement précoce et instable
- * * * bêta *: Fonction complète, dans les essais
- * * rc * *: Candidat à la libération, prêt à la production

---

Liens

- [GitHub publie] (@ @ URL0 @)
- [Versions de comparaison] (@ @ URL1 @)
- [Rapporter les problèmes] (@ @ URL2 @)