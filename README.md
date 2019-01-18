# Drupal 8 Composer / Docksal Edition

This is the Drupal Composer Project with docksal configuration to easily get a site started.

Features:

- Drupal 8 - Composer Install
- Docksal Configuration
- Basic CircleCI configuration
- Project Readme

## Setup instructions

### Step #1: Docksal environment setup

**This is a one time setup - skip this if you already have a working Docksal environment.**  

Follow [Docksal install instructions](https://docs.docksal.io/getting-started/setup/)

### Step #2: Project setup

1. Clone this repo into your Projects directory

    ```
    git clone https://github.com/kanopi/starter-8.git drupal8
    cd drupal8
    ```

2. Initialize the site

    This will initialize local settings and install the site via drush

    ```
    fin init
    ```

3. **On Windows** add `fin hosts add` to your hosts file

4. Point your browser to

    ```
    http://drupal8.docksal
    ```

When the automated install is complete the command line output will display the admin username and password.

## Easier setup with 'fin init'

Site provisioning can be automated using `fin init`, which calls the shell script in [.docksal/commands/init](.docksal/commands/init).  
This script is meant to be modified per project. The one in this repo will give you a good example of advanced init script.

Some common tasks that can be handled by the init script:

- initialize local settings files for Docker Compose, Drupal, Behat, etc.
- import DB or perform a site install
- compile Sass
- run DB updates, revert features, clear caches, etc.
- enable/disable modules, update variables values
