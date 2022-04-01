/// <reference types="cypress" />

describe('main', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/', {
      onBeforeLoad (win) {
        cy.stub(win.console, 'warn').as('warn')
        cy.stub(win.console, 'error').as('error')
      },
    })
  })

  it('page has no errors', () => {
    cy.get('.BookComponentListItem').click({ multiple: true })

    cy.get('@warn').should('not.be.called')
    cy.get('@error').should('not.be.called')
  })
})
