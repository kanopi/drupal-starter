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
to set `watchOptions` in
`docroot/themes/custom/THEME/.storybook/webpack.config.js`
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
`critical` | Run Critical CSS.
`cypress` | Run Cypress inside Docksal. ie. `fin cypress open`.
`cypress-users` | Adds users Cypress can be used to test. Called from `fin refresh`.
`composer` | Composer wrapper that executes within the CLI container.
`init` | Init Command that starts the project from scratch.
`init-site` | Installs and configures Drupal.
`install-cypress` | Called from `init` to install Cypress tools.
`install-kdcl-basic` | Project setup theme generator.
`install-theme-tools` | Installs tools needed for Critical, Storybook, etc.
`migrate-prep-db` | Creates a second database to house a migration source.
`npm` | Run NPM from the theme folder.
`npx` | Run NPX from the theme folder.
`open` | Opens browser to local site URL.
`pa11y` | Runs the Pa11y accessibility tools suite locally.
`refresh` | Will execute a drush sql-dump from the remote server.
`share` | Opens a proxy server to your local computer using ngrok.io.
`tickle` | Wakes up the remote migration source environment every 5 minutes.

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
