---
id: maintenance
title: Mantenimiento
sidebar_label: Mantenimiento
sidebar_position: 4
description: Guía de mantenimiento preventivo y correctivo de IncuNest
keywords: [mantenimiento, limpieza, servicio]
---

# Mantenimiento

## Programa de Mantenimiento

Un mantenimiento adecuado es esencial para el funcionamiento seguro y confiable de IncuNest.

<video
  controls
  preload="metadata"
  style={{width: '100%', maxWidth: 800}}
  src="/IncuNest-Docs/videos/es/maintenance.mp4"
>
  Tu navegador no soporta la reproducción de video.
</video>

### Frecuencia Recomendada

| Tarea | Frecuencia | Responsable |
|-------|------------|-------------|
| Limpieza externa | Diario | Usuario |
| Limpieza interna | Semanal | Usuario |
| Verificación de sensores | Semanal | Usuario |
| Calibración de verificación | Semanal | Técnico |
| Inspección de cables | Mensual | Técnico |
| Limpieza de filtros | Mensual | Usuario |
| Mantenimiento preventivo | Trimestral | Técnico |
| Calibración completa | Anual | Técnico certificado |

## Mantenimiento Diario

### Limpieza Externa

1. **Apague el equipo** y desconecte de la corriente
2. **Limpie superficies externas** con paño húmedo
3. **Solución de limpieza:** Agua con jabón neutro o alcohol isopropílico 70%
4. **Seque completamente** antes de encender

:::warning No utilizar
- Solventes agresivos
- Productos abrasivos
- Exceso de agua que pueda entrar al equipo
:::

### Verificación Visual

- [ ] Sin acumulación de polvo excesiva
- [ ] Cables sin daños visibles
- [ ] Conexiones firmes
- [ ] Sin objetos obstruyendo ventilación
- [ ] Display funcionando correctamente

## Mantenimiento Semanal

### Limpieza Interna de la Cámara

1. **Retire al paciente** (si aplica)
2. **Apague el equipo**
3. **Abra la cámara**
4. **Limpie con solución desinfectante:**
   - Alcohol isopropílico 70%
   - Solución de hipoclorito 0.1%
   - Desinfectante hospitalario aprobado

5. **Limpie todas las superficies internas:**
   - Paredes
   - Base
   - Portillo de acceso
   - Sensores (cuidadosamente)

6. **Enjuague con agua destilada** si usó químicos
7. **Seque completamente** con paño limpio
8. **Deje ventilar** 15 minutos antes de usar

### Verificación de Sensores

1. **Inicie el equipo**
2. **Verifique lecturas de sensores:**
   - Temperatura ambiente razonable
   - Humedad razonable
   - Sin errores en display

3. **Compare con instrumento de referencia** (opcional pero recomendado)

### Mantenimiento del Humidificador

1. **Vacíe el reservorio de agua**
2. **Limpie el reservorio:**
   - Solución de vinagre blanco (1:1 con agua)
   - O solución de ácido cítrico

3. **Enjuague abundantemente**
4. **Seque completamente**
5. **Rellene con agua destilada**

:::caution Agua
Use **siempre agua destilada** para el humidificador. El agua del grifo puede dejar depósitos minerales y afectar el funcionamiento.
:::

## Mantenimiento Mensual

### Limpieza de Filtros

Si el equipo tiene filtros de aire:

1. **Localice los filtros**
2. **Retire cuidadosamente**
3. **Limpie con aspiradora** o aire comprimido
4. **Si están muy sucios, reemplace**
5. **Reinstale correctamente**

### Inspección de Cables y Conexiones

1. **Inspeccione visualmente:**
   - Cables de alimentación
   - Cables de sensores
   - Conexiones del PCB

2. **Busque:**
   - Daños en el aislamiento
   - Conexiones flojas
   - Signos de calentamiento
   - Corrosión

3. **Documente cualquier problema**

### Verificación del Sistema de Calefacción

1. **Inicie en modo de prueba**
2. **Verifique que el calefactor responda**
3. **Observe el tiempo de calentamiento**
4. **Compare con valores de referencia:**
   - Debe alcanzar 36°C en < 20 minutos
   - A temperatura ambiente de 25°C

### Verificación del Ventilador

1. **Escuche ruidos anormales**
2. **Verifique flujo de aire**
3. **Compruebe velocidad variable** (si aplica)
4. **Limpie aspas** si hay polvo acumulado

## Mantenimiento Trimestral

### Inspección Eléctrica

**Debe realizarla personal calificado:**

1. **Verifique conexión a tierra**
2. **Mida resistencia de aislamiento**
3. **Prueba de corriente de fuga:**
   - Debe ser < 0.5mA
4. **Inspeccione fusibles**
5. **Verifique estado de la fuente de alimentación**

### Inspección Mecánica

1. **Verifique bisagras y cierres**
2. **Lubrique si es necesario** (lubricante aprobado)
3. **Verifique integridad de sellos**
4. **Inspeccione estructura general**

### Actualización de Firmware

1. **Verifique versión actual**
2. **Consulte versiones disponibles**
3. **Lea notas de la versión**
4. **Realice respaldo de configuración**
5. **Aplique actualización** siguiendo procedimiento
6. **Verifique funcionamiento post-actualización**

## Mantenimiento Anual

### Calibración Completa

Debe realizarse por técnico certificado con equipos de referencia calibrados.

Ver [Guía de Calibración](./calibration).

### Reemplazo de Componentes

Considere reemplazar preventivamente:

| Componente | Vida útil típica |
|------------|------------------|
| Sensor SHT31 | 3-5 años |
| Sensor DS18B20 | 5+ años |
| Ventilador | 3-5 años |
| Elemento calefactor | 3-5 años |
| Sellos de silicona | 2-3 años |

### Documentación

Mantenga registro de:

- Todas las calibraciones
- Reparaciones realizadas
- Componentes reemplazados
- Incidentes y alarmas
- Resultados de pruebas

## Lista de Repuestos Recomendados

Mantenga en inventario:

- [ ] Sensor SHT31
- [ ] Sensor DS18B20
- [ ] Fusibles
- [ ] Cables de sensor
- [ ] Sellos de silicona
- [ ] Elemento calefactor (PTC)
- [ ] Ventilador de reemplazo

## Solución de Problemas de Mantenimiento

### Sensor no responde después de limpieza

1. Verifique que esté completamente seco
2. Verifique conexiones
3. Reinicie el equipo
4. Si persiste, el sensor puede estar dañado

### Calefactor no calienta uniformemente

1. Verifique ventilador
2. Limpie área del calefactor
3. Verifique obstrucciones
4. Puede indicar degradación del elemento

### Alarmas frecuentes sin causa aparente

1. Verifique calibración
2. Verifique conexiones de sensores
3. Verifique umbrales de alarma
4. Puede indicar sensor en mal estado

## Registro de Mantenimiento

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

## Próximas Secciones

- [Solución de Problemas](./troubleshooting)
- [Calibración](./calibration)
