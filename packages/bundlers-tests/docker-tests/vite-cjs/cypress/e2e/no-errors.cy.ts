describe("Test that there are no errors on start page", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("errorLogged");
      },
    });
  })

  it('Should be no errors in console', () => {
    cy.get('@errorLogged').should('not.be.called')
  })
});
