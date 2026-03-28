# Changelog

All notable changes to NuclearSim Pro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-03-28

### Added

#### New Features
- **Global Nuclear War Simulation** - Simulate full-scale nuclear war between nations
  - Select attacker and defender countries
  - Configure strike strategies (counterforce, countervalue, mixed)
  - Real-time missile trajectory animation
  - Comprehensive damage assessment

- **Offline Map Support** - Download maps for offline use
  - Region-based download (China, Asia, Europe, Americas, World)
  - Zoom level selection (1-5, 1-10, 1-15)
  - IndexedDB storage for map tiles
  - Cache size management

- **Multiple Map Sources** - New map providers
  - CartoDB (Dark/Light themes)
  - Esri (Satellite/Street)
  - Stamen Terrain
  - OpenStreetMap

- **Explosion Animation Effects** - Visual feedback for nuclear explosions
  - Fireball animation
  - Shockwave expansion
  - Mushroom cloud effects
  - Impact range circles

- **Enhanced Visualization**
  - 3D explosion effects using Three.js
  - CSS animations for explosions
  - Missile trajectory visualization
  - Arsenal markers on map

#### Improvements
- Improved map loading speed with tile caching
- Better city data organization by continent
- Enhanced UI with new icons and markers
- Optimized database operations
- Better error handling throughout the application

### Changed
- Restructured map layer management
- Improved physics calculation accuracy
- Enhanced casualty estimation models
- Updated UI/UX for better usability

### Fixed
- Map dragging and interaction issues
- Chart rendering errors
- City selection dropdown population
- Military base toggle functionality
- Coordinate display updates
- Various UI responsiveness issues

## [2.0.0] - 2025-12-15

### Added
- Interactive map with Leaflet.js integration
- Multiple weapon presets (Little Boy, Fat Man, W87, etc.)
- Custom yield input (0.01kt - 100000kt)
- Burst height selection (ground, air, high-altitude)
- Population density adjustment
- Time of day factor for casualty estimation

- **Analysis Features**
  - Casualty estimation
  - Economic impact assessment
  - Infrastructure damage analysis
  - Environmental impact calculation
  - Health impact analysis
  - Recovery time estimation

- **Educational Content**
  - Historical nuclear events (Hiroshima, Nagasaki)
  - Interactive tutorials
  - Knowledge articles
  - Quiz system (framework)

- **Data Management**
  - Simulation history
  - Export/Import JSON data
  - PDF report generation
  - Image export

### Changed
- Migrated to Electron 28
- Updated to modern JavaScript (ES6+)
- Improved database schema
- Enhanced security with context isolation

## [1.0.0] - 2025-06-01

### Added
- Initial release
- Basic nuclear explosion simulation
- Simple map interface
- Casualty estimation
- Basic UI with dark theme
- Cross-platform support (Windows, macOS, Linux)

---

## Version History Summary

| Version | Release Date | Major Changes |
|---------|--------------|---------------|
| 3.0.0 | 2026-03-28 | Global war simulation, offline maps, explosion effects |
| 2.0.0 | 2025-12-15 | Interactive map, analysis features, educational content |
| 1.0.0 | 2025-06-01 | Initial release |

---

## Upcoming Features

### Planned for v3.1.0
- [ ] Nuclear winter simulation
- [ ] Fallout pattern prediction
- [ ] More detailed weapon types
- [ ] Multi-language support
- [ ] Cloud sync for simulations

### Planned for v3.2.0
- [ ] VR/AR visualization support
- [ ] Real-time weather integration
- [ ] Collaborative simulation mode
- [ ] Advanced reporting tools

---

## Migration Guides

### Upgrading from 2.x to 3.0

1. **Database Migration**
   - Your simulation history will be preserved
   - New fields will be added automatically

2. **Settings Reset**
   - Map preferences may need to be reconfigured
   - Offline maps need to be re-downloaded

3. **New Dependencies**
   - Run `npm install` to get new packages
   - Three.js is now required for 3D effects

---

For more details about each release, see the [GitHub Releases](https://github.com/badhope/bumb/releases) page.
