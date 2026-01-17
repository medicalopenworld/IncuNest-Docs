---
id: troubleshooting
title: Solución de Problemas
sidebar_label: Solución de Problemas
sidebar_position: 5
description: Guía de diagnóstico y solución de problemas de IncuNest
keywords: [problemas, errores, diagnóstico, solución]
---

# Solución de Problemas

## Diagnóstico Rápido

### Indicadores LED

| Estado LED | Significado | Acción |
|------------|-------------|--------|
| Azul parpadeando | Inicializando | Esperar |
| Amarillo fijo | Conectando WiFi | Verificar red |
| Verde fijo | Standby | Normal |
| Verde parpadeando | Operando | Normal |
| Rojo fijo | Error crítico | Ver código de error |
| Rojo parpadeando | Alarma activa | Atender alarma |
| Sin LED | Sin energía | Verificar alimentación |

### Códigos de Error

| Código | Descripción | Solución |
|--------|-------------|----------|
| E01 | Error sensor temperatura ambiente | Verificar conexión SHT31 |
| E02 | Error sensor temperatura piel | Verificar conexión DS18B20 |
| E03 | Error sensor humedad | Verificar conexión SHT31 |
| E04 | Fallo de calefactor | Verificar conexión y fusible |
| E05 | Fallo de ventilador | Verificar conexión y motor |
| E06 | Error de comunicación WiFi | Verificar credenciales |
| E07 | Error de memoria | Reiniciar dispositivo |
| E08 | Error de configuración | Restablecer configuración |

## Problemas de Encendido

### El equipo no enciende

**Síntomas:** Sin LEDs, sin respuesta

**Posibles causas y soluciones:**

1. **Sin alimentación eléctrica**
   - Verificar que el cable esté conectado
   - Verificar el tomacorriente con otro dispositivo
   - Verificar posición del interruptor

2. **Fusible fundido**
   - Localizar porta-fusible
   - Verificar continuidad del fusible
   - Reemplazar con fusible de igual especificación

3. **Fuente de alimentación dañada**
   - Verificar voltaje de salida (debe ser 12V DC)
   - Reemplazar fuente si es necesario

### El equipo se reinicia constantemente

**Síntomas:** LEDs parpadean, reinicio continuo

**Posibles causas y soluciones:**

1. **Fuente de alimentación insuficiente**
   - Verificar amperaje de la fuente (mínimo 10A)
   - Verificar caída de voltaje bajo carga

2. **Cortocircuito en carga**
   - Desconectar actuadores uno a uno
   - Identificar componente en cortocircuito

3. **Error de firmware**
   - Intentar modo de recuperación
   - Reflashear firmware

## Problemas de Temperatura

### No alcanza la temperatura objetivo

**Tiempo esperado:** 15-20 minutos para alcanzar 36°C

**Posibles causas y soluciones:**

1. **Pérdida de calor excesiva**
   - Verificar cierre completo de la cámara
   - Verificar sellos y juntas
   - Reducir corrientes de aire ambiente

2. **Calefactor insuficiente**
   - Verificar potencia del calefactor (debe ser 100W)
   - Verificar conexiones eléctricas
   - Medir resistencia del elemento PTC

3. **Ventilador no funciona**
   - El calor no se distribuye
   - Verificar funcionamiento del ventilador

4. **Configuración incorrecta**
   - Verificar setpoint configurado
   - Verificar modo de control (auto vs manual)

### Sobrecalentamiento (temperatura muy alta)

**Síntomas:** Alarma de temperatura alta, temperatura > 38°C

**ACCIÓN INMEDIATA:** Abrir cámara, retirar paciente si es necesario

**Posibles causas y soluciones:**

1. **Control PID desajustado**
   - Revisar parámetros PID
   - Reducir Kp si hay overshoot

2. **Sensor mal calibrado**
   - Verificar calibración con termómetro de referencia
   - Aplicar offset de corrección

3. **Sensor dañado**
   - Si lee valores incorrectos consistentemente
   - Reemplazar sensor

4. **Relé de calefactor atascado**
   - Verificar que el calefactor se apague
   - Reemplazar relé/SSR si está dañado

### Oscilación de temperatura

**Síntomas:** Temperatura sube y baja continuamente

**Posibles causas y soluciones:**

1. **Parámetros PID incorrectos**
   ```
   Si oscila mucho: reducir Kp, aumentar Kd
   Si respuesta lenta: aumentar Kp, reducir Ki
   ```

2. **Histéresis muy baja**
   - Aumentar valor de histéresis

3. **Ruido en sensor**
   - Verificar conexiones
   - Implementar filtrado de software adicional

## Problemas de Humedad

### Humedad muy baja

**Posibles causas y soluciones:**

1. **Reservorio vacío**
   - Rellenar con agua destilada

2. **Humidificador no funciona**
   - Verificar conexión eléctrica
   - Verificar membrana ultrasónica
   - Limpiar depósitos minerales

3. **Fugas de aire**
   - Verificar sellos de la cámara

### Humedad muy alta (condensación)

**Posibles causas y soluciones:**

1. **Setpoint muy alto**
   - Reducir setpoint de humedad

2. **Humidificador no se apaga**
   - Verificar control/relé del humidificador
   - Verificar sensor de humedad

3. **Ventilación insuficiente**
   - Verificar funcionamiento del ventilador

## Problemas de Conectividad

### No conecta al WiFi

**Síntomas:** LED amarillo permanente, modo AP activo

**Posibles causas y soluciones:**

1. **Credenciales incorrectas**
   - Verificar SSID (sensible a mayúsculas)
   - Verificar contraseña

2. **Red no compatible**
   - ESP32 solo soporta 2.4GHz
   - Verificar que la red sea 2.4GHz

3. **Señal débil**
   - Acercar dispositivo al router
   - Verificar RSSI en diagnóstico (-70 dBm o mejor)

4. **Router bloqueando**
   - Verificar filtro MAC
   - Verificar límite de dispositivos

### Pierde conexión WiFi frecuentemente

**Posibles causas y soluciones:**

1. **Interferencia**
   - Cambiar canal del router
   - Alejar de otros dispositivos 2.4GHz

2. **Memoria insuficiente**
   - Reiniciar dispositivo
   - Verificar heap libre

3. **Configuración de power save**
   - Deshabilitar WiFi power save en firmware

### No puedo acceder a la interfaz web

1. **Verificar IP correcta**
   - Usar escáner de red
   - Intentar `http://incunest.local`

2. **Puerto bloqueado**
   - Verificar firewall
   - Verificar que el puerto 80 esté abierto

3. **Servidor web no inició**
   - Reiniciar dispositivo
   - Verificar logs de arranque

## Problemas de Sensores

### Sensor muestra "Error" o "NaN"

**Posibles causas y soluciones:**

1. **Conexión suelta**
   - Verificar cableado
   - Verificar soldaduras

2. **Sensor dañado**
   - Probar con sensor de reemplazo
   - Medir continuidad

3. **Dirección I2C incorrecta**
   - Ejecutar escáner I2C
   - Verificar dirección configurada

### Lecturas incorrectas pero estables

1. **Necesita calibración**
   - Ver [Guía de Calibración](./calibration)

2. **Offset incorrecto**
   - Verificar offset configurado
   - Resetear a valores por defecto

### Lecturas erráticas

1. **Ruido eléctrico**
   - Verificar conexión a tierra
   - Alejar cables de sensores de fuentes de ruido
   - Añadir capacitor de desacople

2. **Cables muy largos**
   - Usar cables apantallados
   - Reducir longitud si es posible

## Problemas de Alarmas

### Alarma sonando sin causa aparente

1. **Umbral muy ajustado**
   - Aumentar margen en umbrales
   - Verificar histéresis de alarma

2. **Sensor con ruido**
   - Ver sección de lecturas erráticas

3. **Calibración incorrecta**
   - Verificar calibración del sensor

### Alarma no suena cuando debería

1. **Buzzer deshabilitado**
   - Verificar configuración de buzzer

2. **Buzzer dañado**
   - Probar buzzer directamente
   - Verificar conexión

3. **Umbrales muy amplios**
   - Verificar configuración de umbrales

## Modo de Recuperación

Si el dispositivo no responde normalmente:

1. **Desconecte la alimentación**
2. **Mantenga presionado el botón BOOT/FLASH**
3. **Conecte la alimentación**
4. **Suelte el botón después de 5 segundos**
5. **El dispositivo entrará en modo de recuperación**

En este modo puede:
- Reflashear el firmware
- Restablecer configuración
- Acceder a diagnósticos

## Diagnóstico Avanzado

### Acceso Serial

Para diagnóstico detallado, conecte por USB y abra monitor serial a 115200 baud.

```bash
# Linux/Mac
screen /dev/ttyUSB0 115200

# O con PlatformIO
pio device monitor
```

### Comandos de Diagnóstico

En el monitor serial, escriba:

| Comando | Descripción |
|---------|-------------|
| `status` | Estado general |
| `sensors` | Lecturas de sensores |
| `config` | Configuración actual |
| `wifi` | Estado de WiFi |
| `heap` | Memoria disponible |
| `reboot` | Reiniciar |
| `factory` | Restablecer fábrica |

### Logs del Sistema

Los logs se pueden ver en:
- Monitor serial
- Interfaz web: `/logs`
- API: `GET /api/system/logs`

## Cuándo Contactar Soporte

Contacte soporte técnico si:

- El problema persiste después de intentar las soluciones
- Hay daño físico visible
- Se requiere reemplazo de componentes principales
- Se necesita recalibración certificada
- Hay comportamiento de seguridad anormal

**Información a proporcionar:**

- Número de serie del dispositivo
- Versión de firmware
- Descripción detallada del problema
- Códigos de error mostrados
- Acciones ya intentadas
- Fotos/videos si es relevante

## Próximas Secciones

- [Mantenimiento](./maintenance)
- [FAQ](../faq)
