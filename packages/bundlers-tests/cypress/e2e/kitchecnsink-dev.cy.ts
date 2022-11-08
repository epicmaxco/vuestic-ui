describe("Kitchensink page", () => {
  beforeEach(() => {
    cy.visit("/en/getting-started/kitchensink", {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("errorLogged");
      },
    });
  })

  it("Check h1 text", () => {
    cy.get("h1").should("contain", "Kitchensink");
  });

  it('Should be no errors in console', () => {
    cy.get('@errorLogged').should('not.be.called')
  })
});
