# [Project Website Name](https://example.com/)
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

## Config split

This project uses [config_split](https://www.drupal.org/project/config_split) to set different configuration for different environments. For example, by default, devel is enabled for the local development environment.

Existing splits are defined by a YML file at `config/default/config_split.config_split.<environment>.yml`, and the environment-specific configuration files exist inside the environment split directory (`config/<environment>`). 
 
### Setup (remove this section from the README after initial setup)

In order to configure `config_split`:

- Change the main `config` directory in `settings.php`:
```php
$config_directories = array(
  CONFIG_SYNC_DIRECTORY => dirname(DRUPAL_ROOT) . '/config/default',
);
```
- Add all of the following to `settings.php`:
```php
// Disable our three default config_split configurations. These will be enabled in the
// settings.build.php file that is compiled for either development or for the artifact.
$config['config_split.config_split.production']['status'] = FALSE;
$config['config_split.config_split.staging']['status'] = FALSE;
$config['config_split.config_split.development']['status'] = FALSE;

// Enable/disable config_split configurations. To simulate other config split
// environments, change "development" to either "staging" or "production", then run:
//   drush cr && drush cim -y
$config['config_split.config_split.development']['status'] = TRUE;

// ACQUIA: Enable/disable config_split configurations.
if (isset($_ENV['AH_PRODUCTION']) && $_ENV['AH_PRODUCTION']) {
  $config['config_split.config_split.production']['status'] = TRUE;
}
elseif (isset($_ENV['AH_NON_PRODUCTION']) && $_ENV['AH_NON_PRODUCTION']) {
  $config['config_split.config_split.staging']['status'] = TRUE;
}

// PANTHEON: Enable/disable config_split configurations.
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  if ($_ENV['PANTHEON_ENVIRONMENT'] == 'live') {
    $config['config_split.config_split.production']['status'] = TRUE;
  }
  else {
    $config['config_split.config_split.staging']['status'] = TRUE;
  }
}

// PLATFORM.SH: Enable/disable config_split configurations.
if (isset($_ENV['PLATFORM_BRANCH'])) {
  if ($_ENV['PLATFORM_BRANCH'] == 'master') {
    $config['config_split.config_split.production']['status'] = TRUE;
  }
  else {
    $config['config_split.config_split.staging']['status'] = TRUE;
  }
}
```
- Ensure the following directories exist in your repo:
```bash
../config/
├── default
├── development
├── staging
└── production
```
- Import default settings to enable split environments:
```php
fin drush en config_split -y
fin drush cim --partial --source="${PROJECT_ROOT}/.docksal/config/" -y
```

### Exporting shared configuration for all environments

1. Make any changes in the Drupal UI or via drush as usual
1. Use drush to export the shared configuration to `config/default`

### Exporting environment-specific config

1. If you're exporting configuration for an environment other than development, you'll need to enable the split for that environment locally.  
    1. See your `settings.php` file, replace "development" with the environment your configuring (either "staging" or "production").
    1. Run `drush cr` then `drush cim -y` to get a clean environment.
    1. You should now notice that your local development modules are disabled, and any other environment-specific modules (i.e. purge) are now enabled.
    1. Visit `/admin/config/development/configuration/config-split` to see that your environment's split is active.
1. Make any changes you'd like in the Drupal UI, as usual.
1. _Preview_ your development only configuration changes by running `drush cex` (but don't hit 'y').
1. Visit the `/admin/config/development/configuration/config-split` for the environment you're configuring.
1. Add _either_ the whole module or specific config files that you'd like to export specifically for this environment in the ["Blacklist"](https://www.drupal.org/docs/8/modules/configuration-split/blacklist). (Be sure not to overwrite other options in the list.) Then save the form.
    * The term "Blacklist" is a little confusing here, but think of it as "blacklisting" config from the global directory (and "whitelisting" it into the specific environment).
    * The "Greylist" is used to target a configuration object having a different value than that for the shared configuration. (i.e. Error logging level set to show everything locally, but show nothing everywhere else.)
    * For more details on Config Split, [read the docs](https://www.drupal.org/docs/8/modules/configuration-split).
1. Run `drush cex -y` to export the environment-specific config.
1. Carefully review the changes in git before pushing. Be sure not to commit any changes you weren't expecting.
1. If your config should apply to multiple environments (i.e. "staging" and "production", you'll need to repeat this process for those environments
1. Change your `settings.php` back to "development" when finished

### Importing development-only config

* Building the site from scratch
    1. Once you have build your site from your current branch's configuration, run `drush cim -y` to import the development-only configuration
* Building from production data
    1. Once you have built your site, run `drush cim -y` to import the shared configuration from your current branch
    1. Run `drush cim -y` a second time to import the development-only configuration 