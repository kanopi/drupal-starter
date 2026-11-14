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
  retries: {
    // Configure retry attempts for `cypress run`
    runMode: 3,
    // Configure retry attempts for `cypress open`
    openMode: 0
  },
  e2e: {
    responseTimeout: 20000,
    // Pantheon's CDN (Cloudflare) challenges headless browsers on multidevs
    // and allowlists user agents containing the literal CI-Testing/1.0 token.
    // The Deterrence-Bypass header below only covers cy.visit(); the user
    // agent also covers the assets and XHRs a page loads. Cypress applies this
    // in both Electron (the `cypress run` default) and Chrome. Keep the token
    // exact.
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36 CI-Testing/1.0",
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
