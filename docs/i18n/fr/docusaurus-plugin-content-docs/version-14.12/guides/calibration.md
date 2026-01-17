---
id: calibration
title: Guide d'étalonnage
sidebar_label: Étalonnage
sidebar_position: 3
description: Procédure d'étalonnage du capteur IncuNest
keywords: [calibración, sensores, temperatura, humedad]
---

♪ Guide d'étalonnage

Importance de l'étalonnage

Le calibrage précis est * * critique * * pour la sécurité du patient. Les capteurs peuvent avoir des déviations en usine ou développer une dérive au fil du temps.

:: Fréquence d ' étalonnage
- * * Vérification : * * Semaine
- * * Calibration complète : * * Mensuel
- * * Étalonnage certifié : * * Annuel ou selon la réglementation locale
:: Le cas échéant;

Matériel nécessaire

Pour l'étalonnage de température

124; équipements 124; spécifications 124; utilisation 124;
- 124;
- 124; thermomètre de référence - 124; certificat, ± 0,1 ° C - 124; modèle de comparaison - 124;
- 124; Bain thermique (facultatif)

Pour l'étalonnage humide

124; équipements 124; spécifications 124; utilisation 124;
- 124;
- 124; hygromètre de référence - 124; certificat, ± 2 % HR - 124; modèle de comparaison - 124;
- 124; sels saturés - 124; NaCl, MgCl - 124; points de référence fixes - 124;

# # Étalonnage de température

Méthode 1: Comparaison simple

Procédure:

1. * * Préparation
- Oui. Placer le thermomètre de référence au centre de la caméra
- Fermez complètement la caméra.
- Attendez 10 minutes pour la stabilisation.

2. * * Mesure * *
- Noter la référence : _ _ _ _ ° C
- Remarquez la lecture du capteur : _ _ _ _ ° C
- Calculer le décalage : Référence - Capteur = _ _ _ _ ° C

3. * * Appliquer la correction * *
- Aller à * * Paramètres > Étalonnage * *
- Entrez le décalage calculé
- Enregistrer la configuration

4. * * Vérification * *
- Attendez cinq minutes.
- Comparez encore les relevés
- Oui. La différence doit être < 0,3 °C

Méthode 2: Étalonnage en deux points

Pour plus de précision, calibre à deux points de température.

* * Point bas (25 ° C): * *
```
Referencia: ____°C
Sensor: ____°C
```

Point élevé (37 ° C):
```
Referencia: ____°C
Sensor: ____°C
```

* * Calcul des coefficients : * *

(High Ref - Faible Ref) / (High Sensor - Faible Sensor)

Offset = Faible Réf - (Gain × Faible Senseur)

Code de la demande

```cpp
struct CalibrationData {
    float offset;
    float gain;
};

float applyCalibration(float rawValue, CalibrationData& cal) {
    return (rawValue * cal.gain) + cal.offset;
}

// Ejemplo de uso
CalibrationData tempCal = {0.0, 1.0}; // Valores por defecto
tempCal.offset = -0.3;  // Si el sensor lee 0.3°C más alto
tempCal.gain = 1.0;     // Sin ajuste de ganancia

float calibratedTemp = applyCalibration(rawTemp, tempCal);
```

Étalonnage de l'humidité

Méthode des ventes saturées

Les solutions de sel saturé fournissent une humidité relative connue à température contrôlée.

- 124; sel - 124; HR à 25 °C - 124;
- 124; - 124; - 124;
- 124; chlorure de lithium (LiCl) - 124; 11,3 % - 124;
- 124; chlorure de magnésium (MgCl) - 124; 32,8% - 124;
- 124; chlorure de sodium (NaCl) - 124; 75,3% - 124;

Procédure:

1. * * Préparer une solution saturée * *
- Ajouter du sel à l'eau jusqu'à dissolution
- Laisser reposer 24 heures

2. * * Créer une chambre d'étalonnage * *
- Petit récipient hermétique
- Mettre la solution en arrière-plan
- Capteur de suspension à l'intérieur (pas de solution)

3. ♪ Attendre la stabilisation ♪
- 24 heures minimum pour l'équilibre
- Température stable (± 1 °C)

4.
C'est la première fois qu'il s'agit d'un problème.

5. * * Appliquer la correction * *
- Entrez le décalage dans la configuration
- Vérifiez avec un autre sel si possible

Étalonnage du capteur de poids (facultatif)

Procédure

1. ♪ Tara ♪
- Oui. Pas de poids sur la plateforme
- Cours.

2. * * Étalonnage avec un poids connu * *
- Oui. Poids de référence (par exemple 1000g)
- Valeur brute du capteur de lecture
- Calculer le facteur d ' étalonnage

```cpp
// Código de calibración de peso
void calibrateScale() {
    Serial.println("Retirar todo peso y presionar Enter...");
    waitForEnter();
    scale.tare();
    
    Serial.println("Colocar peso de 1000g y presionar Enter...");
    waitForEnter();
    
    long rawValue = scale.get_units(20);
    float calibrationFactor = rawValue / 1000.0;
    
    Serial.printf("Factor de calibración: %.2f\n", calibrationFactor);
    scale.set_scale(calibrationFactor);
}
```

# # Enregistrement d'étalonnage

Tenir un registre de tous les étalonnages:

```
REGISTRO DE CALIBRACIÓN - INCUNEST
====================================

Fecha: _______________
Técnico: _______________
Número de serie: _______________

TEMPERATURA AMBIENTE
  Referencia utilizada: _______________
  Certificado #: _______________
  Lectura sensor: ___°C
  Lectura referencia: ___°C
  Offset aplicado: ___°C
  Verificación final: ___°C vs ___°C
  Diferencia: ___°C
  ¿APROBADO? [ ]Sí [ ]No

TEMPERATURA PIEL
  Lectura sensor: ___°C
  Lectura referencia: ___°C
  Offset aplicado: ___°C
  ¿APROBADO? [ ]Sí [ ]No

HUMEDAD
  Referencia utilizada: _______________
  Lectura sensor: ___%
  Lectura referencia: ___%
  Offset aplicado: ___%
  ¿APROBADO? [ ]Sí [ ]No

Firma: _______________
Próxima calibración: _______________
```

Après vérification - Étalonnage

Liste de contrôle

- [] Décalage de température appliqué
- [] Valeurs de température à ± 0,3 °C
- [] décalé d'humidité appliquée
- [] Valeurs d'humidité à ± 3%
- [] Dossier terminé
- [] Date du prochain étalonnage prévu

Essai de stabilité

Après étalonnage, surveiller les mesures pendant 30 minutes:

1. Configuration du système à un point de consigne normal
2. Enregistrement des relevés toutes les 5 minutes
3. Vérifier que la variation est < ± 0,5 °C

Sections suivantes

- [Paramètres] (@ @ URL0 @)
- [Entretien] (@ @ URL1 @)