# Testing

This repository is configured to run a plethora of tests to ensure we are
creaing the best possible product.

## Static Code Tests

The following tests are run using the composer.json scripts section. They can be
 run locally, and are run in CircleCI.

Preface each command with `fin composer`

### PHP Linting

Command | Description
--------|------------
`lint-php` | Analyzes the custom modules folder for programmatic and stylistic
errors

### PHPcs

Runs static coding standard tests on custom modules and themes.

Command | Description
--------|------------
`code-sniff-modules` | Runs PHPcs on the custom modules folder
`code-sniff-themes` | Runs PHPcs on the custom themes folder
`code-sniff` | Runs `code-sniff-modules` and `code-sniff-themes`
`code-fix-modules` | Runs PHPcbf on the custom modules folder
`code-fix-themes` | Runs PHPcbf on the custom themes folder

### Drupal Rector

Analyzes code looking for deprecations in Drupal code.

Command | Description
--------|------------
`rector-modules` | Dry run on the custom modules folder of
automates that checks for deprecations
`rector-themes` | Dry run on the custom themes folder of
automates that checks for deprecations
`rector-fix-modules` | Automates the refactoring of deprecations
 on the custom modules folder
`rector-fix-themes` | Automates the refactoring of deprecations
 on the custom themes folder
`rector-fix` | Runs `rector-fix-modules` and `rector-fix-themes`

### PHPstan

PHPStan scans your whole codebase and looks for both obvious & tricky bugs.

Command | Description
--------|------------
`phpstan` | PHPStan focuses on finding errors in the custom modules and
 themes folders without actually running it.

### Combos

For convenience, these commands combine other commands.

Command | Description
--------|------------
`code-check` | Runs `phpstan` `rector-modules` `rector-themes` `code-sniff`
`code-fix` | Runs `code-fix-modules` `code-fix-themes` `rector-fix` `lint-php`


## Post Build Tests

These tests can be run after a site has been built so they can interact with it.

Cypress and Pa11y can be run locally and in CircleCI. The rest are only run in
CircleCI.

### Cypress Tests

Configured to run cypress end-to-end (e2e) testing.

Command | Description
--------|------------
`help` | Shows CLI help and exits
`version [options]` | prints Cypress version
`open [options]` | Opens Cypress in the interactive GUI.
`run [options]` | Runs Cypress tests from the CLI without the GUI
`open-ct [options]` | Opens Cypress component testing interactive mode. Deprecated: use "open --component"
`run-ct [options]` | Runs all Cypress component testing suites. Deprecated: use "run --component"
`install [options]` | Installs the Cypress executable matching this package's version
`verify [options]` | Verifies that Cypress is installed correctly and executable
`cache [options]` | Manages the Cypress binary cache
`info [options]` | Prints Cypress and system information

The project comes with [kanopi/shrubs](https://packagist.org/packages/kanopi/shrubs)
 installed that includes helpful Cypress support commands for easier test
 development. Please view the documentation in that repository to learn more.

### Pa11y Audits

We have a pa11y audit that runs in CircleCI and posts a comment to the GitHub
repository's pull request if the audit fails.

### Lighthouse

Runs Google Lighthouse tests in CircleCI.

At the minimum, our scores need to pass the 75th percentile of site on the
internet.

Type | Minimum Score
-----|--------------
performance | 55
accessibility | 89
best-practices| 96
seo | 93

Developers are also encouraged to run Lighthouse locally using browser plugins,
or [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse?tab=readme-ov-file#using-the-node-cli).

### Backstop.js Visual Regression

Runs visual regression testing in CircleCI using a snapshot of your multidev
that is compared to a snapshot of a canonical site.

Advanced configuration happens in the `backstop.json` in the root of the repo.

### Structured data testing tool (SDTT)

Runs a test to verify open graph and Twitter card meta tags are configured.
