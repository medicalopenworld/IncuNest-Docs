---
id: troubleshooting
title: Solución de Problemas
sidebar_label: Troubleshooting
sidebar_position: 5
description: Guía de diagnóstico y solución de problemas de IncuNest
keywords: [problemas, errores, diagnóstico, solución]
---
# Troubleshooting

## Quick Diagnosis

### LED indicators

| LED Status | Meaning | Action |
|---------|-------------|--------|
| Blue flashing | Initializing | Wait |
| Solid yellow | Connecting WiFi | Verify network |
| Solid green | Standby | Normal |
| Green flashing | Operating | Normal |
| Solid red | Critical error | See error code |
| Red flashing | Alarm active | Answer alarm |
| Without LED | No power | Check power |

### Error Codes

| Code | Description | Solution |
|--------|-------------|----------|
| E01 | Room temperature sensor error | Check SHT31 connection |
| E02 | Skin temperature sensor error | Check connection DS18B20 |
| E03 | Humidity sensor error | Check SHT31 connection |
| E04 | Heater failure | Check connection and fuse |
| E05 | Fan failure | Check connection and motor |
| E06 | WiFi communication error | Verify credentials |
| E07 | Memory error | Reboot device |
| E08 | Configuration error | Reset settings |

## Ignition Problems

### The device does not turn on

**Symptoms:** No LEDs, no response

**Possible causes and solutions:**

1. **No power supply**
- Check that the cable is connected
- Check the outlet with another device
- Check switch position

2. **Blown fuse**
- Locate fuse holder
- Check fuse continuity
- Replace with fuse of the same specification

3. **Power supply damaged**
- Check output voltage (must be 12V DC)
- Replace font if necessary

### The computer keeps restarting

**Symptoms:** LEDs flashing, continuous reboot

**Possible causes and solutions:**

1. **Insufficient power supply**
- Check source amperage (minimum 10A)
- Check voltage drop under load

2. **Short circuit on load**
- Disconnect actuators one by one
- Identify shorted component

3. **Firmware error**
- Try recovery mode
- Flash firmware

## Temperature Problems

### Does not reach target temperature

**Expected time:** 15-20 minutes to reach 36°C

**Possible causes and solutions:**

1. **Excessive heat loss**
- Verify complete closure of the chamber
- Check seals and gaskets
- Reduce ambient air currents

2. **Insufficient heater**
- Check heater power (must be 100W)
- Check electrical connections
- Measure resistance of the PTC element

3. **Fan not working**
- Heat is not distributed
- Check fan operation

4. **Incorrect configuration**
- Check configured setpoint
- Check control mode (auto vs manual)

### Overheating (too high temperature)

**Symptoms:** High temperature alarm, temperature > 38°C

**IMMEDIATE ACTION:** Open chamber, remove patient if necessary

**Possible causes and solutions:**

1. **PID control out of adjustment**
- Review PID parameters
- Reduce Kp if there is overshoot

2. **Badly calibrated sensor**
- Verify calibration with reference thermometer
- Apply correction offset

3. **Sensor damaged**
- If you consistently read incorrect values
- Replace sensor

4. **Heater relay stuck**
- Check that the heater turns off
- Replace relay/SSR if damaged

### Temperature oscillation

**Symptoms:** Temperature rises and falls continuously

**Possible causes and solutions:**

1. **Incorrect PID parameters**

```
   Si oscila mucho: reducir Kp, aumentar Kd
   Si respuesta lenta: aumentar Kp, reducir Ki
   ```

2. **Very low hysteresis**
- Increase hysteresis value

3. **Noise in sensor**
- Check connections
- Implement additional software filtering

## Moisture Problems

### Very low humidity

**Possible causes and solutions:**

1. **Empty reservoir**
- Fill with distilled water

2. **Humidifier not working**
- Check electrical connection
- Check ultrasonic membrane
- Clean mineral deposits

3. **Air leaks**
- Check camera seals

### Very high humidity (condensation)

**Possible causes and solutions:**

1. **Setpoint too high**
- Reduce humidity setpoint

2. **Humidifier does not turn off**
- Check humidifier control/relay
- Check humidity sensor

3. **Insufficient ventilation**
- Check fan operation

## Connectivity Issues

### Does not connect to WiFi

**Symptoms:** Solid yellow LED, AP mode active

**Possible causes and solutions:**

1. **Incorrect credentials**
- Check SSID (case sensitive)
- Verify password

2. **Network not supported**
- ESP32 only supports 2.4GHz
- Verify that the network is 2.4GHz

3. **Weak signal**
- Bring device closer to the router
- Check RSSI in diagnostics (-70 dBm or better)

4. **Router blocking**
- Check MAC filter
- Check device limit

### Lose WiFi connection frequently

**Possible causes and solutions:**

1. **Interference**
- Change router channel
- Move away from other 2.4GHz devices

2. **Out of memory**
- Reboot device
- Check free heap

3. **Power save settings**
- Disable WiFi power save in firmware

### I can't access the web interface

1. **Verify correct IP**
- Use network scanner
- Try `http://incunest.local`

2. **Port blocked**
- Check firewall
- Verify that port 80 is open

3. **Web server did not start**
- Reboot device
- Check boot logs

## Sensor Problems

### Sensor shows "Error" or "NaN"

**Possible causes and solutions:**

1. **Loose connection**
- Check wiring
- Check welds

2. **Sensor damaged**
- Test with replacement sensor
- Measure continuity

3. **Incorrect I2C address**
- Run I2C scanner
- Check configured address

### Incorrect but stable readings

1. **Needs calibration**
- See [Calibration Guide](./calibration)

2. **Incorrect offset**
- Check configured offset
- Reset to default values

### Erratic readings

1. **Electrical noise**
- Check ground connection
- Move sensor cables away from noise sources
- Add decoupling capacitor

2. **Very long cables**
- Use shielded cables
- Reduce length if possible

## Alarm Problems

### Alarm ringing for no apparent reason

1. **Very tight threshold**
- Increase margin in thresholds
- Check alarm hysteresis

2. **Sensor with noise**
- See erratic readings section

3. **Incorrect calibration**
- Check sensor calibration

### Alarm does not sound when it should

1. **Buzzer disabled**
- Check buzzer settings

2. **Buzzer damaged**
- Test buzzer directly
- Verify connection

3. **Very wide thresholds**
- Check threshold configuration

## Recovery Mode

If the device does not respond normally:

1. **Turn off the power**
2. **Press and hold the BOOT/FLASH button**
3. **Turn on the power**
4. **Release the button after 5 seconds**
5. **The device will enter recovery mode**

In this mode you can:
- Flash firmware
- Reset settings
- Access diagnostics

## Advanced Diagnostics

### Serial Access

For detailed diagnosis, connect via USB and open serial monitor at 115200 baud.

```bash
# Linux/Mac
screen /dev/ttyUSB0 115200

# O con PlatformIO
pio device monitor
```

### Diagnostic Commands

At the serial monitor, type:

| Command | Description |
|---------|-------------|
| `status` | General condition |
| `sensors` | Sensor readings |
| `config` | Current Settings |
| `wifi` | WiFi Status |
| `heap` | Available memory |
| `reboot` | Restart |
| `factory` | Factory reset |

### System Logs

The logs can be seen at:
- Serial monitor
- Web interface: `/logs`
- API: `GET /api/system/logs`

## When to Contact Support

Contact technical support if:

- The problem persists after trying the solutions
- There is visible physical damage
- Replacement of major components required
- Certified recalibration needed
- There is abnormal security behavior

**Information to provide:**

- Device serial number
- Firmware version
- Detailed description of the problem
- Error codes displayed
- Actions already attempted
- Photos/videos if relevant

## Upcoming Sections

- [Maintenance](./maintenance)
- [FAQ](../faq)
