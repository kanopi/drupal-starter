/**
 * Webpack JavaScript Compilation
 * Current compilation standards dictate that all JavaScript be compiled using
 * Webpack compilation services - https://webpack.js.org/
 *
 * - 01 - Imports
 * - 02 - Exports
 */

/*------------------------------------*\
  01 - Imports
  Define the NPM packages to be used during the Webpack compilation, including
  Webpack itself. Even though the Webpack library isn't directly used, it is
  still required to be defined.
\*------------------------------------*/

const webpack = require("webpack");

/*------------------------------------*\
  02 - Exports
  Prepare all resources using Webpack to be exported as distributed and
  compiled files. Here, Babel (https://babeljs.io/) is being used to convert
  any ES6 syntax to earlier versions, if necessary.
\*------------------------------------*/

module.exports = {
  mode: "none",
  devtool: "source-map",
  externals: {
    jquery: "jQuery",
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // All Babel plugins and options will be loaded via the babel.config.js file
        },
      },
    ],
  },
};
