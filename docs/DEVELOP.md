# Developer Instructions.

## Step #1: DDEV environment setup

If you don't have Docker Desktop and DDEV set up, complete this step.

**This is a one time setup.**

Follow [DDEV install instructions](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)

### Configure Pantheon Access

Generate a [Pantheon Machine Token](https://pantheon.io/docs/machine-tokens/)
and add it to your global DDEV config:

```bash
ddev config global --web-environment-add=TERMINUS_MACHINE_TOKEN=your_token_here
```

## Step #2: Project setup

1. Clone this repo into your Projects directory.
1. Change directory to the cloned folder.
1. Configure DDEV:
   ```bash
   ddev config --project-type=drupal11 --docroot=web --database=mariadb:10.6
   ddev start
   ```
1. Install the Kanopi DDEV add-on:
   ```bash
   ddev add-on get kanopi/ddev-kanopi-drupal
   ```
1. Configure the add-on (it will prompt for project settings):
   ```bash
   ddev project-configure
   ```
1. Initialize the site:
   ```bash
   ddev project-init
   ```
1. Once the site has been initialized you'll get a URL
to go to in your browser to start developing.


## Installing Modules

Modules are installed using composer.
The process for installing a module would be the following:

```bash
ddev composer require [organization]/[package]
```

The standard composer command is used but with the DDEV specific command
`ddev` prepended to the beginning.
