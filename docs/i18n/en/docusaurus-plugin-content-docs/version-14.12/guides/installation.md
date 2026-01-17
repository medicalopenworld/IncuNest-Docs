---
id: installation
title: Guía de Instalación
sidebar_label: Instalación
sidebar_position: 1
description: Guía completa de instalación de IncuNest
keywords: [instalación, configuración, setup]
---
# Installation Guide

## Prerequisites

Before beginning the installation, make sure you have:

### Hardware
- IncuNest fully assembled and tested
- Power supply 12V/10A
- AC power cord
- WiFi connection available

### Software
- Firmware loaded on the ESP32
- Modern web browser (Chrome, Firefox, Edge)

## Installation Process

### Step 1: Location

Select a suitable location for the incubator:

✅ **Requirements:**
- Flat and stable surface
- Away from drafts
- Away from direct sunlight
- Access to power outlet
- Ambient temperature 18-25°C

❌ **Avoid:**
- Near windows or doors
- Near equipment that generates heat
- Places with vibrations
- Areas with extreme humidity

### Step 2: Electrical Connection

1. Verify that the switch is in **OFF** position
2. Connect the power cord to the incubator
3. Plug the cable into a grounded outlet
4. Verify that the outlet has protection (ideally UPS)

:::warning Electrical Safety
- Always use a grounded outlet
- Do not use low quality adapters or extensions
- Consider using a voltage regulator in areas with unstable supply
:::

### Step 3: First Power On

1. Turn the switch to **ON** position
2. The blue LED will start flashing (initialization)
3. Wait for the system to complete the self-diagnosis (~30 seconds)
4. Green LED indicates system ready

**Expected LED sequence:**
```
[Azul parpadeando] → Auto-diagnóstico
[Amarillo] → Conectando WiFi
[Verde parpadeando] → Standby (listo)
```

### Step 4: WiFi Configuration

If this is the first time or WiFi is not configured:

1. The device will create an access point:
- **SSID:** `IncuNest_XXXX`
- **Password:** `incunest123`

2. Connect your device (phone/laptop) to this network

3. Open a browser and go to `http://192.168.4.1`

4. Complete the setup form:

```
   Red WiFi: [Seleccionar]
   Contraseña: [Ingresar]
   Nombre del dispositivo: [Opcional]
   ```

5. Press **Save**

6. The device will reboot and connect to your network

### Step 5: Verify Connection

1. The device will get an IP from your network
2. You can find the IP at:
- Your router (DHCP client list)
- Network scanner (like Fing)
- mDNS: `http://incunest.local`

3. Open the browser and access the IP

4. You should see the IncuNest dashboard

### Step 6: Initial Configuration

#### Configure Setpoints

1. Access **Settings > Control**
2. Configure:
- **Target temperature:** 36.5°C (typical)
- **Target humidity:** 60% (typical)
3. Save changes

#### Check Sensors

1. Go to **Status > Sensors**
2. Verify that all sensors show valid readings
3. If any sensor shows error, check the connections

#### Set Alarms

1. Access **Settings > Alarms**
2. Review the default thresholds:

```
   Temp. alta (warning): 37.5°C
   Temp. alta (alarma): 38.0°C
   Temp. baja (warning): 34.0°C
   ```
3. Adjustment according to clinical needs

### Step 7: Calibration

Before first clinical use, perform calibration:

1. Go to **Settings > Calibration**
2. Follow the on-screen instructions
3. Use certified reference thermometer

See [Calibration Guide](./calibration) for detailed instructions.

### Step 8: Function Test

#### Warm-up Test

1. Press **Start** on the dashboard
2. The system will start heating
3. Check:
- [ ] Fan running
- [ ] Temperature gradually rising
- [ ] No unexpected alarms

4. Wait for it to reach the setpoint (~15-20 minutes)

5. Check stability (±0.5°C for 10 minutes)

#### Alarm Test

1. Set a temporarily low setpoint (ex: 35°C)
2. Verify that the "high temperature" alarm sounds
3. Restore normal setpoint
4. Verify that the alarm is silenced

## Post-Installation Checklist

- [ ] Device turned on correctly
- [ ] WiFi connected
- [ ] Accessible Dashboard
- [ ] Sensors working
- [ ] Heater working
- [ ] Fan running
- [ ] Humidifier running (if applicable)
- [ ] Alarms configured
- [ ] Calibration completed
- [ ] Warm-up test successful
- [ ] Alarm test successful

## Troubleshooting

### Does not turn on

1. Check electrical connection
2. Check fuse
3. Check switch

### Does not connect to WiFi

1. Verify credentials
2. Make sure it is 2.4GHz network
3. Move closer to the router
4. Restart the device

### Sensors show error

1. Check physical connections
2. Restart the device
3. Check wiring on the PCB

### Does not reach temperature

1. Check chamber insulation
2. Check for air leaks
3. Check heater operation

## Next Steps

- [Advanced Settings](./configuration)
- [Calibration](./calibration)
- [Maintenance](./maintenance)
