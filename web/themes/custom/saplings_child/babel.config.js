/*
 * Babel Configurations and Plugins
 * This is the configuration file, using the JavaScript version of configurations for Babel, which includes access
 * to specific API variables and settings. All of which can be reviewed at https://babeljs.io/docs/en/config-files
 * - 01 - Exports
 */

/*------------------------------------*\
  01 - Exports
  Although Babel does not inherently require any other plugins or settings in order to operate, other plugins are
  used to make the build step of JavaScript files better and allow developers access to additional tools and functions.

  * Babel Preset Env - https://babeljs.io/docs/en/babel-preset-env
    - Plugin Pack for Babel which leverages a list of features and applies plugins, so you can use those new features
      without having to worry about browser support.
\*------------------------------------*/

"use strict";

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        corejs: 3.8, // https://babeljs.io/docs/en/babel-preset-env#corejs
        shippedProposals: true, // https://babeljs.io/docs/en/babel-preset-env#shippedproposals
        useBuiltIns: "entry", // https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage
      },
    ],
  ];

  const plugins = []; // Additional Babel plugins can be added here

  return {
    presets,
    plugins,
  };
};
