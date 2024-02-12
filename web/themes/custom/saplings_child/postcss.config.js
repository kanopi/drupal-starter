/*
 * PostCSS Configurations and Plugins
 * All documentation, including setup and plugin options can be found on the PostCSS Github page. Here, you can
 * read about the setup chosen for Prototype and specifics of how to configure on a per-project basis.
 * https://github.com/postcss/postcss
 * - 01 - Requirements
 * - 02 - SVG Encode
 * - 03 - Exports
 */

/*------------------------------------*\
  01 - Requirements
  Although PostCSS does not inherently require any other plugins or settings in order to operate, other plugins are
  used to make the build step of CSS files better and allow developers access to additional tools and functions.

  * PostCSS Preset Env: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
    - Plugin Pack for PostCSS which leverages the list of the features from https://cssdb.org/ and applies plugins,
      so you can use those new features without having to worry about browser support. This plugin pack includes
      Autoprefixer, which in the past, had been loaded as a separate plugin.

  * PostCSS Inline SVG: https://github.com/TrySound/postcss-inline-svg
    - Plugin to reference an SVG file and control its attributes with CSS syntax.
\*------------------------------------*/

const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");
const postcssInlineSvg = require("postcss-inline-svg");

/*------------------------------------*\
  02 - SVG Encode
  Since we are using PostCSS Inline SVG, we will need to add to the default set of encode regex options when replacing
  inline SVG code during the build step. Here we are adding to that default set of replacements.
\*------------------------------------*/

function encode(code) {
  return code
    .replace(/\%/g, "%25")
    .replace(/\</g, "%3C")
    .replace(/\>/g, "%3E")
    .replace(/\s/g, "%20")
    .replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\"/g, "%22")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\;/g, "%3B")
    .replace(/\:/g, "%3A")
    .replace(/\@/g, "%40")
    .replace(/\&/g, "%26")
    .replace(/\=/g, "%3D")
    .replace(/\+/g, "%2B")
    .replace(/\$/g, "%24")
    .replace(/\,/g, "%2C")
    .replace(/\//g, "%2F")
    .replace(/\?/g, "%3F")
    .replace(/\#/g, "%23")
    .replace(/\[/g, "%5B")
    .replace(/\]/g, "%5D");
}

/*------------------------------------*\
  03 - Exports
  Define both the developmental, "Watch" and final production, "Build"
  processes for compiling files. The final production, "Build" process includes
  minified files.
\*------------------------------------*/

module.exports = {
  plugins: [
    postcssPresetEnv({}), // Additional options can be defined here for PostCSS Preset Env
    postcssInlineSvg({
      // Other additional options can be defined here for PostCSS Inline SVG
      encode: encode,
      paths: ["./images/icons"],
    }),
    // cssnano(), // Uncomment this line if you would like to minimize all CSS
  ],
};
