/// <reference types="cypress" />

describe('main', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('page has no errors', () => {
    cy.get('.BookComponentListItem').click({ multiple: true })

    cy.window().then((win) => {
      expect(win.console.error).to.have.callCount(0)
      expect(win.console.warn).to.have.callCount(0)
    })
  })
})
