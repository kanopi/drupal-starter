# [Drupal Starter](https://example.com/)
This is the Drupal Composer Project with docksal configuration to easily get a site started.

Features:

- Drupal 9 - Composer Install
- Docksal Configuration
- Basic CircleCI configuration
- Project Readme

Please make this README as project specific as possible. Delete the things that are not relevant or add new sections as needed.

### Pantheon setup

This repo is Pantheon specific at the moment

#### Create the project in Pantheon

* Create a new drupal **8** project. This is because the Drupal 9 integrated composer flow is a little janky.
![Create a new drupal 8 project](https://user-images.githubusercontent.com/1062456/130299366-ad0699bd-3dc6-4148-9d8e-a8901e26bcce.png)

* Create a minimal site install
![Create a minimal site install](https://user-images.githubusercontent.com/1062456/130299368-effbdab3-87ec-435b-812a-cb5d50b1c430.png)

* Set the basic details for the site
![Set the basic details for the site](https://user-images.githubusercontent.com/1062456/130299369-e102b080-f94b-45ce-a706-08392e075c1a.png)

* Add Redis to the project
![Add redis to the project](https://user-images.githubusercontent.com/1062456/130299370-1e5564db-73dc-4ade-b086-5b7af27d7608.png)

* Go to the Pantheon dashboard for your project.

* Click on the Team tab.

* Click on Add organization

* Search for Kanopi Studios (Important: enter the full term (Kanopi Studios) to find this - if you just enter Kanopi, you will end up with the wrong group and things will not work).

* Select and add Kanopi Studios.


#### Create project's Github repo
* Go to [https://github.com/kanopi/drupal-starter](https://github.com/kanopi/drupal-starter)

* Click on "Use this template" button.

* Make the owner Kanopi and the repo private, then click "Create repository from template"

* In the new repo, click on Settings and then the Manage Access tab.

* Click on "Invite teams or people" button.

* Search for and add Kanopi Studios and grant them Read access.

* Click on "Add kanopicode to this repository"

* Still in Settings, click on the Branches tab.

* Click on Add Rule.

* Make Branch name pattern match your default branch (e.g., main).

* Select "Require pull request reviews before merging"

* Click Create button

#### Update the files to be project specific

* Clone the new repo to your local.

* Create a development branch.

* Make the project specific changes listed below.

* Custom theme
    * Update the name of the theme folder to be project specific. `web/themes/custom/site_theme`

* Docksal
    * docksal.env
        * Update `hostingsite` to the machine name of the project in Pantheon
        * Update `THEME` to the name of the theme folder
        * `hostingenv` is set to `dev` to start but when you release the project to production it should be changed to `live`
    * settings.php
        * `.docksal/etc/conf/settings.php` is used for the local settings file for drupal.
        * update `trusted_host_patterns` to match the **repo** name as that is what most likely the virtual host will be. this is so drupal doesn't reject request to the docksal site
    * vhost-overrides.conf
        * `.docksal/etc/nginx/vhost-overrides.conf`
        * Update the proxy url to use the pantheon machine name for the site you just created.
    * .pa11yci.js
        * Update the urls you would like to test in the array
        * Make sure you update "YOUR-DOMAIN" to the docksal virtual host for the project.
        * Update this README's pally section with the links to the correct urls.
* CircleCI
    * `config.yml`
        * Update the `TERMINUS_SITE` variable in line 2 to your Pantheon machine name for the project.
        * Update the `THEME_NAME` variable in line 3 to the folder name for your custom theme.
        * Update `root: ./web/themes/custom/site_theme` to have the proper theme folder name
        * If you would like Slack notifications when builds complete uncomment the slack portion.  You will need to create a new CircleCI slack integration for the channel you want to post updates too and update the webhook URL.

* Run `fin init` to validate your local site.

* Run `fin drush cex -y`

* On a development branch, git add, commit and push all local changes.

* Create a PR in github.

* Circleci won't run this time because we haven't set it up yet. We need to commit the project-specific circleci config.yml first so we can setup circleci later.

* Merge PR (now we have our project-specific circleci config on the main branch so we can reference it from circleci). Circleci job will still not happen.

#### Circleci project setup

* Go to [circleci projects dashboard](https://app.circleci.com/projects/project-dashboard/github/kanopi/)

* Find your new project repo and click the "Set Up Project" button.

* Select the branch name option and select the main branch, and click on the "Lets go" button.

* Click on the gear for the project and click on the Advanced Settings tab.

* Enable "Only build pull request" and "Auto Cancel Builds" options. ![Update circleci settings](https://user-images.githubusercontent.com/1062456/130299362-9c04c3e2-e59a-4e73-8dfa-816d8d5316f4.png)

#### Redis setup

* Enable the redis module in your local site.

* Export config.

* On a development branch, git add, commit and push all local changes.

* Submit a PR on github.

* Validate circleci job and multidev.

* Merge PR.

* Validate circleci job and Dev site.

* In your local, checkout and pull main branch.

* Creat new development branch.

* Uncomment the redis config in `web/sites/default/settings.php`.

* Git add, commit and push the change.

* Submit a PR in the github repo.

* Validate circleci job and deployment to multidev.

* Merge the PR.

* Validate circleci job deployment and Pantheon Dev site.

## Important links

Please put links to the important places here.  Imagine you know nothing about the project.

* Hosting platform dashboard for the project.
* Production URL.
* Link to CircleCI project page.
* Maybe dev/stage/test environments.
* Links to documentation for any 3rd party services used.

## Setup instructions

### Step #1: Docksal environment setup

**This is a one time setup - skip this if you already have a working Docksal environment.**

Follow [Docksal install instructions](https://docs.docksal.io/getting-started/setup/)

### Step #2: Project setup

1. Clone this repo into your Projects directory.

    ```
    git clone https://github.com/kanopi/drupal-starter.git drupal-starter
    cd drupal-starter
    ```

2. Initialize Lefthook Git Hooks

[Lefthook](https://github.com/evilmartians/lefthook) is used for configuring commands to run using githooks

   ```
   lefthook install
   ```

To install Lefthook the following commands can be done.

  ```
  sudo curl -fsSL -o /usr/local/bin/lefthook https://github.com/evilmartians/lefthook/releases/download/v0.7.7/lefthook_0.7.7_MacOS_x86_64
  sudo chmod +x /usr/local/bin/lefthook
  ```

3. Initialize the site.

    This will initialize local settings and install the site via drush

    ```
    fin init
    ```

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
`pa11y` | Run the `pa11y` tests defined in `tests/pa11y/.pa11yci.js`

## Composer Commands

The following commands are available with Composer and should be prefixed with the command `fin composer`

Command | Description
--------|------------
`lint-php` | Analyzes the custom modules folder for programmatic and stylistic errors
`code-sniff-modules` | Runs PHPcs on the custom modules folder
`code-sniff-themes` | Runs PHPcs on the custom themes folder
`code-sniff` | Runs `code-sniff-modules` and `code-sniff-themes`
`code-fix-modules` | Runs PHPcbf on the custom modules folder
`code-fix-themes` | Runs PHPcbf on the custom themes folder
`code-fix` | Runs `code-fix-modules` `code-fix-themes` `rector-fix` `lint-php`
`phpstan` | PHPStan focuses on finding errors in the custom modules and themes folders without actually running it.
`rector-modules` | Dry run on the custom modules folder of automates that checks for deprecations
`rector-themes` | Dry run on the custom themes folder of automates that checks for deprecations
`rector-fix-modules` | Automates the refactoring of deprecations on the custom modules folder
`rector-fix-themes` | Automates the refactoring of deprecations on the custom themes folder
`rector-fix` | Runs `rector-fix-modules` and `rector-fix-themes`
`code-check` | Runs `phpstan` `rector-modules` `rector-themes` `code-sniff`
`prepare-for-pantheon` | Used by CircleCI for Pantheon
`build-assets` | Used by CircleCI for Pantheon
`post-autoload-dump` | Used by CircleCI for Pantheon


### Pa11y Audits

We have a Docksal command that will run [pa11y-ci](https://github.com/pa11y/pa11y-ci) audits `fin pa11y`. When the command finishes the reports are available at the following url [pa11y.explo.docksal](http://pa11y.explo.docksal/)

If you want to change the configuration of the Pa11y tests you can edit the [.pa11yci.js](/tests/pa11y/.pa11yci.js) file.

Note: This was cribbed from [Phase2](https://github.com/phase2/pa11y-dashboard)


### Robots.txt
#### To append to drupal default scaffolding robots.txt
- Navigate and open assets/custom-robots.txt
- Add appended robots.txt to file
- Run `fin composer install`
#### To completely overwrite robots.txt
- Open `composer.json`
- Change the following:
  ```
    "[web-root]/robots.txt": {
      "append": "assets/custom-robots.txt"
    },
  ```
- To:
  ```
  "[web-root]/robots.txt": "assets/custom-robots.txt",
  ```
- Run `fin composer.json`

## Project specific notes

Are there any projects specific quirks or setup that should be noted.
