# [Drupal Starter](https://example.com/)
This is the Drupal Composer Project with docksal configuration to easily get a site started.

Features:

- Drupal 9 - Composer Install
- Docksal Configuration
- Basic CircleCI configuration
- Project Readme

Please make this README as project specific as possible. Delete the things that are not relevant or add new sections as needed.

### Pantheon setup

#### Create the project in pantheon

Create a new drupal **8** project. This is because the Drupal 9 integrated composer flow is a little janky.
![Create a new drupal 8 project](/docs/pantheon-1.png)
Create a minimal site install
![Create a minimal site install](/docs/pantheon-2.png)
Set the basic details for the site
![Set the basic details for the site](/docs/pantheon-3.png)
Add Redis to the project
![Add redis to the project](/docs/pantheon-4.png)

#### Update the files to be project specific

Delete the existing `.circleci` and `.docksal` folders. Then rename the `.circleci-pantheon` and `.docksal-pantheon` to `.circleci` and `.docksal`

* Custom theme
    * Update the name of the theme folder to be project specific. `web/themes/custom/site_theme`
* Docksal
    * docksal.env
        * Update `hostingsite` to the machine name of the project in pantheon
        * Update `THEME` to the name of the theme folder
        * `hostingenv` is set to `dev` to start but when you release the project to production it should be changed to `live`
    * settings.php
        * `.docksal/etc/conf/settings.php` is used for the local settings file for drupal.
        * update `trusted_host_patterns` to match the **repo** name as that is what most likely the virtual host will be.
* Drupal
    * Once you have downloaded the DB and are working locally, enabled the redis module.  Then uncomment the redis config in `web/sites/default/settings.php`

* CircleCI
    * `config.yml`
        * update the `TERMINUS_SITE` variable in line 2 to your pantheon machine name for the project.
        * update the `THEME_NAME` variable in line 3 to the folder name for your custom theme.


## Important links

Please put links to the important places here.  Imagine you know nothing about the project

* Hosting platform dashboard for the project.
* Production URL
* Maybe dev/stage/test environments
* Links to documentation for any 3rd party services used.


## Setup instructions

### Step #1: Docksal environment setup

**This is a one time setup - skip this if you already have a working Docksal environment.**

Follow [Docksal install instructions](https://docs.docksal.io/getting-started/setup/)

### Step #2: Project setup

1. Clone this repo into your Projects directory

    ```
    git clone https://github.com/kanopi/drupal-starter.git drupal-starter
    cd drupal-starter
    ```

2. Initialize the site

    This will initialize local settings and install the site via drush

    ```
    fin init
    ```

3. **On Windows** add `fin hosts add` to your hosts file

4. Point your browser to

    ```
    http://drupal-starter.docksal
    ```

When the automated install is complete the command line output will display the admin username and password.

## Easier setup with `fin init`

Site provisioning can be automated using `fin init`, which calls the shell script in [.docksal/commands/init](.docksal-old/commands/init).
This script is meant to be modified per project. The one in this repo will give you a good example of advanced init script.

Some common tasks that can be handled by the init script:

- initialize local settings files for Docker Compose, Drupal, Behat, etc.
- import DB or perform a site install
- compile Sass
- run DB updates, revert features, clear caches, etc.
- enable/disable modules, update variables values

## Installing Modules

Modules are installed using composer. The process for installing a module would be the following:

```
fin composer require [package]
```

The standard composer command is used but with the Docksal specific command `fin` prepended to the beginning.

## Theme

The theme is based off of the Zurb Foundation framework. Gulp is installed and is helping with the compilation of the
sass to css. Additionally it is also helping with the minification of the javascript and css to make the code as minimal
as possible.

The theme included is located within `web/sites/themes/custom/site_theme`.

You should clone that, rename, and update the names in the file names and in the files.

### Gulp Commands

The following gulp tasks are available:

Command | Description
--------|------------
`sass` | One time compiles sass to css
`watch` | Watches for changes with in the sass and lib folders and then runs the compilation and uglification
`uglify` | Compresses all javascript files within the lib folder and minifies the code. The output is added to the js folder.
`imagemin` | Compresses the images within the image folder
`build` | Runs `sass` and `uglify`.  Used in the CircleCI automation

## Docksal Commands

The following commands are available with Docksal and should be prefixed with the command `fin`

Command | Description
--------|------------
`composer` | Composer wrapper that executes within the CLI container
`drupal-cli` | Drupali CLI wrapper
`gulp` | Gulp Wrapper that runs within the theme web/themes/custom/site_theme
`init` | Init Command that starts the project from scratch.
`init-site` | Init Site Command that runs the site install and/or then runs the refresh command
`npm` | NPM wrapper
`refresh` | Will execute a drush sql-dump from the remote server. **NOT SET UP CURRENTLY**
`site-build` | Will run all of the necessary steps for `npm install` and `gulp sass`
`test` | Test to confirm the site is running
`share` | Opens a proxy server to your local computer using ngrok.io. Share in real time, or test locally.

## Project specific notes

Are there any projects specific quirks or setup that should be noted.
