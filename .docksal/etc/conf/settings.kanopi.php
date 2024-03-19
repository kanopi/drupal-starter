<?php

// phpcs:ignoreFile

/**
 * @file
 * Local settings that are copied via fin init.
 */

// Docksal Default DB connection settings.
$databases['default']['default'] = [
  'database' => 'default',
  'username' => 'root',
  'password' => 'root',
  'host' => 'db',
  'driver' => 'mysql',
];

// Docksal Migration DB connection settings.
$databases['migrate']['default'] = [
  'database' => 'migrate',
  'username' => 'root',
  'password' => 'root',
  'host' => 'db',
  'driver' => 'mysql',
];

// Workaround for permission issues with NFS shares in Vagrant.
$settings['file_chmod_directory'] = 0777;
$settings['file_chmod_file'] = 0666;

// Enable access to rebuild.php.
$settings['rebuild_access'] = TRUE;

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
