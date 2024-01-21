
The theme is based off the
[Kanopi Design Component Library](https://github.com/kanopi/kdcl_basic)
which uses Storybook and is originally forked from
[Emulsify DS](https://github.com/emulsify-ds/emulsify-drupal).

The theme included is located within `docroot/sites/themes/custom/THEME`.

The Storybook Design System published to the `gh-pages` branch and is available
at https://kanopi.github.io/REPO_NAME/

Locally, running `fin npm run storybook` or `fin npm run build` will build the
Storybook at http://storybook.${VIRTUAL_HOST}

The theme uses Webpack and NPM to manage packages and run scripts.

- @TODO
[Hot Reloading in Drupal](https://docs.emulsify.info/usage/hot-reload-drupal)

#### Storybook

- Theme development run `fin npm run develop`. This will watch for twig, js,
 and sass changes within the components directory.
- The development storybook URL http://storybook.${VIRTUAL_HOST}

#### Storybook Webpack
For webpack storybook to work within a docksal container we needed
to set `watchOptions` in
`docroot/themes/custom/THEME/.storybook/webpack.config.js`
```
config.watchOptions = {
  aggregateTimeout: 200,
  poll: 1000,
}
```

### Theme Commands

The following commands are available with Node and should be prefixed with the
command `fin npm run`.

Command | Description
--------|------------
`commit`| git-cz
`lint`| Lint JS
`a11y`| Run a11y on theme
`storybook`| Start storybook
`build-storybook`| Build static storybook
`deploy-storybook`| Generate storybook for github pages
`webpack`| Run webpack
`build`| Build storybook
`develop`| Run storybook and webpack at the same time
`test`| Run tests
`twatch`| Watch tests run
`coverage`| Check test coverage
`format`| Clean up code format
`lint-staged`| lint-staged
`postinstall`| Patches packages
`criticalcss`| Compile critical CSS assets
