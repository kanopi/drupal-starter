# [Drupal Starter](https://example.com/)
This is the Drupal Composer Project with docksal configuration to easily get a
site started.

Features:

- Configured for Pantheon hosting
- Unopinionated Modern Drupal Installation
- Composer Installation
- Docksal Local Development Configuration
- CircleCI Deployment and Testing configuration

Please make this README as project specific as possible. Delete the things that
are not relevant or add new sections as needed.


## Project specific notes

Are there any projects specific quirks or setup that should be noted?


## Important links

Please put links to the important places here.
Imagine you know nothing about the project.

* [Local URL]()
* [Project URL]()
* [GitHub Repo]()
* [GitHub Team]()
* [Pantheon Dev]()
* [Pantheon Dashboard]()
* [CircleCI]()
* [Teamwork]()


## Additional Documentation

- [Installation](docs/INSTALLATION.md) - for step by step instructions on
setting this repository up for the first time.
- [Developer Setup Instructions](docs/DEVELOP.md) - Developers start here to get
 setup.
- [About](docs/ABOUT.md) - for details on how this repository is set up and the
reasoning behind it.
- [Testing](docs/TESTING.md) - Details about all the testing available in this
project.
- [Creating Default Content](docs/DEFAULT_CONTENT.md) - Instructions on how to
use the Default Content module to create default content for a recipe.


## Theme Commands and Setup Documentation
- [Saplings Child](docs/SAPLINGS_THEME.md) - Current theme based on
ui_suite_bootstrap
- [Emulsify](docs/EMULSIFY.md) - kanopi/kdcl_basic theme was built from
Emulsify. Currently not used in new projects.

## Local Development with DDEV

### Prerequisites

If you don't have DDEV installed:

1. [Install DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)
2. Ensure you have a compatible Docker provider such as Docker Desktop,
   OrbStack, or Lima:
   [Docker Installation](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/)
3. **Important:** Turn off Docksal or Lando before starting DDEV to avoid port
   conflicts.

### Configure Pantheon Access

Generate a [Pantheon Machine Token](https://pantheon.io/docs/machine-tokens/)
and add it to your global DDEV config:

```shell
ddev config global --web-environment-add=TERMINUS_MACHINE_TOKEN=your_token_here
```

### Setup Instructions

After cloning this repository, configure DDEV for the project:

1. **Configure DDEV:**
   ```shell
   ddev config --project-type=drupal11 --docroot=web --database=mariadb:10.6
   ddev start
   ```

2. **Install the Kanopi DDEV add-on:**
   ```shell
   ddev add-on get kanopi/ddev-kanopi-drupal
   ```

3. **Configure the add-on:**
   ```shell
   ddev project-configure
   ```

4. **Initialize your environment:**
   ```shell
   ddev project-init
   ```

## DDEV Commands

This project uses the [kanopi/ddev-kanopi-drupal](https://github.com/kanopi/ddev-kanopi-drupal) add-on which provides 27+ custom commands for Drupal development.

For a complete command reference, see the [add-on documentation](https://kanopi.github.io/ddev-kanopi-drupal/commands/).

### Common Commands

| Command | Description |
|---------|-------------|
| `ddev project-init` | Initialize environment with dependencies and database |
| `ddev db-refresh [env] [-f]` | Pull database from Pantheon environment |
| `ddev drupal-open` | Open the site in your browser |
| `ddev drupal-uli` | Generate a one-time login link |
| `ddev theme-install` | Set up theme development tools |
| `ddev theme-watch` | Watch theme files for changes |
| `ddev recipe-apply <path>` | Apply a Drupal recipe |
| `ddev cypress-run` | Run Cypress E2E tests |


## Composer Commands

The following commands are available with Composer and should be prefixed with
the command `ddev composer`.

| Command               | Description                                                        |
|-----------------------|--------------------------------------------------------------------|
| `lint-php`            | Analyzes custom modules for programmatic and stylistic errors.     |
| `code-sniff-modules`  | Runs PHPcs on the custom modules folder.                           |
| `code-sniff-themes`   | Runs PHPcs on the custom themes folder.                            |
| `code-sniff`          | Runs `code-sniff-modules` and `code-sniff-themes`.                 |
| `code-fix-modules`    | Runs PHPcbf on the custom modules folder.                          |
| `code-fix-themes`     | Runs PHPcbf on the custom themes folder.                           |
| `code-fix`            | Runs `code-fix-modules` `code-fix-themes` `rector-fix` `lint-php`. |
| `phpstan`             | PHPStan finds errors in custom modules and themes.                 |
| `rector-modules`      | Dry run of finding deprecations in custom modules.                 |
| `rector-themes`       | Dry run of finding deprecations in custom themes.                  |
| `rector-fix-modules`  | Refactors deprecations on the custom modules folder.               |
| `rector-fix-themes`   | Refactors deprecations on the custom themes folder.                |
| `rector-fix`          | Runs `rector-fix-modules` and `rector-fix-themes`.                 |
| `twig-lint-modules`   | Runs Twig-CS-Fixer on the custom modules folder.                   |
| `twig-lint-themes`    | Runs Twig-CS-Fixer on the custom themes folder.                    |
| `twig-lint`           | Runs `twig-lint-modules` and `twig-lint-themes`.                   |
| `twig-fix-modules`    | Runs Twig-CS-Fixer with the fix option on custom modules.          |
| `twig-fix-themes`     | Runs Twig-CS-Fixer with the fix option on custom themes.           |
| `twig-fix`            | Runs `twig-fix-modules` and `twig-fix-themes`.                     |
| `code-check`          | Runs `phpstan` `rector-modules` `rector-themes` `code-sniff`.      |
| `prepare-for-pantheon`| Used by CircleCI for Pantheon.                                     |
| `build-assets`        | Used by CircleCI for Pantheon.                                     |
| `post-autoload-dump`  | Used by CircleCI for Pantheon.                                     |


## Deployments

### GitHub to Pantheon
Deployments to the dev Pantheon environment are managed through CircleCI.

Pull requests will build a MultiDev environment then update the PR with a
comment. We also have Lighthouse testing and other audits enabled.

Merges to `main` will merge and deploy the GitHub code to the Pantheon dev
environment.

### Pantheon dev to prod deployments
1. Go to the project dashboard on Pantheon.
1. Backup databases for Test and Dev.
    1. To accomplish this you can go to the backups tab and backup everything
    or go to Database/Files and under Export 'export the database'.
1. Go to the environment you want to deploy to and make note of the tickets
that are ready to deploy, document these in the deploy log message.
1. Once content has been deployed clone the Test database down to Dev.
1. Pull the database locally, make sure there are no config changes
that need to be committed to code.
If there are changes, commit those and deploy.
1. Tell the appropriate Slack channel that a deployment has taken place
and include which tickets were deployed.
