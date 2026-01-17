---
id: safety-notice
title: Safety Notice
sidebar_label: Safety Notice
sidebar_position: 3
description: Important safety information for IncuNest
keywords: [safety, warning, medical use, regulations]
---
# ⚠️ Security Notice

:::danger Important Warning
Please read this notice completely before building, assembling or using IncuNest.
:::

## Disclaimer

IncuNest is an open source project for educational and research purposes. The development team and contributors:

1. **DO NOT guarantee** the suitability of the device for clinical use
2. **NOT responsible** for damages or injuries resulting from use
3. **DO NOT certify** compliance with specific medical regulations

## Requirements for Clinical Use

If you plan to use IncuNest in a clinical setting, **MUST**:

### Required Certifications

| Region | Certification Required |
|--------|---------|
| European Union | CE marking (MDR 2017/745) |
| United States | FDA 510(k) Clearance |
| Latin America | ANVISA, COFEPRIS, INVIMA, etc. |
| International | ISO 13485, IEC 60601-1 |

### Required Steps

1. **Risk Assessment**: Perform complete analysis according to ISO 14971
2. **Clinical Validation**: Tests in a controlled environment with medical supervision
3. **Certification**: Obtain approval from local regulatory authority
4. **Traceability**: Implement device tracking system
5. **Training**: Train medical personnel in correct use

## Known Risks

### Thermal Risks

| Risk | Mitigation |
|--------|------------|
| Overheating | Multiple sensors + alarm at 38°C |
| Heater failure | Redundant control + thermal cut-out |
| Insufficient temperature | Low temperature alarm |

### Electrical Hazards

| Risk | Mitigation |
|--------|------------|
| Electric shock | Galvanic isolation + fuses |
| Short circuit | Circuit protection |
| Power failure | Recommended UPS system |

### Moisture Risks

| Risk | Mitigation |
|--------|------------|
| Excessive humidity | Automatic control + drainage |
| Condensation | Adequate ventilation |
| Bacterial growth | Periodic cleaning |

## Alarm System

IncuNest implements a multi-level alarm system:

```mermaid
flowchart TD
    A[Monitoreo Continuo] --> B{¿Parámetro fuera de rango?}
    B -->|Sí| C{Nivel de Severidad}
    B -->|No| A
    C -->|Bajo| D[Alarma Visual - Amarillo]
    C -->|Medio| E[Alarma Visual + Sonora]
    C -->|Alto| F[Alarma + Acción Correctiva]
    C -->|Crítico| G[Alarma + Apagado de Emergencia]
    D --> A
    E --> A
    F --> A
    G --> H[Requiere Reset Manual]
```

### Alarm Levels

| Level | Condition | Action |
|-------|-----------|--------|
| **INFO** | Minor deviation | Blue LED indicator |
| **WARNING** | Moderate deviation | Yellow LED + beep |
| **ALARM** | Parameter out of limits | Red LED + audible alarm |
| **CRITICAL** | Risk for the patient | Safe shutdown + continuous alarm |

## Safe Operating Limits

### Temperature

```
┌──────────────────────────────────────────────────────┐
│ ZONA DE PELIGRO (FRÍO)  │ ZONA SEGURA │ ZONA PELIGRO │
│        < 25°C           │  25°C - 37°C │    > 38°C    │
│      ⚠️ ALARMA          │      ✅      │  🛑 CRÍTICO  │
└──────────────────────────────────────────────────────┘
```

### Relative Humidity

```
┌──────────────────────────────────────────────────────┐
│ BAJO  │     ZONA SEGURA      │        ALTO          │
│ < 40% │      40% - 80%       │        > 85%         │
│  ⚠️   │         ✅           │         ⚠️           │
└──────────────────────────────────────────────────────┘
```

## Security Maintenance

### Daily Inspections

- [ ] Check temperature and humidity readings
- [ ] Check alarm operation
- [ ] Inspect cables and connections
- [ ] Check humidifier water level

### Weekly Inspections

- [ ] Clean temperature sensors
- [ ] Verify sensor calibration
- [ ] Check electrical connections
- [ ] Review alarm logs

### Monthly Inspections

- [ ] Complete sensor calibration
- [ ] Deep cleaning of the camera
- [ ] Check insulation integrity
- [ ] Update firmware if versions are available

## Emergency Contact

In case of malfunction during use:

1. **Immediately remove patient** to an alternative safe environment
2. **Disconnect the device** from the power source
3. **Document the incident** with all details
4. **Report the issue** on [GitHub Issues](https://github.com/medicalopenworld/IncuNest/issues)

## Declaration of Conformity

This project **DOES NOT** include a declaration of conformity with medical regulations. Each implementer is responsible for:

- Obtain necessary certifications
- Perform clinical validation
- Comply with local regulations
- Maintain quality documentation

---

:::info Legal Note
By using this project, you agree that you do so at your own risk and that you have read and fully understood this safety notice.
:::
