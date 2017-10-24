# Drupal 8 Composer ❤'s️ Docksal Edition

This is a Drupal Composer Project with Docksal configuration to easily get a site started.

## tl;dr
Quickly setup your site without the pontification? Click [here](#cut-to-the-chase).

Features:

- [Drupal Composer](https://github.com/drupal-composer/drupal-project)
- [Docksal](https://github.com/docksal/docksal) 
    - Containerized site instantiation via CLI: `fin init`
    - [Docker](https://www.docker.com/) volumes allow File IO for native asset manipulation with no local device pollution.

## Setup instructions

### Step #1: Docksal environment setup

**ONE TIME INSTALLATION - Skip if you have a functional Docksal environment.**  

Follow [Docksal Environment Setup Instructions](http://docksal.readthedocs.io/en/master/getting-started/env-setup)

<a name="cut-to-the-chase"></a>
### Step #2: Project setup

1. Clone this repo into your Projects directory

    ```
    git clone https://github.com/kanopi/drupal8-composer-docksal.git drupal8
    cd drupal8
    ```

2. Initialize the site

    This will initialize local settings and install the site via drush

    ```
    fin init
    ```

3. **On Windows** add `192.168.64.100  drupal8.docksal` to your hosts file

4. Point your browser to

    ```
    http://drupal8.docksal
    ```

When the automated install is complete the command line output will display the admin username and password.

## Automate more with 'fin init'

Site provisioning can be automated using `fin init`, which calls the shell script in [.docksal/commands/init](.docksal/commands/init).  
This script is meant to be modified per project. The one in this repo will give you a good example of an advanced init script.

Common tasks that can be handled by the init script include:

- compile Sass
- run PHPCS (a PHP Code Sniffer on a given path)
- initialize local settings files for Docker Compose, Drupal, Behat, etc.
- import DB or perform a site install
- run DB updates, revert features, clear caches, etc.
- enable/disable modules, update variables values

## Vanilla LAMP Stack Details

This Docksal setup (found in [.docksal/docksal.env][.docksal/docksal.env]) defaults with the following LAMP Stack represented in Docker Images:
- PHP 7
- MySQL 5.6
- Apache 2.4
