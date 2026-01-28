---
id: safety-notice
title: Avis de sécurité
sidebar_label: Avis de sécurité
sidebar_position: 3
description: Informations de sécurité importantes pour IncuNest
keywords: [sécurité, avertissement, usage médical, réglementations]
---

## ⚠️ Avis de sécurité

:::danger Avertissement important
Lisez cet avis dans son intégralité avant de construire, assembler ou utiliser IncuNest.
:::

## Avertissement

IncuNest est un projet open source à des fins éducatives et de recherche. Équipe de développement et contributeurs:

1. * * Ne garantit pas * * l'adéquation de l'appareil à un usage clinique
2. * * Ils ne sont pas tenus responsables * * des dommages ou blessures résultant de l'utilisation
3. * * Ils n'attestent pas * * le respect des règlements médicaux spécifiques

# # Exigences relatives à l'utilisation clinique

Si vous prévoyez d'utiliser IncuNest dans un environnement clinique, * * DEBE * *:

Certificats requis

- 124; région - 124; certification requise - 124;
- 124;
- 124; Union européenne - 124; marquage CE (MDR 2017 / 745) - 124;
- 124; États-Unis - 124; FDA 510 k) Liquidation - 124;
- 124; Amérique latine - 124; ANVISA, COFEPRIS, INVIMA, etc. - 124;
- 124; International - 124; ISO 13485, CEI 60601-1 - 124;

Étapes obligatoires

1. * * Évaluation des risques * *: analyse complète conformément à la norme ISO 14971
2. * * Validation clinique * * : Essais dans un environnement contrôlé avec supervision médicale
3. * * Certification * *: Obtenir l'approbation de l'autorité de régulation locale
4. * * Tracabilité * * : Mettre en œuvre le système de suivi des appareils
5. * * Formation * *: Formation du personnel médical à une utilisation correcte

Risques connus

Risques thermiques

- 124; risque - 124; atténuation - 124;
- 124;
- 124; surchauffe - 124; Capteurs multiples + alarme à 38 °C - 124;
- 124; panne de chauffage - 124; commande redondante + coupure thermique - 124;
- 124; température insuffisante - 124; alarme basse température - 124;

Risques électriques

- 124; risque - 124; atténuation - 124;
- 124;
- 124; décharge électrique - 124; isolation galvanique + fusibles - 124;
- 124; court-circuit - 124; protection du circuit - 124;
- 124; Défaut de puissance - 124; système UPS recommandé - 124;

Pays humides

- 124; risque - 124; atténuation - 124;
- 124;
- 124; humidité excessive - 124; commande automatique + drainage - 124;
124; condamnation 124; ventilation appropriée 124;
124; croissance bactérienne 124; nettoyage périodique 124;

Système d'alarme

IncuNest implémente un système d'alarme à plusieurs niveaux :

```mermaid
graph TD
    A([🔍 Surveillance Continue]) --> B{Paramètre hors limites?}
    B -->|✅ Non| A
    B -->|⚠️ Oui| C{Niveau de Gravité}
    
    C -->|🟡 Faible| D[Alarme Visuelle - Jaune]
    C -->|🟠 Moyen| E[Alarme Visuelle + Sonore]
    C -->|🔴 Élevé| F[Alarme + Action Corrective]
    C -->|⛔ Critique| G[Alarme + Arrêt d'Urgence]
    
    D --> A
    E --> A
    F --> A
    G --> H((🔧 Réinitialisation Manuelle))
    
    classDef monitor fill:#e2e3e5,stroke:#6c757d,stroke-width:2px
    classDef decision fill:#cce5ff,stroke:#007bff,stroke-width:2px
    classDef low fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef medium fill:#ffe5b4,stroke:#fd7e14,stroke-width:2px
    classDef high fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    classDef critical fill:#dc3545,stroke:#721c24,stroke-width:2px,color:#fff
    
    class A monitor
    class B,C decision
    class D low
    class E medium
    class F high
    class G,H critical
```

Niveau d'alarme

124; niveau 124; état 124; action 124;
- 124; - 124; - 124;
- 124; * * INFO * * - 124; écart mineur - 124; indicateur DEL bleu - 124;
124; * * AVERTISSEMENT * * - 124; déviation modérée - 124; LED jaune + bip - 124;
124; * * ALARM * * - 124;
- 124; * * CRITIQUE * * - 124; Risque pour le patient - 124; Sécurisation + alarme continue - 124;

L'opération limite la sécurité

Température

```mermaid
graph LR
    subgraph danger1 [⚠️ ZONE DE DANGER - FROID]
        A["< 25°C<br/>ALARME"]
    end
    
    subgraph safe [✅ ZONE SÛRE]
        B["25°C - 37°C<br/>FONCTIONNEMENT NORMAL"]
    end
    
    subgraph danger2 [🛑 ZONE DE DANGER - CHAUD]
        C["> 38°C<br/>CRITIQUE"]
    end
    
    A --> B --> C
    
    classDef danger fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    classDef safe fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef critical fill:#dc3545,stroke:#721c24,stroke-width:2px,color:#fff
    
    class A danger
    class B safe
    class C critical
```

Humidité relative

```mermaid
graph LR
    subgraph low [⚠️ FAIBLE]
        A["< 40%<br/>Avertissement"]
    end
    
    subgraph optimal [✅ ZONE SÛRE]
        B["40% - 80%<br/>OPTIMAL"]
    end
    
    subgraph high [⚠️ ÉLEVÉ]
        C["> 85%<br/>Avertissement"]
    end
    
    A --> B --> C
    
    classDef warning fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef safe fill:#d4edda,stroke:#28a745,stroke-width:2px
    
    class A,C warning
    class B safe
```

Entretien de la sécurité

Inspections quotidiennes

- [] Vérifier les valeurs de température et d'humidité
- [] Vérifier le fonctionnement des alarmes
- [] Inspecter les câbles et les connexions
- [] Vérifiez le niveau d'eau de l'humidificateur

Inspections hebdomadaires

- [] Capteurs de température propres
- [] Vérifier l'étalonnage du capteur
- [] Vérifier les connexions électriques
- [] Examiner les dossiers des alarmes

Inspections mensuelles

- [] Étalonnage complet du capteur
- [] Nettoyage en profondeur de la caméra
- [] Vérifier l'intégrité de l'isolement
- [] Mettre à jour le firmware si les versions sont disponibles

Contact d'urgence

En cas de défaut de fonctionnement pendant l'utilisation:

1. * * Emmenez immédiatement le patient * * dans un autre environnement sûr
2. * * Débrancher l'appareil * * de l'alimentation électrique
3. * * Documenté l'incident * * avec tous les détails
4. * * Signaler le problème * * sur [GitHub Issues] (@ @ URL0 @)

Déclaration de conformité

Ce projet * * NON * comprend une déclaration de conformité avec la réglementation médicale. Chaque implémentateur est responsable:

- Obtenez les certifications nécessaires
- Effectuer une validation clinique
- Respect des réglementations locales
- Maintenir la documentation de qualité

---

:: info Note juridique
En utilisant ce projet, il accepte qu'il le fasse sous sa propre responsabilité et qu'il ait lu et bien compris cet avis de sécurité.
:: Le cas échéant;
