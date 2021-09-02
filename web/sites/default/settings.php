<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

# Exclude modules from config export.
$settings['config_exclude_modules'] = ['devel', 'twig_xdebug'];

// Add redis caching
//if (defined('PANTHEON_ENVIRONMENT')) {
//  // Include the Redis services.yml file. Adjust the path if you installed to a contrib or other subdirectory.
//  $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';
//
//  //phpredis is built into the Pantheon application container.
//  $settings['redis.connection']['interface'] = 'PhpRedis';
//  // These are dynamic variables handled by Pantheon.
//  $settings['redis.connection']['host']      = $_ENV['CACHE_HOST'];
//  $settings['redis.connection']['port']      = $_ENV['CACHE_PORT'];
//  $settings['redis.connection']['password']  = $_ENV['CACHE_PASSWORD'];
//
//  $settings['redis_compress_length'] = 100;
//  $settings['redis_compress_level'] = 1;
//
//  $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.
//  $settings['cache_prefix']['default'] = 'pantheon-redis';
//
//  $settings['cache']['bins']['form'] = 'cache.backend.database'; // Use the database for forms
//}

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * Place the config directory outside of the Drupal root.
 */
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}
