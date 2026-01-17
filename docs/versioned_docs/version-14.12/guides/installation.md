---
id: installation
title: Guía de Instalación
sidebar_label: Instalación
sidebar_position: 1
description: Guía completa de instalación de IncuNest
keywords: [instalación, configuración, setup]
---

# Guía de Instalación

## Requisitos Previos

Antes de comenzar la instalación, asegúrese de tener:

### Hardware
- IncuNest completamente ensamblado y probado
- Fuente de alimentación 12V/10A
- Cable de alimentación AC
- Conexión WiFi disponible

### Software
- Firmware cargado en el ESP32
- Navegador web moderno (Chrome, Firefox, Edge)

## Proceso de Instalación

### Paso 1: Ubicación

Seleccione una ubicación adecuada para la incubadora:

✅ **Requisitos:**
- Superficie plana y estable
- Alejado de corrientes de aire
- Alejado de luz solar directa
- Acceso a toma de corriente
- Temperatura ambiente 18-25°C

❌ **Evitar:**
- Cerca de ventanas o puertas
- Cerca de equipos que generen calor
- Lugares con vibraciones
- Áreas con humedad extrema

### Paso 2: Conexión Eléctrica

1. Verifique que el interruptor esté en posición **OFF**
2. Conecte el cable de alimentación a la incubadora
3. Conecte el cable a una toma de corriente con tierra
4. Verifique que la toma tenga protección (idealmente UPS)

:::warning Seguridad Eléctrica
- Use siempre una toma con conexión a tierra
- No use adaptadores o extensiones de baja calidad
- Considere usar un regulador de voltaje en áreas con suministro inestable
:::

### Paso 3: Primera Encendida

1. Coloque el interruptor en posición **ON**
2. El LED azul comenzará a parpadear (inicialización)
3. Espere a que el sistema complete el auto-diagnóstico (~30 segundos)
4. El LED verde indica sistema listo

**Secuencia de LEDs esperada:**
```
[Azul parpadeando] → Auto-diagnóstico
[Amarillo] → Conectando WiFi
[Verde parpadeando] → Standby (listo)
```

### Paso 4: Configuración WiFi

Si es la primera vez o el WiFi no está configurado:

1. El dispositivo creará un punto de acceso:
   - **SSID:** `IncuNest_XXXX`
   - **Password:** `incunest123`

2. Conecte su dispositivo (teléfono/laptop) a esta red

3. Abra un navegador y vaya a `http://192.168.4.1`

4. Complete el formulario de configuración:
   ```
   Red WiFi: [Seleccionar]
   Contraseña: [Ingresar]
   Nombre del dispositivo: [Opcional]
   ```

5. Presione **Guardar**

6. El dispositivo se reiniciará y conectará a su red

### Paso 5: Verificar Conexión

1. El dispositivo obtendrá una IP de su red
2. Puede encontrar la IP en:
   - Su router (lista de clientes DHCP)
   - Escaneador de red (como Fing)
   - mDNS: `http://incunest.local`

3. Abra el navegador y acceda a la IP

4. Debería ver el dashboard de IncuNest

### Paso 6: Configuración Inicial

#### Configurar Setpoints

1. Acceda a **Configuración > Control**
2. Configure:
   - **Temperatura objetivo:** 36.5°C (típico)
   - **Humedad objetivo:** 60% (típico)
3. Guarde los cambios

#### Verificar Sensores

1. Vaya a **Estado > Sensores**
2. Verifique que todos los sensores muestren lecturas válidas
3. Si algún sensor muestra error, revise las conexiones

#### Configurar Alarmas

1. Acceda a **Configuración > Alarmas**
2. Revise los umbrales predeterminados:
   ```
   Temp. alta (warning): 37.5°C
   Temp. alta (alarma): 38.0°C
   Temp. baja (warning): 34.0°C
   ```
3. Ajuste según necesidades clínicas

### Paso 7: Calibración

Antes del primer uso clínico, realice la calibración:

1. Vaya a **Configuración > Calibración**
2. Siga las instrucciones en pantalla
3. Use termómetro de referencia certificado

Ver [Guía de Calibración](./calibration) para instrucciones detalladas.

### Paso 8: Prueba de Funcionamiento

#### Prueba de Calentamiento

1. Presione **Iniciar** en el dashboard
2. El sistema comenzará a calentar
3. Verifique:
   - [ ] Ventilador funcionando
   - [ ] Temperatura subiendo gradualmente
   - [ ] Sin alarmas inesperadas

4. Espere a que alcance el setpoint (~15-20 minutos)

5. Verifique estabilidad (±0.5°C por 10 minutos)

#### Prueba de Alarmas

1. Configure un setpoint bajo temporalmente (ej: 35°C)
2. Verifique que la alarma de "temperatura alta" suene
3. Restaure el setpoint normal
4. Verifique que la alarma se silencie

## Lista de Verificación Post-Instalación

- [ ] Dispositivo encendido correctamente
- [ ] WiFi conectado
- [ ] Dashboard accesible
- [ ] Sensores funcionando
- [ ] Calefactor funcionando
- [ ] Ventilador funcionando
- [ ] Humidificador funcionando (si aplica)
- [ ] Alarmas configuradas
- [ ] Calibración completada
- [ ] Prueba de calentamiento exitosa
- [ ] Prueba de alarmas exitosa

## Solución de Problemas

### No enciende

1. Verifique conexión eléctrica
2. Verifique fusible
3. Verifique interruptor

### No conecta al WiFi

1. Verifique credenciales
2. Asegúrese de que es red 2.4GHz
3. Acerque al router
4. Reinicie el dispositivo

### Sensores muestran error

1. Verifique conexiones físicas
2. Reinicie el dispositivo
3. Verifique cableado en el PCB

### No alcanza temperatura

1. Verifique aislamiento de la cámara
2. Verifique que no haya fugas de aire
3. Verifique funcionamiento del calefactor

## Próximos Pasos

- [Configuración Avanzada](./configuration)
- [Calibración](./calibration)
- [Mantenimiento](./maintenance)
