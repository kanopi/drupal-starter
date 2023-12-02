describe('Basic Drupal system checks.', () => {
  it('Administration checks.', () => {
    // Current user is an admin.
    cy.login()
    cy.visit('/admin/people/role-settings')
    cy.get('#edit-user-admin-role').find('option:selected').should('contain', 'Administrator')
    // Redis should be available.
    cy.visit('/admin/reports/redis')
    cy.get('.system-status-report .system-status-report__entry__value').should('contain', 'Connected')
    // Basic Drupal performance options set.
    cy.visit('/admin/config/development/performance')
    cy.get('#edit-preprocess-css').should('be.checked')
    cy.get('#edit-preprocess-js').should('be.checked')
    cy.get('#edit-page-cache-maximum-age').find('option:selected').should('not.contain', 'no caching')
  })
})
