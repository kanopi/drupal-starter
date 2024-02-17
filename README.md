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


## Theme Commands and Setup Documentation
- [Saplings Child](docs/SAPLINGS_THEME.md) - Current theme based on
ui_suite_bootstrap
- [Emulsify](docs/EMULSIFY.md) - kanopi/kdcl_basic theme was built from
Emulsify. Currently not in use.


## Docksal Commands

The following commands are available with Docksal and should be prefixed with
the command `fin`.

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
`install-theme-tools` | Installs tools needed for Critical, Storybook, etc.
`migrate-prep-db` | Creates a second database to house a migration source.
`npm` | Run NPM from the theme folder.
`npx` | Run NPX from the theme folder.
`open` | Opens browser to local site URL.
`rebuild` | Runs `composer install` and `fin refresh`
`recipe-apply` | Apply Drupal contrib Recipes that have been required.
`recipe-configure` | Configures sites for Drupal Recipes. Already run in this repo.
`recipe-unpack` | Unpacks Composer dependencies from a Recipe to the project's composer.json.
`refresh` | Will execute a drush sql-dump from the remote server.
`share` | Opens a proxy server to your local computer using ngrok.io.
`solr-create-core` | Called from `init` to create Solr core.
`tickle` | Wakes up the remote migration source environment every 5 minutes.
`uuid-rm` | Helper command for Drupal Recipe builders that removes UUIDs from config files.


## Composer Commands

The following commands are available with Composer and should be prefixed with
the command `fin composer`.

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
