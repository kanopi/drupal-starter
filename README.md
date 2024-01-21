# [Drupal Starter](https://example.com/)
This is the Drupal Composer Project with docksal configuration to easily get a
site started.

Features:

- Drupal 10 - Composer Install
- Docksal Configuration
- Basic CircleCI configuration
- Project Readme

## Additional Documentation

- [Installation](INSTALLATION.md) - for step by step instructions on setting
this repository up for the first time.
- [About](ABOUT.md) - for details on how this repository is set up and the
reasoning behind it.

Please make this README as project specific as possible. Delete the things that
are not relevant or add new sections as needed.

## Important links

Please put links to the important places here.
Imagine you know nothing about the project.

* [Pantheon Dashboard]()
* [CircleCI]()
* [Teamwork]()
* [Github Team]()

## Developer setup instructions

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
fin composer require [organization]/[package]
```

The standard composer command is used but with the
Docksal specific command `fin` prepended to the beginning.

## Theme Commands and Setup Documentation
- [Saplings Child](SAPLINGS_THEME.md) - Current theme based on ui_suite_bootstrap
- [Emulsify](EMULSIFY.md) - kanopi/kdcl_basic theme was built from Emulsify.

## Docksal Commands

The following commands are available with Docksal
and should be prefixed with the command `fin`

Command | Description
--------|------------
`critical` | Run Critical CSS.
`cypress` | Run Cypress inside Docksal. ie. `fin cypress open`.
`cypress-users` | Adds users Cypress can be used to test. Called from `fin refresh`.
`composer` | Composer wrapper that executes within the CLI container.
`init` | Init Command that starts the project from scratch.
`init-site` | Installs and configures Drupal.
`install-critical-tools` | Installs tools needed for Critical CSS.
`install-cypress` | Called from `init` to install Cypress tools.
`install-kdcl-basic` | Project setup theme generator. [Deprecated]
`install-theme-tools` | Installs tools needed for Critical, Storybook, etc.
`migrate-prep-db` | Creates a second database to house a migration source.
`npm` | Run NPM from the theme folder.
`npx` | Run NPX from the theme folder.
`open` | Opens browser to local site URL.
`pa11y` | Runs the Pa11y accessibility tools suite locally.
`recipe-apply` | Apply Drupal contrib Recipes that have been required.
`recipe-configure` | Configures sites for Drupal Recipes. Already run in this repo.
`recipe-unpack` | Unpacks Composer dependencies from a Recipe to the project's composer.json.
`refresh` | Will execute a drush sql-dump from the remote server.
`share` | Opens a proxy server to your local computer using ngrok.io.
`tickle` | Wakes up the remote migration source environment every 5 minutes.
`uuid-rm` | Helper command for Drupal Recipe builders that removes UUIDs from config files.

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

Note: This was forked from [Phase2](https://github.com/phase2/pa11y-dashboard)


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
