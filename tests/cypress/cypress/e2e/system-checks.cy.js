
describe('Check Drupal site settings', () => {

  it('Default admin role should be set', () => {
    cy.login()
    cy.visit('/admin/people/role-settings')
    cy.get('#edit-user-admin-role').find('option:selected').should('contain', 'Administrator')
  })

  it('Redis should be available', () => {
    cy.login()
    cy.visit('/admin/reports/redis')
    cy.get('.system-status-report .system-status-report__entry__value').should('contain', 'Connected')
  })


  it('Basic Drupal performance options set', () => {
    cy.login()
    cy.visit('/admin/config/development/performance')
    cy.get('#edit-preprocess-css').should('be.checked')
    cy.get('#edit-preprocess-js').should('be.checked')
    cy.get('#edit-page-cache-maximum-age').find('option:selected').should('not.contain', 'no caching')
  })




})
