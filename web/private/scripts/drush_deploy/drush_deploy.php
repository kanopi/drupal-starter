<?php

/**
 * @file
 * Quicksilver: run Drupal deployment tasks after code sync and deploy.
 *
 * Wired to the sync_code and deploy workflows in pantheon.yml.
 *
 * `drush deploy` runs, in order:
 *   - updatedb --no-cache-clear
 *   - config:import
 *   - cache:rebuild
 *   - deploy:hook
 *
 * That ordering matters: update hooks must land before config is imported, and
 * hook_post_update_NAME() implementations must run after. Calling the
 * individual commands by hand is what this replaces.
 */

echo "Running drush deploy...\n";
passthru('drush deploy -y', $exit_code);

if ($exit_code !== 0) {
  echo "drush deploy failed with exit code {$exit_code}.\n";
}
else {
  echo "drush deploy complete.\n";
}
