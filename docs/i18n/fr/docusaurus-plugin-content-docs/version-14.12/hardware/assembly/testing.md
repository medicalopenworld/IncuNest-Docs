---
id: testing
title: Preuves et vérification
sidebar_label: Preuves
sidebar_position: 5
description: Guide d'essai IncuNest
keywords: [pruebas, verificación, calibración, QA]
---

La preuve et la vérification

♪ Liste de contrôle avant l'opération

Contrôle visuel

- [] Tous les câbles correctement connectés
- [] Pas de câbles pelés ou endommagés
- [éclaircit la gorge]
- [] Structure stable
- [] Pas d'obstruction dans les conduits d'air

Vérification électrique

- [] Continuité des terres
- [] Pas de court-circuit (VCC-GND)
- [] Feux à droite installés
- [] Polarité des condensateurs corrects

♪ ♪ Essais de sous-système ♪

# # 1. Essai alimentaire

Procédure:

1. Déconnecter tous les actionneurs
2. Connecter l'alimentation électrique
3. Tensions de mesure:

124; point de mesure 124; valeur prévue 124; tolérance 124;
- 124; - 124; - 124;
- 124; bus 12V - 124; 12,0V - 124; ± 0,5V - 124;
- 124; sortie réglementaire 5V - 124; 5,0V - 124; ± 0,25V - 124;
- 124; sortie réglementaire 3.3V - 124; 3.3V - 124; ± 0,1V - 124;

* * Résultat : * *
- PASS: Toutes les tensions dans la tolérance
- FAIL: Vérifier les régulateurs et les connexions

♪ 2. Essai des capteurs

♪ Détecteur SHT31 / DHT22

```cpp
// Código de prueba
void testTemperatureSensor() {
    float temp = readTemperature();
    float hum = readHumidity();
    
    Serial.printf("Temperatura: %.2f°C\n", temp);
    Serial.printf("Humedad: %.2f%%\n", hum);
    
    // Verificar rango razonable
    if (temp > 15.0 && temp < 40.0 && hum > 20.0 && hum < 90.0) {
        Serial.println("PASS: Sensor funcionando");
    } else {
        Serial.println("FAIL: Lecturas fuera de rango");
    }
}
```

* * Critères d'acceptation : * *
- [] Valeurs stables (± 0,5 ° C en 1 minute)
- [] Répondre aux changements (air chaud)
- [] Aucune valeur NaN ou erreur de communication

♪ Capteur DS18B20

```cpp
void testSkinSensor() {
    float temp = readSkinTemperature();
    
    Serial.printf("Temperatura piel: %.2f°C\n", temp);
    
    // Tocar la sonda debería subir la temperatura
    if (temp > 20.0 && temp < 45.0) {
        Serial.println("PASS: Sensor funcionando");
    }
}
```

♪ 3. Essai d ' actionneur

Calibre

* * PRÉCAUTION: Élément chaud * *

```cpp
void testHeater() {
    Serial.println("Iniciando prueba de calefactor...");
    
    float tempInicial = readTemperature();
    
    // Encender calefactor al 50% por 30 segundos
    setHeaterPower(50);
    setFanSpeed(100); // Ventilador al máximo
    
    delay(30000);
    
    float tempFinal = readTemperature();
    setHeaterPower(0);
    
    float deltaTemp = tempFinal - tempInicial;
    Serial.printf("Delta temperatura: %.2f°C\n", deltaTemp);
    
    if (deltaTemp > 2.0) {
        Serial.println("PASS: Calefactor funcionando");
    } else {
        Serial.println("FAIL: Calentamiento insuficiente");
    }
}
```

* * Critères d'acceptation : * *
- [] Augmentation de température détectable
- [] Pas de fumée ou d'odeur de combustion
- [MOSFET ne surchauffe pas
- [Le thermostat de sécurité ne tire pas

Éventail

```cpp
void testFan() {
    Serial.println("Prueba de ventilador...");
    
    for (int speed = 0; speed <= 100; speed += 25) {
        setFanSpeed(speed);
        Serial.printf("Velocidad: %d%%\n", speed);
        delay(2000);
    }
    
    setFanSpeed(0);
    Serial.println("PASS: Ventilador funcionando");
}
```

* * Vérification : * *
- [] Tourner à toutes les vitesses
- [] Aucun bruit anormal
- [] débit d'air perceptible

Humidificateur

```cpp
void testHumidifier() {
    Serial.println("Prueba de humidificador...");
    
    if (!checkWaterLevel()) {
        Serial.println("FAIL: Sin agua en reservorio");
        return;
    }
    
    setHumidifier(true);
    delay(5000);
    
    // Verificar visualmente producción de niebla
    Serial.println("¿Se observa niebla? (Y/N)");
    
    setHumidifier(false);
}
```

* * Vérification : * *
- [] Produit du brouillard visible
- [] Le capteur de niveau fonctionne.
- [] Pas de fuite d'eau

Buzzer

```cpp
void testBuzzer() {
    Serial.println("Prueba de buzzer...");
    
    // Tono bajo
    beep(1000, 500);
    delay(200);
    
    // Tono medio
    beep(2000, 500);
    delay(200);
    
    // Tono alto
    beep(3000, 500);
    
    Serial.println("¿Se escucharon 3 tonos? (Y/N)");
}
```

4. Affichage Essai

```cpp
void testDisplay() {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("LINEA 1 - TEST OK");
    lcd.setCursor(0, 1);
    lcd.print("LINEA 2 - TEST OK");
    lcd.setCursor(0, 2);
    lcd.print("LINEA 3 - TEST OK");
    lcd.setCursor(0, 3);
    lcd.print("LINEA 4 - TEST OK");
    
    Serial.println("Verificar todas las líneas visibles");
}
```

* * Vérification : * *
- [] Toutes les lignes visibles
- [] Contraste approprié
- [] Des travaux de rétroéclairage.

# # 5. Essai de communication

WiFi

```cpp
void testWiFi() {
    WiFi.begin(SSID, PASSWORD);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("\nPASS: Conectado a WiFi\n");
        Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
        Serial.printf("RSSI: %d dBm\n", WiFi.RSSI());
    } else {
        Serial.println("\nFAIL: No se pudo conectar");
    }
}
```

Serveur Web

1. Connexion au réseau WiFi de l'appareil
2. Ouvrez le navigateur à @ @ CODE0 @
3. Vérifiez que la page charge correctement
4. Vérifier les données en temps réel

Essai complet du système

Cycle de réchauffement

* * Objectif : * * Vérifiez que le système atteint et maintient la température cible.

```
Temperatura
    38°C │                    ════════════════════
         │                   ╱
    36°C │   Objetivo ─────────────────────────────
         │                 ╱
    25°C │════════════════╱
         └─────────┼──────────┼──────────────────► Tiempo
                  10min      20min
```

Procédure:

1. Système de démarrage à température ambiante
2. Configurer le point de consigne: 36,5 ° C
3. Enregistrer la température chaque minute
4. Vérifier :
- [] Temps nécessaire pour atteindre 36 °C < 20 minutes
- [] Stabilité ± 0,5 ° C après stabilisation
- [] Pas de dépassements > 1 °C

Essai d'alarme

124; état 124; action 124; résultat attendu 124;
124; - 124; - 124; - 124;
- 124; Réglage > 38 ° C - 124; Configuration - 124; Alarme: température élevée - 124;
- 124; Déconnecteur - 124; Physiquement - 124; Alarme: capteur - 124;
- 124; Capteur de couverture - 124; Chaleur extérieure - 124; Alarme: surtempérature - 124;
- 124; Réservoir vide - 124; Humidificateur actif - 124; Alarme: eau basse - 124;

Test de sécurité

* *

1. * * Défaillance du thermostat de sécurité: * *
- Thermostat en circuit coupé temporairement
- Vérifiez que le système détecte la surtempérature par le logiciel
- Rétablir le thermostat

2. * * Défaut de communication * *
- Déconnecter le WiFi
- Vérifier le fonctionnement autonome continu

3. * * Réduction d'énergie: * *
- Débrancher la puissance pendant 5 secondes
- Reconectation
- Vérifier le redémarrage correct

Les preuves

Format d'inscription

```
REGISTRO DE PRUEBAS - INCUNEST
================================

Fecha: _______________
Técnico: _______________
Número de serie: _______________

ALIMENTACIÓN
[ ] 12V: _____ V
[ ] 5V:  _____ V
[ ] 3.3V: _____ V

SENSORES
[ ] SHT31: ___°C / ___% HR
[ ] DS18B20: ___°C
[ ] Nivel agua: OK / FALLA

ACTUADORES
[ ] Calefactor: OK / FALLA
[ ] Ventilador: OK / FALLA
[ ] Humidificador: OK / FALLA
[ ] Buzzer: OK / FALLA

DISPLAY
[ ] LCD: OK / FALLA

COMUNICACIONES
[ ] WiFi: OK / FALLA
[ ] WebServer: OK / FALLA

SISTEMA COMPLETO
[ ] Ciclo calentamiento: ___min hasta 36°C
[ ] Estabilidad: ±___°C
[ ] Alarmas: OK / FALLA

OBSERVACIONES:
_________________________________
_________________________________

RESULTADO FINAL: [ ] APROBADO  [ ] RECHAZADO

Firma: _______________
```

Résolution commune des problèmes

124; problème 124; cause possible 124; solution 124;
- 124; - 124; - 124;
- 124; Il ne tourne pas sur le 124ème; Fuse a brûlé le 124ème; Remplacer le fusible le 124ème;
- 124; lectures irrégulières - 124; raccord de débit - 124; soudures de contrôle - 124;
- 124; Il ne chauffe pas; MOSFET endommagé - 124; Remplacer MOSFET - 124;
- 124; WiFi instable - 124; signal faible - 124; Proche du routeur - 124;
- 124; Affichage en blanc - 124; Contraste - 124; Potentiomètre de réglage - 124;

Sections suivantes

- [Guide d'installation] (@ @ URL0 @)
- [Calibration] (@ @ URL1 @)