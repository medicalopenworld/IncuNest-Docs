---
id: changelog
title: Changelog
sidebar_label: Changelog
sidebar_position: 12
description: Historial de versiones de IncuNest
keywords: [changelog, versiones, historial, actualizaciones]
---
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/es/).

## [Unpublished]

### Planned
- Support for weight sensor
- Mode of transport
- Companion mobile application
- Integration with hospital systems (HL7/FHIR)

---

## [1.0.0] - 2026-01-15

### ✨ Added
- PID temperature control with feedback
- Relative humidity monitoring
- Responsive web interface for remote monitoring
- Multilevel alarm system
- Data registration in SPIFFS
- Support for 20x4 LCD screen
- Support for 3.5" TFT screen
- REST API for external integration
- WebSocket for real-time updates
- Complete documentation in Spanish and English
- Support for OTA update

### 🔧 Hardware
- Main PCB v1.0
- Housing design for 3D printing
- Integration with DHT22 and SHT31 sensors
- Heating system with ceramic resistance
- Passive humidification system

### 📚 Documentation
- Quick start guide
- Complete assembly manual
- Calibration guide
- API documentation

---

## [0.9.0-beta] - 2025-11-01

### ✨ Added
- First functional version of temperature control
- Basic LCD interface
- Basic WiFi connection

### 🐛 Corrected
- PID control stability
- Automatic WiFi reconnection

### ⚠️ Known
- Incomplete web interface
- Pending documentation

---

## [0.5.0-alpha] - 2025-08-15

### ✨ Added
- Initial hardware prototype
- Basic sensor reading
- Firmware Framework

### ⚠️ Limitations
- For development only
- Do not use in real environments

---

## Update Guide

### From 0.9.x to 1.0.0

1. **Backup your configuration** before updating
2. **Update firmware** via OTA or USB
3. **Review the new parameters** in `config.h`
4. **Recalibrate sensors** after updating

```bash
# Actualizar firmware
cd firmware
git pull origin main
pio run --target upload
```

### Compatibility Notes

| Previous Version | Compatible with 1.0.0 | Notes |
|------------------|-----------|-------|
| 0.9.x | ✅ Yes | Direct update |
| 0.5.x | ⚠️ Partial | Requires new calibration |
| < 0.5 | ❌ No | Rerecord from scratch |

---

## Versioning Conventions

- **MAJOR.MINOR.PATCH** (ex: 1.2.3)
- **MAJOR**: Changes incompatible with previous versions
- **MINOR**: New supported features
- **PATCH**: Compatible bug fixes

### Pre-release Tags

- **alpha**: Early development, unstable
- **beta**: Full functionality, in testing
- **rc**: Release Candidate, ready for production

---

## Links

- [Releases on GitHub](https://github.com/medicalopenworld/IncuNest/releases)
- [Compare versions](https://github.com/medicalopenworld/IncuNest/compare)
- [Report problems](https://github.com/medicalopenworld/IncuNest/issues)
