---
id: getting-started
title: Guide de démarrage rapide
sidebar_label: Démarrage rapide
sidebar_position: 2
description: Guide complet pour débuter avec IncuNest
keywords: [démarrage, installation, configuration, ESP32]
---

# Guide de démarrage rapide

Ce guide vous guidera dans les étapes nécessaires pour configurer et mettre en service votre IncuNest.

<div style={{marginTop: '1rem'}}>
  <video
    controls
    preload="metadata"
    width="100%"
    src="/IncuNest-Docs/videos/fr/user-interface.mp4"
  >
    Votre navigateur ne prend pas en charge la balise vidéo.
  </video>
  <p>
    <a href="/IncuNest-Docs/videos/fr/user-interface.mp4" target="_blank" rel="noopener noreferrer">
      Regarder en plein écran
    </a>
  </p>
</div>

Exigences antérieures

Matériel nécessaire

* * * ESP32-WROOM-32 * * ou ESP32-WROVER
- Capteurs de température (DHT22 ou SHT31)
- Élément de hauteur (résistance céramique)
- Alimentation électrique 12V / 10A
- Affichage LCD 20x4 ou TFT 3.5 "
- IncuNest PCB principal (voir [Full BOM] (@ @ URL0 @ @))

Logiciels nécessaires

- [Code studio visuel] (@ @ URL0 @)
- [IDE PlatformIO] (@ @ URL1 @)
- [Git] (@ @ URL2 @)
- Navigateur Web moderne (Chrome, Firefox, Edge)

Étape 1: Cloner le dépôt

```bash
git clone https://github.com/medicalopenworld/IncuNest.git
cd IncuNest
```

Étape 2: Configurer l'environnement de développement

Installer les plateformes

1. Ouvrez le code Visual Studio
2. Aller aux extensions (Ctrl + Maj + X)
3. Trouver "PlatformIO IDE"
4. Installer l'extension

Ouvrir le projet

1. Dans le code VS, sélectionnez * * Fichier > Ouvrir le dossier * *
2. Naviguez dans le dossier @ @ CODE0 @ @
3. Plateforme IO détecte automatiquement le projet

Étape 3: Paramètres du micrologiciel

Fichier de configuration

Copier le fichier de configuration d'exemple :

```bash
cd firmware
cp include/config_example.h include/config.h
```

# # Modifier les paramètres

Ouvrez @ @ CODE0 @ et ajustez les paramètres:

```cpp
// Configuración WiFi
#define WIFI_SSID "TuRedWiFi"
#define WIFI_PASSWORD "TuContraseña"

// Configuración de Sensores
#define TEMP_SENSOR_PIN 4
#define HUMIDITY_SENSOR_PIN 5

// Parámetros de Control
#define DEFAULT_TARGET_TEMP 36.5
#define DEFAULT_TARGET_HUMIDITY 60.0

// Parámetros PID
#define KP 2.0
#define KI 0.5
#define KD 1.0
```

Étape 4: Compiler et charger

Compilez le micrologiciel

```bash
# Usando PlatformIO CLI
pio run

# O usando el botón de Build en VS Code (✓)
```

Chargez ESP32

1. Connectez ESP32 via USB
2. Exécuter :

```bash
pio run --target upload
```

Ou utilisez le bouton Télécharger (→) dans le code VS.

Étape 5: Vérifier l'opération

Moniteur série

Ouvrez le moniteur série pour vérifier le démarrage :

```bash
pio device monitor --baud 115200
```

Vous devriez voir:

```
[INFO] IncuNest v1.0.0 Starting...
[INFO] Initializing sensors...
[OK] Temperature sensor initialized
[OK] Humidity sensor initialized
[INFO] Connecting to WiFi...
[OK] Connected! IP: 192.168.1.100
[INFO] Starting control loop...
[OK] System ready!
```

♪ ♪ Accédez à l'interface Web

1. Ouvrir un navigateur
2. Naviguez vers @ @ CODE0 @ @
3. Vous devriez voir le tableau de bord d'IncuNest.

Étape 6: Étalonnage initial

:: Avertissement important
L'étalonnage est essentiel pour assurer des mesures précises et sûres.
:: Le cas échéant;

Capteurs de température d'étalonnage

1. Accès * * Paramètres > Étalonnage * *
2. Placer un thermomètre de référence certifié dans la caméra
3. Régler le décalage jusqu'à ce que les lectures correspondent
4. Enregistrer la configuration

Capteur de calibre de Hummedad

1. Utiliser une solution salée saturée comme référence
2. Placer la solution à l'intérieur de la caméra scellée
3. Attendre 24 heures pour la stabilisation
4. Régler le décalage dans la configuration

Vérification finale

Remplissez la liste de contrôle suivante avant d'utiliser IncuNest :

- [] Capteurs de température fonctionnant correctement
- [] Capteur d'humidité étalonné
- [] Système de chauffage répond au contrôle
- [] Alerte de sécurité active
- [] Interface Web accessible
- [] Enregistrement des données

Résolution de problèmes

♪ ♪ La SP32 ne démarre pas

1. Vérifier la connexion USB
2. Essayez un autre câble USB
3. Gardez BOOT enfoncé pendant que vous vous connectez

♪ ♪ Ne pas se connecter au WiFi

1. Vérifier les références à @ @ CODE0 @
2. Assurez-vous que le réseau est 2.4GHz
3. A propos de l'appareil au routeur

♪ ♪ Lectures incorrectes des capteurs

1. Vérifier les connexions des capteurs
2. Vérifiez que les broches sont correctement configurées
3. Répétez l'étalonnage

Prochaines étapes

- [Guide d'installation complet] (@ @ URL0 @)
- (@ @ URL1 @)
- (@ @ URL2 @)
(@ @ URL3 @)
