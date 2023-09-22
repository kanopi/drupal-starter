/**
 * Environment Indicator Default Configuration.
 */
if ($_ENV['PANTHEON_ENVIRONMENT']) {
  switch ($_ENV['PANTHEON_ENVIRONMENT']) {
  case 'live':
    // Green.
    $config['environment_indicator.indicator']['bg_color'] = '#3ad7ab';
    $config['environment_indicator.indicator']['fg_color'] = '#111111';
    $config['environment_indicator.indicator']['name'] = 'Live (Canonical DB)';
    break;
  case 'test':
    // Yellow.
    $config['environment_indicator.indicator']['bg_color'] = '#ffc508';
    $config['environment_indicator.indicator']['fg_color'] = '#111111';
    $config['environment_indicator.indicator']['name'] = 'Staging (Do not enter content)';
    break;
  case 'dev':
    // Red.
    $config['environment_indicator.indicator']['bg_color'] = '#af0710';
    $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
    $config['environment_indicator.indicator']['name'] = 'Development (Do not enter content)';
    break;
  case 'docksal':
    // Blue.
    $config['environment_indicator.indicator']['bg_color'] = '#0550e6';
    $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
    $config['environment_indicator.indicator']['name'] = 'Docksal';
    break;
  default:
    // Multidev catchall/Purple.
    $config['environment_indicator.indicator']['bg_color'] = '#4300bf';
    $config['environment_indicator.indicator']['fg_color'] = '#ffffff';
    $config['environment_indicator.indicator']['name'] = 'Multidev: ' . $_ENV['PANTHEON_ENVIRONMENT'];
    break;
  }
}
