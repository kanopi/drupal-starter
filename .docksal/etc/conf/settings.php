<?php

/**
 * @file
 * Local settings that are copied via fin init.
 */

// Docksal DB connection settings.
$databases['default']['default'] = [
  'database' => 'default',
  'username' => 'user',
  'password' => 'user',
  'host' => 'db',
  'driver' => 'mysql',
];

// Workaround for permission issues with NFS shares in Vagrant.
$settings['file_chmod_directory'] = 0777;
$settings['file_chmod_file'] = 0666;

// Skip file system permissions hardening.
$settings['skip_permissions_hardening'] = TRUE;

// Disable local development caching.
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

// Set Trusted Host Patterns to any.
$settings['trusted_host_patterns'][] = '.*';

// Override ClamAV settings.
$config['clamav.settings']['enabled'] = FALSE;

// "Allow Insecure Derivatives" for webp images working locally.
$config['image.settings']['allow_insecure_derivatives'] = TRUE;

// Disable minifyHTML settings.
$config['minifyhtml.config']['strip_comments'] = FALSE;
$config['minifyhtml.config']['minify'] = FALSE;

// Override pantheon solr configuration.
$config['search_api.server.pantheon_solr8']['backend_config']['connector'] = 'standard';
$config['search_api.server.pantheon_solr8']['backend_config']['connector_config'] = [
  "scheme" => "http",
  "host" => "solr",
  "port" => "8983",
  "path" => "/",
  "core" => "search_api_solr_8.x-3.0",
  "timeout" => "5",
  "index_timeout" => "5",
  "optimize_timeout" => "10",
  "finalize_timeout" => "30",
  "commit_within" => "1000",
  "solr_version" => "",
  "http_method" => "AUTO",
  "skip_schema_check" => "false",
  "jmx" => "false",
  "jts" => "false",
  "solr_install_dir" => "",
];

// Override Security Kit (seckit) Settings.
$config['seckit.settings']['seckit_csrf']['origin'] = FALSE;

// Disable CSS and JS aggregation.
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Salt for one-time login links, cancel links, form tokens, etc.
 *
 * This variable will be set to a random value by the installer. All one-time
 * login links will be invalidated if the value is changed. Note that if your
 * site is deployed on a cluster of web servers, you must ensure that this
 * variable has the same value on each server.
 *
 * For enhanced security, you may set this variable to the contents of a file
 * outside your document root, and vary the value across environments (like
 * production and development); you should also ensure that this file is not
 * stored with backups of your database.
 *
 * Example:
 * @code
 *   $settings['hash_salt'] = file_get_contents('/home/example/salt.txt');
 * @endcode
 */
$settings['hash_salt'] = 'hiuehfw89e9873480-khds*';
