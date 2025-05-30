const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "reporter-config.json",
  },

  video: true,

  viewportWidth: 1350,
  viewportHeight: 940,

  e2e: {
    responseTimeout: 20000,
    setupNodeEvents(on, config) {
         on('task', {downloadFile})
    },
    env: {
      "visitHeaders" : {
        "Deterrence-Bypass" : "1"
      }
    }
  }
});
