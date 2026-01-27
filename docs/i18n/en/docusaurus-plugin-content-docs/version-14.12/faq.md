---
id: faq
title: FAQ
sidebar_label: FAQ
sidebar_position: 11
description: Preguntas frecuentes sobre IncuNest
keywords: [FAQ, preguntas, ayuda, soporte]
---
# Frequently Asked Questions (FAQ)

## General

### What is IncuNest?

IncuNest is an open source neonatal incubator designed to provide thermal care to newborns in resource-limited settings. The project includes both hardware and software, allowing communities and organizations to build and maintain their own incubators.

### Is IncuNest a certified medical device?

**No.** IncuNest is an educational and research project. For clinical use, you must obtain the appropriate medical certifications from your jurisdiction (CE, FDA, etc.). See [Security Notice](./safety-notice) for more information.

### How much does it cost to build an IncuNest?

The approximate cost of components varies depending on the region:

| Component | Estimated Cost (USD) |
|------------|---------------------|
| Electronics | $50 - $80 |
| Sensors | $20 - $40 |
| Structure | $100 - $200 |
| Heating | $30 - $50 |
| **Total** | **$200 - $370** |

### What skills do I need to build IncuNest?

- **Basic**: Welding of through-hole components
- **Intermediate**: Basic programming, use of tools
- **Advanced**: PCB design, C++ programming

## Hardware

### What microcontroller does IncuNest use?

IncuNest uses the **ESP32-WROOM-32** for its capabilities:
- Integrated WiFi
- Enough GPIOs
- Low cost
- Good documentation
- Active community

### Can I use another microcontroller?

Yes, but it will require significant adaptations. The code is optimized for ESP32. Possible alternatives:
- ESP32-S3 (recommended)
- STM32 (port required)
- Arduino Mega (limited)

### What temperature sensors are compatible?

| Sensor | Precision | Cost | Recommendation |
|--------|-----------|-------|---------------|
| DHT22 | ±0.5°C | Low | For prototypes |
| SHT31 | ±0.3°C | Medium | **Recommended** |
| DS18B20 | ±0.5°C | Low | Alternative |
| MAX31865 (PT100) | ±0.1°C | High | High precision |

### Where can I get the components?

Recommended suppliers:
- **Global**: DigiKey, Mouser, LCSC
- **Latin America**: MercadoLibre, local electronics stores
- **Asia**: AliExpress, Banggood (longer shipping time)

### Can I use a different power supply?

Yes, as long as you comply with:
- **Voltage**: 12V DC (11-13V acceptable)
- **Current**: Minimum 10A
- **Quality**: Prefer certified sources

## Software

### How do I update the firmware?

**Via USB:**
```bash
cd firmware
pio run --target upload
```

**Via OTA (Over-the-Air):**
1. Access the web interface
2. Go to Settings > System
3. Upload the `.bin` file

### Can I use Arduino IDE instead of PlatformIO?

Yes, but it is not recommended. If you prefer:
1. Install the required libraries manually
2. Copy the code from `src/` to an Arduino project
3. Set build options correctly

### How do I change the PID parameters?

In the `config.h` file:

```cpp
#define KP 2.0   // Ganancia proporcional
#define KI 0.5   // Ganancia integral
#define KD 1.0   // Ganancia derivativa
```

Or via web interface in real time (Settings > Control).

### Is the data saved somewhere?

Yes, IncuNest stores data in:
- **SPIFFS**: Local configuration and logs
- **SD Card** (optional): Extended history
- **External server** (optional): Via MQTT

## Use and Maintenance

### How often should I calibrate the sensors?

| Calibration type | Frequency |
|---------------------|------------|
| Quick Check | Weekly |
| Complete calibration | Monthly |
| Certified calibration | Annual |

### How do I clean the incubator?

1. **Turn off** and disconnect the equipment
2. **Remove** removable components
3. **Clean** with approved disinfectant solution
4. **Dry** completely before use
5. **Verify** operation before clinical use

### What do I do if an alarm sounds?

1. **Identify** the type of alarm (see screen)
2. **Check** patient status
3. **Correct** the condition that caused the alarm
4. **Silence** the alarm once corrected
5. **Document** the incident

## Troubleshooting

### ESP32 does not turn on

1. Check the power supply
2. Check the voltage regulator
3. Check the power LED
4. Try another ESP32 board

### Temperature readings are incorrect

1. Check sensor connections
2. Run calibration
3. Replace the sensor if damaged
4. Check for electromagnetic interference

### I can't connect to WiFi

1. Confirm correct credentials
2. Verify that it is a 2.4GHz network
3. Move the device closer to the router
4. Restart the ESP32
5. Check the serial monitor for errors

### Temperature does not stabilize

1. Check thermal insulation
2. Adjust PID parameters
3. Check the heating element
4. Check for air leaks

## Contribution

### How can I contribute to the project?

See our full [Contribution Guide](./contributing). Ways to contribute:
- Report bugs
- Improve documentation
- Contribute code
- Design hardware improvements
- Translate to other languages

### Where can I ask questions?

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bugs and suggestions
- **Documentation**: Search here first

---

Didn't find your question? [Open an issue](https://github.com/medicalopenworld/IncuNest/issues/new) on GitHub.
