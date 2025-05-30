// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/**
 * Overwrite the visit() command to support setting headers globally.
 */
Cypress.Commands.overwrite("visit", (originalVisit, url, options = {}) => {
  const globalHeaders = Cypress.env('visitHeaders') || {};

  // Combine global and specific headers from the unique call of visit().
  const headers = Object.assign({}, globalHeaders, options.headers);

  // Call the real visit with the merged headers
  return originalVisit(url, { ...options, headers });
});

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
