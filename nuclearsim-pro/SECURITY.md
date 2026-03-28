# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |
| < 3.0   | :x:                |

## Reporting a Vulnerability

We take the security of NuclearSim Pro seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** (Preferred)
   - Go to [Security Advisories](https://github.com/badhope/bumb/security/advisories)
   - Click "Report a vulnerability"
   - Fill in the details

2. **Email** (Alternative)
   - Send details to the project maintainers via GitHub
   - Include "SECURITY" in the subject line

### What to Include

Please include the following information:

- Type of vulnerability (e.g., XSS, injection, etc.)
- Full paths of source file(s) related to the vulnerability
- The location of the affected source code (tag/branch/commit)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days (depending on severity)

### Disclosure Policy

- We follow responsible disclosure practices
- We ask that you give us a reasonable amount of time to fix the issue before public disclosure
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using NuclearSim Pro:

### For Users

1. **Download from Official Sources**
   - Only download from our official GitHub releases
   - Verify checksums when available

2. **Keep Updated**
   - Always use the latest version
   - Enable automatic updates if available

3. **Data Safety**
   - Be cautious when importing data from untrusted sources
   - Regularly backup your simulation data

### For Developers

1. **Code Review**
   - All code changes are reviewed before merging
   - Security-sensitive code requires additional review

2. **Dependencies**
   - We regularly update dependencies
   - We use `npm audit` to check for vulnerabilities

3. **Input Validation**
   - All user inputs are validated
   - File imports are sanitized

## Known Security Considerations

### Data Privacy

- NuclearSim Pro runs entirely on your local machine
- No data is sent to external servers
- Simulation results are stored locally in your user data directory

### Map Tiles

- Map tiles are loaded from third-party providers (Gaode, OpenStreetMap, etc.)
- These providers may have their own privacy policies
- Offline map tiles are stored locally using IndexedDB

### Third-Party Libraries

NuclearSim Pro uses several third-party libraries. We monitor these for security updates:

- Electron
- Leaflet.js
- ECharts
- Three.js
- SQL.js

## Security Updates

Security updates will be released as patch versions and announced via:

- GitHub Releases
- Security Advisories
- In-app notifications (for critical issues)

## Contact

For any security-related questions or concerns:

- GitHub Security: [Security Tab](https://github.com/badhope/bumb/security)
- Issues: [GitHub Issues](https://github.com/badhope/bumb/issues)

---

Thank you for helping keep NuclearSim Pro and its users safe! 🔒
