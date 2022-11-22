describe('Check h1 at home page', function () {
  it ("Test should fail :)", () => {
    cy.visit('/')
    cy.get('h1').contains('Fail test header').should('be.false')
  })
});
