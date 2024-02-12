describe('Verify the Saplings Launch recipe applied properly.', () => {

  /**************************************************************
   * Module install and verification section.
   *************************************************************/
  it('Verify all core modules were installed and enabled.', () => {
    // Login and visit the extend/modules page.
    cy.login()
    cy.visit('/admin/modules')
    // Verify Tour module was installed and enabled.
    cy.get('#edit-modules-tour-enable').should('be.checked')
  })

  it('Verify all contrib modules were installed and enabled.', () => {
    // Login and visit the extend/modules page.
    cy.login()
    cy.visit('/admin/modules')
    // Verify ClamAV Anti-Virus module was installed and enabled.
    cy.get('#edit-modules-clamav-enable').should('be.checked')
    // Verify Launch Checklist module was installed and enabled.
    cy.get('#edit-modules-launch-checklist-enable').should('be.checked')
    // Verify Resource Hints module was installed and enabled.
    cy.get('#edit-modules-resource-hints-enable').should('be.checked')
    // Verify SEO Checklist module was installed and enabled.
    cy.get('#edit-modules-seo-checklist-enable').should('be.checked')
    // Verify Search and Replace Scanner module was installed and enabled.
    cy.get('#edit-modules-scanner-enable').should('be.checked')
    // Verify Security Kit module was installed and enabled.
    cy.get('#edit-modules-seckit-enable').should('be.checked')
    // Verify Security Review module was installed and enabled.
    cy.get('#edit-modules-security-review-enable').should('be.checked')
    // Verify Unused Modules module was installed and enabled.
    cy.get('#edit-modules-unused-modules-enable').should('be.checked')
  })
})
