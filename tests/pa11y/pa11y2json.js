// pa11yci has trouble reading our .js config file, but has zero issues reading
// .json files so we convert the full config object to json and write it to the
// config file used in the fin pa11y script.
const pa11yconfig = require('./.pa11yci');
const fs = require('fs');

fs.writeFileSync('./tests/pa11y/config.json', JSON.stringify(pa11yconfig));
