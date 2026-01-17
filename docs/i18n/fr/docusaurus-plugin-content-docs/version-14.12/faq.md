---
id: faq
title: Questions communes
sidebar_label: FAQ
sidebar_position: 11
description: Foire aux questions sur Incunest
keywords: [FAQ, preguntas, ayuda, soporte]
---

Questions courantes (FAQ)

Généralités

Qu'est-ce qu'IncuNest?

IncuNest est un incubateur néonatal ouvert conçu pour fournir des soins thermiques aux nouveau-nés dans des environnements à ressources limitées. Le projet comprend à la fois du matériel et des logiciels, permettant aux collectivités et aux organisations de construire et de maintenir leurs propres incubateurs.

IncuNest est-il un appareil médical certifié ?

* * N° * * IncuNest est un projet éducatif et de recherche. Pour une utilisation clinique, vous devez obtenir les certificats médicaux appropriés de votre juridiction (EC, FDA, etc.). Voir [Avis de sécurité] (@ @ URL0 @ @) pour plus d'informations.

♪ ♪ Combien coûte la construction d'un Incunest ?

Le coût approximatif des composantes varie selon les régions:

- 124;
- 124;
- 124; électronique - 124; 50 - 80 - 124;
- 124; capteurs - 124; 20 - 40 - 124;
- 124; structure - 124; 100 - 200 - 124;
- 124; chauffage - 124; 30 - 50 - 124;
C'est pas vrai.

♪ ♪ De quelles compétences ai-je besoin pour construire IncuNest?

- * * Base * *: Soudure des composants dans tout le trou
- * * Intermédiaire * *: Programmation de base, utilisation des outils
- * * Advanced * *: Conception PCB, C + programmation

Matériel

♪ ♪ Quel microcontrôleur IncuNest utilise-t-il?

IncuNest utilise le * * ESP32-WROOM-32 * * pour ses capacités :
- WiFi intégré
- Assez de GPIES
- Faible coût
- Bonne documentation
- Communauté active

Je peux utiliser un autre microcontrôleur ?

Oui, mais cela nécessitera des adaptations importantes. Le code est optimisé pour ESP32. Solutions possibles:
- ESP32-S3 (recommandé)
- STM32 (port requis)
- Arduino Mega (limité)

♪ ♪ Quels capteurs de température sont compatibles ?

124; Capteur 124; Précision 124; Coût 124; Recommandation 124;
- 124; - 124; - 124; - 124; - 124; - 124; - 124;
- 124; DHT22 - 124; ± 0,5 °C - 124;
- 124; SHT31 - 124; ± 0,3 ° C - 124; moyen - 124; * * Recommandé * * - 124;
124; DS18B20 - 124; ± 0,5 ° C - 124; Faible - 124; Alternative - 124;
- 124; MAX31865 (PT100) - 124; ± 0,1 ° C - 124;

♪ ♪ Où puis-je obtenir les composants?

Fournisseurs recommandés:
- * * Global * *: DigiKey, Mouser, LCSC
* * * Amérique latine * *: Libre-échange, magasins d'électronique locaux
- * * Asie * *: AliExpress, Banggood (temps d'expédition plus long)

Je peux utiliser une autre alimentation ?

Oui, tant qu'il le fait :
- * * tension * *: 12V DC (11-13V acceptable)
* * * Actuellement * *: minimum 10A
* * * Qualité * *: Préférez les sources certifiées

Logiciels

♪ ♪ Comment mettre à jour le firmware ?

* * USB: * *
```bash
cd firmware
pio run --target upload
```

* * OTA (Overse-the-Air): * *
1. Accès à l'interface web
2. Allez dans Paramètres > Système
3. télécharger le fichier @ @ CODE0 @

Puis-je utiliser Arduino IDE au lieu de PlatformIO ?

Oui, mais ce n'est pas recommandé. Si vous préférez:
1. Installez manuellement les librairies requises
2. Copier le code de @ @ CODE0 @ vers un projet Arduino
3. Configurer correctement les options de compilation

♪ ♪ Comment modifier les paramètres PID ?

Dans le fichier @ @ CODE0 @:

```cpp
#define KP 2.0   // Ganancia proporcional
#define KI 0.5   // Ganancia integral
#define KD 1.0   // Ganancia derivativa
```

Ou via une interface web en temps réel (Paramètres > Contrôle).

Les données sont-elles stockées quelque part ?

Oui, IncuNest stocke les données à :
- * * * SPIFFS * *: Configuration et connexion locale
- * * Carte SD * * (facultatif): Historique
- * * Serveur externe * * (facultatif): MQTT

Utilisation et entretien

♪ ♪ Combien dois-je calibrer les capteurs ?

124; type d ' étalonnage 124; fréquence 124;
- 124; - 124; - 124;
124; vérification rapide 124; hebdomadaire 124;
- 124; étalonnage complet - 124; mensuel - 124;
124; étalonnage certifié 124; annuel 124;

♪ ♪ Comment nettoyer l'incubateur ?

1. * * Éteignez * * et débranchez l'équipement
2. * * Supprimer * * composants amovibles
3. * * Nettoyer * * avec une solution désinfectante approuvée
4. * * Sécher * * complètement avant utilisation
5. * * Vérifier * * opération avant utilisation clinique

♪ ♪ Que dois-je faire si une alarme sonne ?

1. * * Identifier * * le type d'alarme (voir écran)
2. * * Vérifier * * statut du patient
3. * * fixer * * l'état qui a causé l'alarme
4. * * Silence * * l'alarme une fois corrigée
5. * * Documentairement * * l'incident

Dépannage

La SP32 ne s'allume pas

1. Vérifiez l'alimentation électrique
2. Vérifiez le régulateur de tension
3. Vérifiez la puissance LED
4. Essayez une autre plaque ESP32

♪ ♪ Les valeurs de température sont incorrectes

1. Vérifier les connexions des capteurs
2. Exécuter l'étalonnage
3. Remplacer le capteur si endommagé
4. Examiner les interférences électromagnétiques

Je ne peux pas me connecter au WiFi.

1. Confirmer les identifiants corrects
2. Vérifier qu'il est 2.4GHz réseau
3. Approchez le dispositif du routeur
4. Réinitialiser ESP32
5. Vérifiez les erreurs du moniteur série

La température n'est pas stabilisée

1. Vérifier l'isolation thermique
2. Régler les paramètres PID
3. Vérifiez l'élément de chauffage
4. Vérifier l'absence de fuite d'air

Contribution

♪ ♪ Comment puis-je contribuer au projet?

Voir notre [Guide de contribution] (@ @ URL0 @ @) complet. Moyens de contribuer :
- Signaler les bogues
- Amélioration de la documentation
- Code de contribution
- Améliorations matérielles de conception
- Traduire dans d'autres langues

♪ ♪ Où puis-je poser des questions ?

- * * GitHub Discussions * *: Pour des questions générales
Questions concernant GitHub Pour les bogues et les suggestions
- * * Documentation * *: Rechercher ici d'abord

---

Vous n'avez pas trouvé votre question ? [Ouvrir un numéro] (@ @ URL0 @ @) à GitHub.