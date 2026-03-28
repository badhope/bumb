<div align="center">

# 🌋 NuclearSim Pro

### Professional Nuclear Weapon Effects Simulator

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/badhope/bumb)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/badhope/bumb)
[![Electron](https://img.shields.io/badge/Electron-28.2.0-9FEAF9.svg)](https://www.electronjs.org/)

<img src="https://img.shields.io/badge/-Nuclear%20Effects%20Simulation-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/-Global%20Nuclear%20War%20Simulation-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/-Educational%20Research%20Tool-blue?style=for-the-badge" />

</div>

---

## 📖 Overview

**NuclearSim Pro** is a professional-grade nuclear weapon effects simulation software built with Electron. Through precise physical models and intuitive visualization interfaces, it helps users understand the destructive effects of nuclear weapons, offering significant educational and research value.

### 🎯 Core Features

- **🔬 Accurate Physics Simulation** - Calculate explosion effects based on real nuclear physics formulas
- **🌍 Global Nuclear War Simulation** - Simulate nuclear war scenarios on a global scale
- **📍 Interactive Maps** - Support for multiple map sources including offline functionality
- **💥 Real-time Explosion Animations** - 3D explosion effects and shockwave visualization
- **📊 Detailed Data Analysis** - Casualty estimation, economic impact, environmental impact analysis
- **🎓 Educational Modules** - Nuclear weapon knowledge and interactive tutorials

---

## ✨ Feature Highlights

### 🎮 Core Simulation Features

| Feature Module | Description |
|---------------|-------------|
| **Single Nuclear Explosion Simulation** | Select any location for nuclear explosion effects simulation |
| **Global Nuclear War Simulation** | Simulate full-scale nuclear war between nations |
| **Multiple Weapon Types** | Includes historical and modern nuclear weapon data |
| **Custom Yield** | Support for 0.01kt-100000kt range adjustment |
| **Detonation Methods** | Ground burst, air burst, high-altitude burst |

### 📊 Analysis Features

- **Casualty Estimation** - Death toll and injury statistics
- **Economic Impact** - GDP loss, infrastructure damage assessment
- **Environmental Impact** - Radiation spread, nuclear winter effects
- **Health Impact** - Acute radiation syndrome, long-term cancer risks
- **Recovery Time** - Regional recovery estimation

### 🗺️ Map Features

- **Multiple Map Sources**
  - Gaode Maps (Standard/Satellite)
  - GeoQ (Color/Dark versions)
  - OpenStreetMap
  - CartoDB (Dark/Light)
  - Esri (Satellite/Street)
  - Stamen Terrain

- **Offline Maps** - Download regions for use without network
- **City Markers** - Global major city data
- **Military Bases** - Global nuclear facility markers

### 💥 Visualization Effects

- Fireball animation
- Shockwave expansion
- Mushroom cloud effects
- Impact range circles
- Missile trajectory animation

---

## 🚀 Quick Start

### System Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Memory**: 4GB RAM (8GB+ recommended)
- **Storage**: 500MB available space
- **Network**: Required for initial map download

### Installation

#### Option 1: Download Installer (Recommended)

Visit the [Releases](https://github.com/badhope/bumb/releases) page to download the installer for your platform:

- Windows: `NuclearSim-Pro-3.0.0-x64.exe`
- macOS: `NuclearSim-Pro-3.0.0.dmg`
- Linux: `NuclearSim-Pro-3.0.0-x64.AppImage`

#### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/badhope/bumb.git
cd bumb/nuclearsim-pro

# Install dependencies
npm install

# Run development version
npm start

# Build production version
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```

---

## 📚 User Guide

### Basic Operations

1. **Select Target Location**
   - Click on the map to select target
   - Or select from city dropdown menu
   - Or use search function to locate

2. **Configure Weapon Parameters**
   - Select preset weapon type
   - Or customize yield size
   - Select detonation method

3. **Run Simulation**
   - Click "Start Simulation" button
   - View explosion animation effects
   - Analyze detailed result data

### Global Nuclear War Simulation

1. Switch to "Global War" module
2. Select attacker and defender nations
3. Configure strike strategy and weapon count
4. Watch real-time simulation animation

### Offline Map Download

1. Go to Settings panel
2. Select download region and zoom levels
3. Click "Download Offline Map"
4. Wait for download to complete

---

## 🛠️ Technical Architecture

### Tech Stack

```
┌─────────────────────────────────────────┐
│              NuclearSim Pro              │
├─────────────────────────────────────────┤
│  Frontend                                │
│  ├── HTML5 / CSS3 / JavaScript          │
│  ├── Leaflet.js (Map Engine)            │
│  ├── ECharts (Data Visualization)       │
│  └── Three.js (3D Rendering)            │
├─────────────────────────────────────────┤
│  Backend                                 │
│  ├── Electron 28.2.0                    │
│  ├── SQL.js (Local Database)            │
│  └── Node.js APIs                       │
├─────────────────────────────────────────┤
│  Build Tools                             │
│  ├── electron-builder                   │
│  └── npm                                │
└─────────────────────────────────────────┘
```

### Project Structure

```
nuclearsim-pro/
├── electron/                 # Electron main process
│   ├── main.js              # Main process entry
│   └── preload.js           # Preload script
├── src/
│   ├── modules/             # Feature modules
│   │   ├── education/       # Education system
│   │   ├── events/          # Event system
│   │   └── visualization/   # Visualization module
│   └── renderer/            # Renderer process
│       ├── data/            # Data files
│       ├── scripts/         # JavaScript scripts
│       ├── styles/          # Style files
│       └── *.html           # Page files
├── assets/                  # Resource files
├── package.json             # Project configuration
└── README.md               # Documentation
```

---

## 📊 Physics Models

### Explosion Effect Calculation Formulas

| Effect Type | Formula | Description |
|------------|---------|-------------|
| Fireball Radius | R = 0.145 × W^0.4 | W is yield (kt) |
| Heavy Damage | R = 0.28 × W^0.333 | 20 psi overpressure |
| Moderate Damage | R = 0.55 × W^0.333 | 5 psi overpressure |
| Light Damage | R = 1.0 × W^0.333 | 2 psi overpressure |
| Thermal Radiation | R = 1.9 × W^0.4 | Third-degree burns |

### Casualty Estimation Model

Based on factors such as population density, building type, and protection level, using a multi-parameter model for estimation:

```
Casualty Rate = f(distance, yield, population density, building type, burst type, time factors)
```

---

## 🎓 Educational Value

### Use Cases

- **University Teaching** - Physics, international relations, military science courses
- **Science Education** - Nuclear weapon knowledge popularization
- **Policy Research** - Nuclear deterrence, nuclear disarmament studies
- **Emergency Training** - Nuclear accident emergency response training

### Learning Modules

1. **Nuclear Weapon Basics** - Principles, structure, classification
2. **Explosion Effects** - Shockwave, thermal radiation, nuclear radiation
3. **Historical Events** - Hiroshima, Nagasaki case studies
4. **Protection Knowledge** - Nuclear explosion protection measures

---

## 🤝 Contributing

We welcome all forms of contributions!

### Ways to Contribute

1. **Report Issues** - Submit bug reports or feature suggestions
2. **Code Contributions** - Submit Pull Requests
3. **Documentation** - Improve documentation and translations
4. **Spread the Word** - Recommend this project to others

### Development Guide

```bash
# Fork this repository
# Clone your fork
git clone https://github.com/your-username/bumb.git

# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m 'Add new feature'

# Push to branch
git push origin feature/new-feature

# Create Pull Request
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2026 NuclearSim Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ⚠️ Disclaimer

**This software is for educational, research, and academic purposes only.**

- All simulation results are based on theoretical models; actual situations may vary
- This software does not encourage or support any form of nuclear weapon use
- Users assume all risks associated with using this software
- Developers are not responsible for any consequences resulting from the use of this software

---

## 📞 Contact Us

- **GitHub**: [https://github.com/badhope/bumb](https://github.com/badhope/bumb)
- **Issue Tracker**: [Issues](https://github.com/badhope/bumb/issues)
- **Discussions**: [Discussions](https://github.com/badhope/bumb/discussions)

---

## 🌟 Acknowledgments

Thanks to the following open-source projects for their support:

- [Electron](https://www.electronjs.org/)
- [Leaflet](https://leafletjs.com/)
- [ECharts](https://echarts.apache.org/)
- [Three.js](https://threejs.org/)

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/bumb&type=Date)](https://star-history.com/#badhope/bumb&Date)

**Made with ❤️ by NuclearSim Team**

</div>
