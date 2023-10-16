# /**
#  * Configure Redis.
#  */
# if (defined('PANTHEON_ENVIRONMENT')) {
#   // Include the Redis services.yml file.
#   // Adjust the path if you installed to a contrib or other subdirectory.
#   $settings['container_yamls'][] = 'modules/redis/example.services.yml';
# 
#   //phpredis is built into the Pantheon application container.
#   $settings['redis.connection']['interface'] = 'PhpRedis';
#   // These are dynamic variables handled by Pantheon.
#   $settings['redis.connection']['host']      = $_ENV['CACHE_HOST'];
#   $settings['redis.connection']['port']      = $_ENV['CACHE_PORT'];
#   $settings['redis.connection']['password']  = $_ENV['CACHE_PASSWORD'];
# 
#   $settings['redis_compress_length'] = 100;
#   $settings['redis_compress_level'] = 1;
# 
#   // Use Redis as the default cache.
#   $settings['cache']['default'] = 'cache.backend.redis';
#   $settings['cache_prefix']['default'] = 'pantheon-redis';
# 
#   // Use the database for forms.
#   $settings['cache']['bins']['form'] = 'cache.backend.database';
# }

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
