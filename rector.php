<?php

declare(strict_types=1);

use DrupalRector\Set\DrupalSetProvider;
use Rector\Config\RectorConfig;

/**
 * Drupal Rector — Composer-based sets.
 *
 * Set selection is driven by what is actually installed. Rector reads
 * drupal/core (and twig, phpunit, symfony) from composer.json and loads every
 * set up to and including the installed minor, so upgrading core moves the rule
 * selection with it — there are no version numbers to maintain in this file.
 *
 * This is the backward-compatibility-safe setup: it fixes what is deprecated on
 * the installed core. To look ahead and prepare for the next major before
 * upgrading, use the explicit Drupal{N}SetList sets together with
 * ->setDrupalVersion() instead (see the drupal-rector README).
 */
return RectorConfig::configure()
  // Custom code only — never point Rector at contrib or core.
  ->withPaths([
    __DIR__ . '/web/modules/custom',
    __DIR__ . '/web/themes/custom',
  ])
  // Register the Drupal rule sets so Rector knows they exist.
  ->withSetProviders(DrupalSetProvider::class)
  // Select those sets automatically from composer.json.
  ->withComposerBased(twig: TRUE, phpunit: TRUE, symfony: TRUE, drupal: TRUE)
  ->withSkip([
    '*/node_modules/*',
    '*/upgrade_status/tests/modules/*',
  ])
  ->withFileExtensions([
    'php',
    'module',
    'theme',
    'install',
    'profile',
    'inc',
    'engine',
  ])
  ->withImportNames(importDocBlockNames: FALSE, importShortClasses: FALSE);
