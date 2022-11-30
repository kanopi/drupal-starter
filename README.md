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

* Docksal
    * docksal.env
        * Update `hostingsite` to the machine name of the project in Pantheon
        * Update `THEME` to the name of the theme folder
        * `hostingenv` is set to `dev` to start but when you release the
        project to production it should be changed to `live`
        * Run `fin install-kdcl-basic` after you have set the
        theme name that you want.
    * settings.php
        * `.docksal/etc/conf/settings.php` is used for
        the local settings file for drupal.
    * vhost-overrides.conf
        * `.docksal/etc/nginx/vhost-overrides.conf`
        * Update the proxy url to use the pantheon machine name
         for the site you just created.
    * .pa11yci.js
        * Update the urls you would like to test in the array
        * Update README's pally section with the links to the correct urls.
* CircleCI
    * `config.yml`
        * Update the `TERMINUS_SITE` variable in line 2
        to your Pantheon machine name for the project.
        * Update the `THEME_NAME` variable in line 3
        to the folder name for your custom theme.
        * Update paths in JSON lock files in theme
        * If you would like Slack notifications when builds complete
        uncomment the slack portion.
        You will need to create a new CircleCI slack integration
        for the channel you want to post updates too & update the webhook URL.

* Run `fin init` to validate your local site.

* Run `fin drush cex -y`

* On a development branch, git add, commit and push all local changes.

* Create a PR in github.

* Circleci won't run this time because we haven't set it up yet.
We need to commit the project-specific circleci config.yml first so we can setup circleci later.

* Merge PR (now we have our project-specific circleci config
on the main branch so we can reference it from circleci).
Circleci job will still not happen.

#### Circleci project setup

* Go to
[circleci](https://app.circleci.com/projects/project-dashboard/github/kanopi/)

* Find your new project repo and click the "Set Up Project" button.

* Select the branch name option and select the main branch,
 and click on the "Lets go" button.

* Click on the gear for the project and click on the Advanced Settings tab.

* Enable "Only build pull request" and "Auto Cancel Builds" options.
[Update settings](https://user-images.githubusercontent.com/1062456/130299362-9c04c3e2-e59a-4e73-8dfa-816d8d5316f4.png)

#### Drupal setup

* Enable the following modules:
`fin drush en components emulsify_twig admin_toolbar twig_tweak redis pantheon_advanced_page_cache -y; fin drush then gin -y; fin drush config:set system.theme admin gin -y; fin drush rcrt 'adminstrator' 'Adminstrator' -y;`
* Set config export path in `settings.php` to `$settings['config_sync_directory'] = '../config/';`
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

Please put links to the important places here.
Imagine you know nothing about the project.

* [Pantheon Dashboard]()
* [CircleCI]()
* [Teamwork]()
* [Github Team]()

## Setup instructions

### Step #1: Docksal environment setup

**This is a one time setup.**

Follow [Docksal install instructions](https://docs.docksal.io/getting-started/setup/)

### Step #2: Project setup

1. Clone this repo into your Projects directory.
1. Change directory to the cloned folder.
1. Make your own version of the `docksal-local.env` file from the example
and add your `SECRET_TERMINUS_TOKEN` to the file.
    * You don't need to do this if you set your token globally in Docksal
1. Initialize the site with `fin init`
1. Once the site has been initialized you'll get a url
to go to in your browser to start dev'ing.


## Installing Modules

Modules are installed using composer.
The process for installing a module would be the following:

```
fin composer require [package]
```

The standard composer command is used but with the
Docksal specific command `fin` prepended to the beginning.

## Theme

The theme is based off the
[Kanopi Design Component Library](https://github.com/kanopi/kdcl_basic)
which uses Storybook and is originally forked from
[Emulsify DS](https://github.com/emulsify-ds/emulsify-drupal).

The theme included is located within `docroot/sites/themes/custom/THEME`.

The Storybook Design System published to the `gh-pages` branch and is available
at https://kanopi.github.io/REPO_NAME/

Locally, running `fin npm run storybook` or `fin npm run build` will build the
Storybook at http://storybook.${VIRTUAL_HOST}

The theme uses Webpack and NPM to manage packages and run scripts.

- @TODO
[Hot Reloading in Drupal](https://docs.emulsify.info/usage/hot-reload-drupal)

#### Storybook

- Theme development run `fin npm run develop`. This will watch for twig, js,
 and sass changes within the components directory.
- The development storybook URL http://storybook.${VIRTUAL_HOST}

#### Storybook Webpack
For webpack storybook to work within a docksal container we needed
to set `watchOptions` in `docroot/themes/custom/THEME/.storybook/webpack.config.js`
```
config.watchOptions = {
  aggregateTimeout: 200,
  poll: 1000,
}
```

### Theme Commands

The following commands are available with Node and should be prefixed with the
command `fin npm run`.

Command | Description
--------|------------
`commit`| git-cz
`lint`| Lint JS
`a11y`| Run a11y on theme
`storybook`| Start storybook
`build-storybook`| Build static storybook
`deploy-storybook`| Generate storybook for github pages
`webpack`| Run webpack
`build`| Build storybook
`develop`| Run storybook and webpack at the same time
`test`| Run tests
`twatch`| Watch tests run
`coverage`| Check test coverage
`format`| Clean up code format
`lint-staged`| lint-staged
`postinstall`| Patches packages
`criticalcss`| Compile critical CSS assets

## Docksal Commands

The following commands are available with Docksal
and should be prefixed with the command `fin`

Command | Description
--------|------------
`composer` | Composer wrapper that executes within the CLI container
`init` | Init Command that starts the project from scratch.
`init-site` | Init Site Command that runs the site install
and/or then runs the refresh command
`npm` | NPM wrapper
`npx` | NPX wrapper
`refresh` | Will execute a drush sql-dump from the remote server.
`share` | Opens a proxy server to your local computer using ngrok.io.
Share in real time, or test locally.
`rename-kdcl-basic` | Renames the folder in `web/themes/custom`
to match the `THEME` environment variable. **DELETE AFTER SETUP**

## Composer Commands

The following commands are available with Composer and
should be prefixed with the command `fin composer`

Command | Description
--------|------------
`lint-php` | Analyzes the custom modules folder for programmatic
and stylistic errors
`code-sniff-modules` | Runs PHPcs on the custom modules folder
`code-sniff-themes` | Runs PHPcs on the custom themes folder
`code-sniff` | Runs `code-sniff-modules` and `code-sniff-themes`
`code-fix-modules` | Runs PHPcbf on the custom modules folder
`code-fix-themes` | Runs PHPcbf on the custom themes folder
`code-fix` | Runs `code-fix-modules` `code-fix-themes` `rector-fix` `lint-php`
`phpstan` | PHPStan focuses on finding errors in the custom modules and
 themes folders without actually running it.
`rector-modules` | Dry run on the custom modules folder of
automates that checks for deprecations
`rector-themes` | Dry run on the custom themes folder of
automates that checks for deprecations
`rector-fix-modules` | Automates the refactoring of deprecations
 on the custom modules folder
`rector-fix-themes` | Automates the refactoring of deprecations
 on the custom themes folder
`rector-fix` | Runs `rector-fix-modules` and `rector-fix-themes`
`code-check` | Runs `phpstan` `rector-modules` `rector-themes` `code-sniff`
`prepare-for-pantheon` | Used by CircleCI for Pantheon
`build-assets` | Used by CircleCI for Pantheon
`post-autoload-dump` | Used by CircleCI for Pantheon


### Pa11y Audits

We have a Docksal command that will run
[pa11y-ci](https://github.com/pa11y/pa11y-ci)
audits `fin pa11y`. When the command finishes the reports
are available at the following url pa11y.$VIRTUAL_HOST

If you want to change the configuration of the Pa11y tests you can edit the
[.pa11yci.js](/tests/pa11y/.pa11yci.js) file.

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
- Run `fin composer install`

## Project specific notes

Are there any projects specific quirks or setup that should be noted.

## Deployments

### Github to Pantheon
Deployments to the dev Pantheon environment is managed through Circle CI.

Pull requests will build a MultiDev environment
and update the PR with a comment.
We also have Lighthouse testing and other audits enabled.

Merges to `main` will merge Github to the Pantheon dev environment.
During development our databases are Test and Dev.
Once we have a launched product these will change to Live, Test and Dev.

### Pantheon dev to production
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
