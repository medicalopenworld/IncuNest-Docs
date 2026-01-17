---
id: faq
title: Preguntas Frecuentes
sidebar_label: FAQ
sidebar_position: 11
description: Preguntas frecuentes sobre IncuNest
keywords: [FAQ, preguntas, ayuda, soporte]
---

# Preguntas Frecuentes (FAQ)

## General

### ¿Qué es IncuNest?

IncuNest es una incubadora neonatal de código abierto diseñada para proporcionar atención térmica a recién nacidos en entornos con recursos limitados. El proyecto incluye tanto hardware como software, permitiendo a comunidades y organizaciones construir y mantener sus propias incubadoras.

### ¿Es IncuNest un dispositivo médico certificado?

**No.** IncuNest es un proyecto educativo y de investigación. Para uso clínico, debe obtener las certificaciones médicas correspondientes de su jurisdicción (CE, FDA, etc.). Consulte el [Aviso de Seguridad](./safety-notice) para más información.

### ¿Cuánto cuesta construir una IncuNest?

El costo aproximado de los componentes varía según la región:

| Componente | Costo Estimado (USD) |
|------------|---------------------|
| Electrónica | $50 - $80 |
| Sensores | $20 - $40 |
| Estructura | $100 - $200 |
| Calefacción | $30 - $50 |
| **Total** | **$200 - $370** |

### ¿Qué habilidades necesito para construir IncuNest?

- **Básico**: Soldadura de componentes through-hole
- **Intermedio**: Programación básica, uso de herramientas
- **Avanzado**: Diseño de PCB, programación C++

## Hardware

### ¿Qué microcontrolador usa IncuNest?

IncuNest usa el **ESP32-WROOM-32** por sus capacidades:
- WiFi integrado
- Suficientes GPIOs
- Bajo costo
- Buena documentación
- Comunidad activa

### ¿Puedo usar otro microcontrolador?

Sí, pero requerirá adaptaciones significativas. El código está optimizado para ESP32. Alternativas posibles:
- ESP32-S3 (recomendado)
- STM32 (requiere port)
- Arduino Mega (limitado)

### ¿Qué sensores de temperatura son compatibles?

| Sensor | Precisión | Costo | Recomendación |
|--------|-----------|-------|---------------|
| DHT22 | ±0.5°C | Bajo | Para prototipos |
| SHT31 | ±0.3°C | Medio | **Recomendado** |
| DS18B20 | ±0.5°C | Bajo | Alternativa |
| MAX31865 (PT100) | ±0.1°C | Alto | Alta precisión |

### ¿Dónde puedo conseguir los componentes?

Proveedores recomendados:
- **Global**: DigiKey, Mouser, LCSC
- **Latinoamérica**: MercadoLibre, tiendas locales de electrónica
- **Asia**: AliExpress, Banggood (mayor tiempo de envío)

### ¿Puedo usar una fuente de alimentación diferente?

Sí, siempre que cumpla:
- **Voltaje**: 12V DC (11-13V aceptable)
- **Corriente**: Mínimo 10A
- **Calidad**: Preferir fuentes certificadas

## Software

### ¿Cómo actualizo el firmware?

**Vía USB:**
```bash
cd firmware
pio run --target upload
```

**Vía OTA (Over-the-Air):**
1. Acceda a la interfaz web
2. Vaya a Configuración > Sistema
3. Suba el archivo `.bin`

### ¿Puedo usar Arduino IDE en lugar de PlatformIO?

Sí, pero no es recomendado. Si lo prefiere:
1. Instale las librerías requeridas manualmente
2. Copie el código de `src/` a un proyecto Arduino
3. Configure las opciones de compilación correctamente

### ¿Cómo cambio los parámetros del PID?

En el archivo `config.h`:

```cpp
#define KP 2.0   // Ganancia proporcional
#define KI 0.5   // Ganancia integral
#define KD 1.0   // Ganancia derivativa
```

O vía interfaz web en tiempo real (Configuración > Control).

### ¿Los datos se guardan en algún lugar?

Sí, IncuNest almacena datos en:
- **SPIFFS**: Configuración y logs locales
- **SD Card** (opcional): Historial extendido
- **Servidor externo** (opcional): Vía MQTT

## Uso y Mantenimiento

### ¿Cada cuánto debo calibrar los sensores?

| Tipo de calibración | Frecuencia |
|---------------------|------------|
| Verificación rápida | Semanal |
| Calibración completa | Mensual |
| Calibración certificada | Anual |

### ¿Cómo limpio la incubadora?

1. **Apague** y desconecte el equipo
2. **Retire** componentes removibles
3. **Limpie** con solución desinfectante aprobada
4. **Seque** completamente antes de usar
5. **Verifique** funcionamiento antes de uso clínico

### ¿Qué hago si suena una alarma?

1. **Identifique** el tipo de alarma (ver pantalla)
2. **Verifique** el estado del paciente
3. **Corrija** la condición que causó la alarma
4. **Silencie** la alarma una vez corregido
5. **Documente** el incidente

## Troubleshooting

### El ESP32 no enciende

1. Verifique la fuente de alimentación
2. Compruebe el regulador de voltaje
3. Revise el LED de power
4. Pruebe con otra placa ESP32

### Las lecturas de temperatura son incorrectas

1. Verifique conexiones del sensor
2. Ejecute calibración
3. Reemplace el sensor si está dañado
4. Revise interferencias electromagnéticas

### No puedo conectar al WiFi

1. Confirme credenciales correctas
2. Verifique que sea red 2.4GHz
3. Acerque el dispositivo al router
4. Reinicie el ESP32
5. Revise el monitor serial para errores

### La temperatura no se estabiliza

1. Verifique el aislamiento térmico
2. Ajuste los parámetros PID
3. Compruebe el elemento calefactor
4. Revise que no haya fugas de aire

## Contribución

### ¿Cómo puedo contribuir al proyecto?

Vea nuestra [Guía de Contribución](./contributing) completa. Formas de contribuir:
- Reportar bugs
- Mejorar documentación
- Contribuir código
- Diseñar mejoras de hardware
- Traducir a otros idiomas

### ¿Dónde puedo hacer preguntas?

- **GitHub Discussions**: Para preguntas generales
- **GitHub Issues**: Para bugs y sugerencias
- **Documentación**: Busque aquí primero

---

¿No encontró su pregunta? [Abra un issue](https://github.com/medicalopenworld/IncuNest/issues/new) en GitHub.
