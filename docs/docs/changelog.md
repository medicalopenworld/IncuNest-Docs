---
id: changelog
title: Registro de Cambios
sidebar_label: Changelog
sidebar_position: 12
description: Historial de versiones de IncuNest
keywords: [changelog, versiones, historial, actualizaciones]
---

# Registro de Cambios (Changelog)

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Sin Publicar]

### Planificado
- Soporte para sensor de peso
- Modo de transporte
- Aplicación móvil companion
- Integración con sistemas hospitalarios (HL7/FHIR)

---

## [1.0.0] - 2026-01-15

### ✨ Añadido
- Control de temperatura PID con retroalimentación
- Monitoreo de humedad relativa
- Interfaz web responsive para monitoreo remoto
- Sistema de alarmas multinivel
- Registro de datos en SPIFFS
- Soporte para pantalla LCD 20x4
- Soporte para pantalla TFT 3.5"
- API REST para integración externa
- WebSocket para actualizaciones en tiempo real
- Documentación completa en español e inglés
- Soporte para actualización OTA

### 🔧 Hardware
- PCB principal v1.0
- Diseño de carcasa para impresión 3D
- Integración con sensores DHT22 y SHT31
- Sistema de calefacción con resistencia cerámica
- Sistema de humidificación pasiva

### 📚 Documentación
- Guía de inicio rápido
- Manual de ensamblaje completo
- Guía de calibración
- Documentación de API

---

## [0.9.0-beta] - 2025-11-01

### ✨ Añadido
- Primera versión funcional del control de temperatura
- Interfaz básica en LCD
- Conexión WiFi básica

### 🐛 Corregido
- Estabilidad del control PID
- Reconexión WiFi automática

### ⚠️ Conocido
- Interfaz web incompleta
- Documentación pendiente

---

## [0.5.0-alpha] - 2025-08-15

### ✨ Añadido
- Prototipo inicial de hardware
- Lectura básica de sensores
- Framework de firmware

### ⚠️ Limitaciones
- Solo para desarrollo
- No usar en entornos reales

---

## Guía de Actualización

### De 0.9.x a 1.0.0

1. **Respalde su configuración** antes de actualizar
2. **Actualice el firmware** vía OTA o USB
3. **Revise los nuevos parámetros** en `config.h`
4. **Recalibre los sensores** después de actualizar

```bash
# Actualizar firmware
cd firmware
git pull origin main
pio run --target upload
```

### Notas de Compatibilidad

| Versión Anterior | Compatible con 1.0.0 | Notas |
|------------------|---------------------|-------|
| 0.9.x | ✅ Sí | Actualización directa |
| 0.5.x | ⚠️ Parcial | Requiere nueva calibración |
| < 0.5 | ❌ No | Regrabar desde cero |

---

## Convenciones de Versiones

- **MAJOR.MINOR.PATCH** (ej: 1.2.3)
- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas funcionalidades compatibles
- **PATCH**: Correcciones de bugs compatibles

### Etiquetas Pre-release

- **alpha**: Desarrollo temprano, inestable
- **beta**: Funcionalidad completa, en pruebas
- **rc**: Release Candidate, listo para producción

---

## Enlaces

- [Releases en GitHub](https://github.com/medicalopenworld/IncuNest/releases)
- [Comparar versiones](https://github.com/medicalopenworld/IncuNest/compare)
- [Reportar problemas](https://github.com/medicalopenworld/IncuNest/issues)
