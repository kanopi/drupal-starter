// Put together some options to use in each test.
// See pa11y-ci config options at https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AA',
  defaults: {
    chromeLaunchConfig: {
      // this is needed to run in docker
      args: ["--no-sandbox"],
      ignoreHTTPSErrors: false
    },
    // full coverage, can be turned off to only report outright errors
    includeWarnings: true,
    includeNotices: true,
    concurrency: 2,
    timeout: 100000,
    wait: 2000,
  },
  urls: [
    'http://YOUR-DOMAIN.docksal/',
    'http://YOUR-DOMAIN.docksal/style-guide',
  ],
};
