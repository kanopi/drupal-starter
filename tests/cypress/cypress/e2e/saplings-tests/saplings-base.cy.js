describe('Verify the Saplings Base recipe applied properly.', () => {

  /**************************************************************
   * Module install and verification section.
   *************************************************************/
  it('Verify all core modules were installed and enabled.', () => {
    // Login and visit the extend/modules page.
    cy.login()
    cy.visit('/admin/modules')
    // Verify Automated Cron module was installed and enabled.
    cy.get('#edit-modules-automated-cron-enable').should('be.checked')
    // Verify Block Content module was installed and enabled.
    cy.get('#edit-modules-block-content-enable').should('be.checked')
    // Verify Config module was installed and enabled.
    cy.get('#edit-modules-config-enable').should('be.checked')
    // Verify Dynamic Page Cache module was installed and enabled.
    cy.get('#edit-modules-dynamic-page-cache-enable').should('be.checked')
    //Verify Field UI module was installed and enabled.
    cy.get('#edit-modules-field-ui-enable').should('be.checked')
    //Verify Menu Link Content module was installed and enabled.
    cy.get('#edit-modules-menu-link-content-enable').should('be.checked')
    // Verify Menu UI module was installed and enabled.
    cy.get('#edit-modules-menu-ui-enable').should('be.checked')
    // Verify Node module was installed and enabled.
    cy.get('#edit-modules-node-enable').should('be.checked')
    // Verify Options module was installed and enabled.
    cy.get('#edit-modules-options-enable').should('be.checked')
    // Verify Page Cache module was installed and enabled.
    cy.get('#edit-modules-page-cache-enable').should('be.checked')
    // Verify Path module was installed and enabled.
    cy.get('#edit-modules-path-enable').should('be.checked')
    // Verify Shortcut module was installed and enabled.
    cy.get('#edit-modules-shortcut-enable').should('be.checked')
    // Verify Taxonomy module was installed and enabled.
    cy.get('#edit-modules-taxonomy-enable').should('be.checked')
    // Verify Tour module was installed and enabled.
    cy.get('#edit-modules-tour-enable').should('be.checked')
    // Verify Views module was installed and enabled.
    cy.get('#edit-modules-views-enable').should('be.checked')
    // Verify Views UI module was installed and enabled.
    cy.get('#edit-modules-views-ui-enable').should('be.checked')
  })

  it('Verify all contrib modules were installed and enabled.', () => {
    // Login and visit the extend/modules page.
    cy.login()
    cy.visit('/admin/modules')
    // Verify Block Class module was installed and enabled.
    cy.get('#edit-modules-block-class-enable').should('be.checked')
    // Verify Critical CSS module was installed and enabled.
    cy.get('#edit-modules-critical-css-enable').should('be.checked')
    // Verify Diff module was installed and enabled.
    cy.get('#edit-modules-diff-enable').should('be.checked')
    // Verify Easy Breadcrumb module was installed and enabled.
    cy.get('#edit-modules-easy-breadcrumb-enable').should('be.checked')
    // Verify Environment Indicator module was installed and enabled.
    cy.get('#edit-modules-environment-indicator-enable').should('be.checked')
    // Verify Environment Indicator Ribbon module was installed and enabled.
    cy.get('#edit-modules-environment-indicator-ribbon-enable').should('be.checked')
    // Verify Google Tag module was installed and enabled.
    cy.get('#edit-modules-google-tag-enable').should('be.checked')
    // Verify Menu Link Attributes module was installed and enabled.
    cy.get('#edit-modules-menu-link-attributes-enable').should('be.checked')
    // Verify Pantheon Advanced Page Cache module was installed and enabled.
    cy.get('#edit-modules-pantheon-advanced-page-cache-enable').should('be.checked')
    // Verify Pathauto module was installed and enabled.
    cy.get('#edit-modules-pathauto-enable').should('be.checked')
    // Verify Redirect module was installed and enabled.
    cy.get('#edit-modules-redirect-enable').should('be.checked')
    // Verify Redirect 404 module was installed and enabled.
    cy.get('#edit-modules-redirect-404-enable').should('be.checked')
    // Verify Redis module was installed and enabled.
    cy.get('#edit-modules-redis-enable').should('be.checked')
    // Verify Simple Sitemap module was installed and enabled.
    cy.get('#edit-modules-simple-sitemap-enable').should('be.checked')
    // Verify Sitemap module was installed and enabled.
    cy.get('#edit-modules-sitemap-enable').should('be.checked')
    // Verify Ultimate Cron module was installed and enabled.
    cy.get('#edit-modules-ultimate-cron-enable').should('be.checked')
  })

  // /**************************************************************
  //  * Configuration Import verification section.
  //  *************************************************************/
  it('Verify Pathauto pattern for menu path is set.', () => {
    cy.login()
    cy.visit('/admin/config/search/path/patterns')
    cy.get('[data-drupal-selector="edit-entities-menu-path"]').should('contain.text', '[node:menu-link:parents:join-path]/[node:title]')
  })

  /**************************************************************
   * Configuration actions verification section.
   *************************************************************/

  it('Visit Automated Cron settings and verify interval is 0.', () => {
    cy.login()
    cy.visit('/admin/config/system/cron')
    cy.get('#edit-interval').should('have.value', '0')
  })
  it('Visit Performance settings and verify cache and preprocess.', () => {
    cy.login()
    cy.visit('/admin/config/development/performance')
    cy.get('#edit-page-cache-maximum-age').should('have.value', '300')
    cy.get('#edit-preprocess-css').should('be.checked')
    cy.get('#edit-preprocess-js').should('be.checked')
  })
  it('Visit Account settings and verify only Administrators can regist accounts.', () => {
    cy.login()
    cy.visit('/admin/config/people/accounts')
    cy.get('#edit-user-register-admin-only').should('be.checked')
  })
  it('Visit the Add menu link page and verify config settings exist.', () => {
    cy.login()
    cy.visit('/admin/structure/menu/manage/main/add?destination=/admin/structure/menu/manage/main')
    cy.get('#edit-attributes-class').should('exist')
    cy.get('#edit-attributes-target').should('exist')
    cy.get('#edit-attributes-container-class').should('exist')
    cy.get('#edit-attributes-container-id').should('exist')
    cy.get('#edit-attributes-id').should('exist')
  })
})
