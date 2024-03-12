<?php

/**
 * @file
 * Settings file for migration on Pantheon.
 */

$secretsFile = __DIR__ . '/files/private/secrets.json';
if (file_exists($secretsFile)) {
  $secrets = json_decode(file_get_contents($secretsFile), 1);
}

if (!empty($secrets['migrate_source_db__url'])) {
  $parsed_url = parse_url($secrets['migrate_source_db__url']);

  if (!empty($parsed_url['port'])
    && !empty($parsed_url['host'])
    && !empty($parsed_url['user'])
    && !empty($parsed_url['pass'])
  ) {
    $databases['migrate']['default'] = array (
      'database' => 'pantheon',
      'username' => $parsed_url['user'],
      'password' => $parsed_url['pass'],
      'host' => $parsed_url['host'],
      'port' => $parsed_url['port'],
      'driver' => 'mysql',
      'prefix' => '',
      'collation' => 'utf8mb4_general_ci',
    );
  }
}
