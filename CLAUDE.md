# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Drupal 11 starter project configured for Pantheon hosting with comprehensive development tooling. It includes:

- Drupal Recipes system for modular functionality
- Component-based architecture using Saplings theme system
- Comprehensive testing and code quality tools
- Both DDEV and Docksal local development support

## Development Commands

### Local Development Setup

**DDEV (Recommended):**
```bash
ddev init                    # Initialize local environment
ddev rebuild                 # Run composer install and refresh database
ddev refresh [env] -f        # Pull database from environment
ddev install-theme-tools     # Install theme development tools
ddev npm                     # Run npm commands in theme directory
```

**Docksal (Legacy):**
```bash
fin init                     # Initialize project from scratch
fin rebuild                  # Run composer install and refresh
fin refresh                  # Pull database from remote
fin npm                      # Run NPM from theme folder
```

### Code Quality and Testing

**Linting and Code Standards:**
```bash
# Run with composer (prefix with `ddev` or `fin composer`)
composer code-check          # Run all code quality checks
composer code-fix           # Fix all code style issues
composer phpstan            # Run static analysis
composer lint-php           # PHP syntax checking

# Individual tools
composer code-sniff-modules  # PHPcs on custom modules
composer code-sniff-themes   # PHPcs on custom themes
composer twig-lint          # Twig template linting
composer rector-modules     # Drupal deprecation analysis
```

**Testing:**
```bash
# Cypress E2E testing
ddev cypress open           # Open Cypress GUI
ddev cypress run            # Run tests headlessly
ddev cypress-users          # Create test users

# In Cypress directory
npm run report              # Run tests with reporting
npm run merge:reports       # Generate combined test reports
```

### Drupal Recipes

```bash
ddev recipe-apply <recipe-path>     # Apply a Drupal recipe
ddev recipe-unpack [package-name]   # Unpack recipe dependencies
```

## Architecture

### Theme System
- **Primary Theme:** `saplings_child` - Custom child theme based on `ui_suite_bootstrap`
- **Admin Theme:** `gin` - Modern admin interface
- **Pattern Library:** Uses UI Patterns for component-based development
- **Build Process:** Webpack-based compilation in theme directories

### Content Architecture
- **Saplings Component System:** Modular paragraph-based components for flexible page building
- **Content Types:** Page (`sa_page`) and Post (`sa_post`) with component fields
- **Media Management:** Structured media types with focal point support

### Custom Code Structure
- **Custom Modules:** `/web/modules/custom/` - Project-specific functionality
- **Custom Themes:** `/web/themes/custom/` - Project-specific theming
- **Recipes:** `/recipes/` - Drupal recipes for reusable functionality bundles

### Configuration Management
- **Config Directory:** `/config/` - Drupal configuration exports
- **Environment-Specific:** Uses settings.php includes for environment configuration
- **Pantheon Integration:** Automated config imports via workflows

## Important Patterns

### Recipe System
This project uses Drupal 11's recipe system extensively:
- Recipes are in `/recipes/` directory
- Each recipe includes `recipe.yml` with dependencies and config
- Use `ddev recipe-apply` to install recipes
- Custom recipes follow Saplings naming convention (`saplings-*`)

### Component Development
- Paragraph types prefixed with `sa_` (Saplings Architecture)
- Components use consistent field naming: `sa_header`, `sa_description`, `sa_background`, etc.
- UI Patterns for template organization in theme

### Code Organization
- Follow Drupal coding standards (enforced by PHPcs)
- Use dependency injection over static Drupal calls
- Namespace custom code appropriately
- Document complex logic with PHPDoc

## Development Environment Variables

Create `.env` file in project root for local development:
```
TERMINUS_MACHINE_TOKEN=your_pantheon_token
```

## Common Workflows

### Adding New Functionality
1. Consider if it should be a recipe in `/recipes/`
2. Use `composer require` for contrib modules
3. Run code quality checks before committing
4. Export configuration changes

### Theme Development
```bash
ddev install-theme-tools     # Install build dependencies
ddev npm run build           # Build assets
ddev npm run watch           # Watch for changes
```

### Deployment Process
1. All deployments go through CircleCI
2. Pull requests create MultiDev environments
3. Merges to `main` deploy to Pantheon dev
4. Manual promotion to test/live environments

## Testing Requirements

Before committing code, ensure:
1. `composer code-check` passes (includes PHPStan, Rector, and coding standards)
2. `composer phpstan` shows no errors  
3. Cypress tests pass if modifying functionality (`ddev cypress run`)
4. Configuration exports are clean (`drush config:export`)
5. Theme builds complete without errors (`ddev npm run build`)

## Development Workflow

### Making Code Changes
1. Create feature branch from `main`
2. Run `ddev rebuild` to ensure clean environment
3. Make your changes
4. Test locally with appropriate commands above
5. Export any configuration changes
6. Commit and push (triggers MultiDev environment on Pantheon)

### Working with Custom Modules/Themes
- Custom modules: `/web/modules/custom/`
- Custom themes: `/web/themes/custom/arbor/` and `/web/themes/custom/saplings_child/`
- Always run code quality checks before committing

## Pantheon-Specific Notes

- Uses `pantheon.yml` for platform configuration
- Custom workflows for automated config imports
- Protected paths configured for security
- PHP 8.3 and MySQL 10.6 runtime