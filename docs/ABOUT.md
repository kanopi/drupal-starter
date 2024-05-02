# About kanopi/drupal-starter

[kanopi/drupal-starter](https://www.github.com/kanopi/drupal-starter) is
opinionless about Drupal.

What does have Drupal opinions is our new suite of Drupal Recipes called
[kanopi/saplings](https://www.github.com/kanopi/saplings).

Explore the Saplings respository to choose your own adventure and apply the
functionality you need for your Drupal site in minutes.

What kanopi/drupal-starter does have opinions about is scaffolding and testing.

## Installer Types and Paths

By default, in the repositories section of our composer.json, we allow for
installation from [Packagist](https://packagist.org/),
[Drupal.org](https://www.drupal.org), and
[Asset Packagist](https://asset-packagist.org/).  This means you can require not
 only Drupal packages, but packages from
[Kanopi's Packagist](https://packagist.org/packages/kanopi/) and things like
NPM and Bower Assets like
[Bootstrap](https://asset-packagist.org/package/bower-asset/bootstrap).

In the extras section of the composer.json, we define the `installer-types` and
`installer-paths` for these packages.

The `installer-types` are dentfied in each package's composer.json file
indentifying the type of package they are.

The `installer-paths` define the destination we want to install the different
types of packages to.

```
"installer-types": [
    "drupal-library",
    "npm-asset",
    "bower-asset",
    "quicksilver-script",
    "cypress-support",
    "cypress-e2e",
    "drupal-recipe"
],
"installer-paths": {
    "web/core": ["type:drupal-core"],
    "web/libraries/{$name}": [
        "type:drupal-library",
        "type:bower-asset",
        "type:npm-asset"
    ],
    "drush/contrib/{$name}": ["type:drupal-drush"],
    "tests/cypress/cypress/support/{$name}": ["type:cypress-support"],
    "tests/cypress/cypress/e2e/{$name}": ["type:cypress-e2e"],
    "web/modules/contrib/{$name}": ["type:drupal-module"],
    "web/private/scripts/quicksilver/{$name}/": ["type:quicksilver-script"],
    "web/profiles/contrib/{$name}": ["type:drupal-profile"],
    "web/recipes/contrib/{$name}": ["type:drupal-recipe"],
    "web/themes/contrib/{$name}": ["type:drupal-theme"]
},
```

## drupal/core-composer-scaffold

In the extras section of the composer.json, you will also find a drupal-scaffold
 section.

```
"drupal-scaffold": {
    "locations": {
        "web-root": "./web"
    },
    "allowed-packages": [
        "pantheon-systems/drupal-integrations"
    ],
    "file-mapping": {
        "[web-root]/.htaccess": false,
        "[web-root]/robots.txt": {
            "append": "assets/custom-robots.txt"
        },
        "[web-root]/sites/development.services.yml": false
    }
}
```

This allows us to:
1. Define the web-root of the project.
2. Allow the Pantheon package to be applied after composer install
3. Alter the files from the standard Drupal core installation without making
changes to Drupal core's git.

In our starter we use scaffolding to alter the files for two different
scenarios.

1. Ignore files
  * .htaccess (becuase we don't need it)
  * development.services.yml (becuase we server our own)
2. Append additional information to existing files.
  * robots.txt

These files are kept in /assets and allow us to keep the robots.txt file in the
default state, but add the customizations we need for our project.

We had some projects where the `settings.php` file was appended too but the
Kanopi approach now is to commit all changes as needed to `web/sites/default/settings.php`
as that is a standard practice.

## Testing

### Static code tests.

Our static code tests are tests that are run on the code base without the need
for Drupal to be started.

The dependencies for the tests are installed in the require-dev section of the
composer.json

```
"require-dev": {
    "drupal/core-dev": "^10.2",
    "drupal/devel": "^5.1",
    "palantirnet/drupal-rector": "^0.19"
},
```
This may seem simpler than past iterations, but Drupal Rector requires PHPstan
which in turn requires PHPcs.  We just need to remember that when we upgrade
versions, we need to upgrade the rector.php and phpstan.neon files in the root
of our project.

The tests are preconfigured in the scripts section of the composer.json.  So we
can run them locally, pre-commit or pre-push using Lefthook, and in CircleCI.
Anywhere the site is installed using composer with the dev modules.

At this time, we run 4 pre-build static code tests, `PHPcs`, `PHPstan`, `Rector
- modules`, and `Rector - themes`.  These tests are now a requirement to pass
before code can be merged.

### Post Build tests.

After a site is built in CircleCI, we run post build tests.  These tests are
installed using our kanopi/ci-tools orb, and configured in the site's
`/.circleci/config.yml` file.

#### Lighthouse

Used to run the overall quality measurement testing tool.  Out of the box it
runs on the home page, but should be configured to run on at least three high
value pages, if not all content types.

#### Pa11y

Used to run accessibility tests.  Out of the box it runs on the home page, but
should be configured to run on at least the three high value pages that
Lighthouse is configured to run on.

#### Cypress End to End Testing (e2e)

Used to test anything on the website a human can do.  We launch with a simple
test that ensures Drupal is installed.  New tests should be added for common
administration tasks like adding nodes as different roles, and for validation
steps on high value features.

Be sure to check out [kanopi/shrubs](https://www.github.com/kanopi/shrubs), our
repository of reusable Cypress support commands for Drupal, and it's
CHEATSHEET.md for helpful test snippets you can copy and paste into your own
test.

#### Structured Data Testing Tool (SDTT)

Used to test meta tag configuration best practices.  This test is commented out
by default when a build is started, but should be configured when a home page is
 set.

#### Backstop.js Visual Regression Testing

Used to take a visual screenshot of a source URL and the multidev URL, and
compare the two for inconsistencies. This test is commented out by default
when a build is started, but should be configured for each content type, and for
 high value features during build to limit regressions.

All of these can be configured to fail a pull request in Github.

Using these tests, our goal is to deliver the finest quality product we can,
avoid regressions, and define done for each features on the project.
