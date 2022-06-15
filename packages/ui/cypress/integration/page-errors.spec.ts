/// <reference types="cypress" />
// @ts-ignore
import { components } from '../fixtures/components.json'

beforeEach(() => {
  cy.visit('http://localhost:8080/', {
    onBeforeLoad (win) {
      cy.stub(win.console, 'warn').as('warn')
      cy.stub(win.console, 'error').as('error')
    },
  })
})

it('Page contain components list', () => {
  cy.document().then((doc) => {
    const components = doc.querySelectorAll('.BookComponentListItem')
    expect(components).to.not.be.empty
  })
})

describe('Going through components', () => {
  components.forEach((component: string) => {
    it(`Checking ${component} component`, () => {
      expect(component).is.a('string')
      const title = component.split('-').join('')
      const titleReg = new RegExp(`^${title}`, 'i')
      expect(cy.get('.BookComponentListItem').contains(titleReg)).to.exist
      cy.get('.BookComponentListItem').contains(titleReg).click()
      cy.get('@warn').should('not.be.called')
      cy.get('@error').should('not.be.called')
    })
  })
})
