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

// Local dev caching
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

// Set Trusted Host Patterns to any.
$settings['trusted_host_patterns'][] = '.*';

$config['minifyhtml.config']['strip_comments'] = FALSE;
$config['minifyhtml.config']['minify'] = FALSE;

// "Allow Insecure Derivatives" for webp images working locally.
$config['image.settings']['allow_insecure_derivatives'] = TRUE;


// Override pantheon solr config
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
