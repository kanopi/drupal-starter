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
