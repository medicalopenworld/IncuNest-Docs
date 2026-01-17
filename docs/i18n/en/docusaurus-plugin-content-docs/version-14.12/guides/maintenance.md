---
id: maintenance
title: Mantenimiento
sidebar_label: Mantenimiento
sidebar_position: 4
description: Guía de mantenimiento preventivo y correctivo de IncuNest
keywords: [mantenimiento, limpieza, servicio]
---
# Maintenance

## Maintenance Program

Proper maintenance is essential for the safe and reliable operation of IncuNest.

<video
  controls
  preload="metadata"
  style={{width: '100%', maxWidth: 800}}
  src="/IncuNest-Docs/videos/en/maintenance.mp4"
>
  Your browser does not support video playback.
</video>

### Recommended Frequency

| Task | Frequency | Responsible |
|-------|------------|-------------|
| External cleaning | Diary | User |
| Internal cleaning | Weekly | User |
| Sensor verification | Weekly | User |
| Verification Calibration | Weekly | Technical |
| Cable inspection | Monthly | Technical |
| Filter cleaning | Monthly | User |
| Preventive maintenance | Quarterly | Technical |
| Complete calibration | Annual | Certified Technician |

## Daily Maintenance

### External Cleaning

1. **Turn off the equipment** and disconnect from the power
2. **Clean external surfaces** with damp cloth
3. **Cleaning solution:** Water with neutral soap or 70% isopropyl alcohol
4. **Dry completely** before turning on

:::warning Do not use
- Aggressive solvents
- Abrasive products
- Excess water that may enter the equipment
:::

### Visual Verification

- [ ] No excessive dust accumulation
- [ ] Cables without visible damage
- [ ] Firm connections
- [ ] No objects obstructing ventilation
- [ ] Display working correctly

## Weekly Maintenance

### Internal Cleaning of the Chamber

1. **Remove patient** (if applicable)
2. **Turn off your computer**
3. **Open the camera**
4. **Clean with disinfectant solution:**
- Isopropyl alcohol 70%
- Hypochlorite solution 0.1%
- Approved hospital disinfectant

5. **Clean all internal surfaces:**
- Walls
- Base
- Access gate
- Sensors (carefully)

6. **Rinse with distilled water** if you used chemicals
7. **Dry completely** with clean cloth
8. **Allow to ventilate** 15 minutes before use

### Sensor Verification

1. **Start your computer**
2. **Check sensor readings:**
- Reasonable room temperature
- Reasonable humidity
- No errors on display

3. **Compare with reference instrument** (optional but recommended)

### Humidifier Maintenance

1. **Empty the water reservoir**
2. **Clean the reservoir:**
- White vinegar solution (1:1 with water)
- Or citric acid solution

3. **Rinse thoroughly**
4. **Dry completely**
5. **Fill with distilled water**

:::caution Water
**Always use distilled water** for the humidifier. Tap water can leave mineral deposits and affect operation.
:::

## Monthly Maintenance

### Filter Cleaning

If the equipment has air filters:

1. **Locate the filters**
2. **Remove carefully**
3. **Clean with vacuum cleaner** or compressed air
4. **If very dirty, replace**
5. **Reinstall correctly**

### Inspection of Cables and Connections

1. **Visually inspect:**
- Power cables
- Sensor cables
- PCB connections

2. **Search:**
- Damage to insulation
- Loose connections
- Signs of warming
- Corrosion

3. **Document any issues**

### Heating System Check

1. **Start in test mode**
2. **Verify heater response**
3. **Watch the warm-up time**
4. **Compare with reference values:**
- Must reach 36°C in < 20 minutes
- At room temperature of 25°C

### Fan Check

1. **Hear abnormal noises**
2. **Check airflow**
3. **Check variable speed** (if applicable)
4. **Clean blades** if there is accumulated dust

## Quarterly Maintenance

### Electrical Inspection

**Must be performed by qualified personnel:**

1. **Check ground connection**
2. **Measure insulation resistance**
3. **Leakage current test:**
- Must be < 0.5mA
4. **Inspect fuses**
5. **Check power supply status**

### Mechanical Inspection

1. **Check hinges and closures**
2. **Lubricate if necessary** (approved lubricant)
3. **Verify integrity of seals**
4. **Inspect general structure**

### Firmware Update

1. **Check current version**
2. **Check available versions**
3. **Read release notes**
4. **Back up configuration**
5. **Apply update** following procedure
6. **Verify post-update operation**

## Annual Maintenance

### Complete Calibration

It must be performed by a certified technician with calibrated reference equipment.

See [Calibration Guide](./calibration).

### Component Replacement

Consider preventatively replacing:

| Component | Typical lifespan |
|---------|--------|
| SHT31 Sensor | 3-5 years |
| DS18B20 Sensor | 5+ years |
| Fan | 3-5 years |
| Heating element | 3-5 years |
| Silicone stamps | 2-3 years |

### Documentation

Keep record of:

- All calibrations
- Repairs made
- Replaced components
- Incidents and alarms
- Test results

## Recommended Spare Parts List

Keep in inventory:

- [ ] SHT31 Sensor
- [ ] Sensor DS18B20
- [ ] Fuses
- [ ] Sensor cables
- [ ] Silicone seals
- [ ] Heating element (PTC)
- [ ] Replacement fan

## Maintenance Troubleshooting

### Sensor does not respond after cleaning

1. Check that it is completely dry
2. Check connections
3. Restart your computer
4. If it persists, the sensor may be damaged

### Heater does not heat evenly

1. Check fan
2. Clean heater area
3. Check for obstructions
4. May indicate element degradation

### Frequent alarms without apparent cause

1. Check calibration
2. Check sensor connections
3. Check alarm thresholds
4. It may indicate sensor in poor condition

## Maintenance Log

```
REGISTRO DE MANTENIMIENTO - INCUNEST
=====================================

Número de serie: _______________

Fecha: _______________
Tipo de mantenimiento: [ ]Diario [ ]Semanal [ ]Mensual [ ]Trimestral [ ]Anual

Tareas realizadas:
[ ] Limpieza externa
[ ] Limpieza interna
[ ] Verificación de sensores
[ ] Limpieza de humidificador
[ ] Limpieza de filtros
[ ] Inspección de cables
[ ] Verificación de calefactor
[ ] Verificación de ventilador
[ ] Inspección eléctrica
[ ] Calibración
[ ] Actualización de firmware

Observaciones:
_________________________________
_________________________________

Problemas encontrados:
_________________________________
_________________________________

Acciones correctivas:
_________________________________
_________________________________

Próximo mantenimiento programado: _______________

Técnico: _______________
Firma: _______________
```

## Upcoming Sections

- [Troubleshooting](./troubleshooting)
- [Calibration](./calibration)
