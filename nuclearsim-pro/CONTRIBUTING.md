# Contributing to NuclearSim Pro

First off, thank you for considering contributing to NuclearSim Pro! It's people like you that make NuclearSim Pro such a great tool.

## 📜 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots and animated GIFs if possible**
- **Include your system information** (OS, version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the coding standards
- Include tests for new features
- Update documentation for changed functionality

---

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Git

### Setup Steps

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/your-username/bumb.git
cd bumb/nuclearsim-pro

# Install dependencies
npm install

# Run the application in development mode
npm start

# Run with logging enabled
npm run dev
```

### Project Structure

```
nuclearsim-pro/
├── electron/           # Main process code
│   ├── main.js        # Application entry point
│   └── preload.js     # Preload scripts
├── src/
│   ├── modules/       # Feature modules
│   └── renderer/      # Renderer process (UI)
│       ├── data/      # Data files
│       ├── scripts/   # JavaScript files
│       ├── styles/    # CSS files
│       └── *.html     # HTML pages
└── assets/            # Static assets
```

---

## Coding Standards

### JavaScript

- Use ES6+ features where appropriate
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code style

### CSS

- Use CSS custom properties (variables) for colors and sizes
- Follow BEM naming convention for classes
- Keep selectors simple and maintainable

### HTML

- Use semantic HTML elements
- Ensure accessibility (ARIA labels, alt texts)
- Keep the structure clean and readable

### Example Code Style

```javascript
// Good
const calculateExplosionRadius = (yieldKt, type) => {
    const coefficient = EXPLOSION_COEFFICIENTS[type];
    return coefficient * Math.pow(yieldKt, 0.4);
};

// Avoid
const calc = (y, t) => c[t] * Math.pow(y, 0.4);
```

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat(map): add offline map download feature

- Add IndexedDB storage for map tiles
- Implement region-based download
- Add progress indicator

Closes #123
```

```
fix(simulation): correct fireball radius calculation

The formula was using wrong exponent for yield calculation.
Now using 0.4 instead of 0.333 for fireball radius.

Fixes #456
```

---

## Pull Request Process

1. **Create a branch** from `main` for your changes
2. **Make your changes** following the coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] Commit messages follow the guidelines
- [ ] PR title is clear and descriptive

### Review Process

1. A maintainer will review your PR
2. Feedback may be provided - please address it
3. Once approved, a maintainer will merge your PR

---

## Getting Help

- Open a [Discussion](https://github.com/badhope/bumb/discussions) for questions
- Check existing [Issues](https://github.com/badhope/bumb/issues) for similar problems

---

Thank you for contributing! 🎉
