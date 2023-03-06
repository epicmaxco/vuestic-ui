describe("Home Page", () => {
  it("Visit start page and make a screenshot", () => {
    cy.visit("/")
    cy.screenshot()
  });

  it("Visit tmp page", () => {
    cy.visit("/tmp")
    cy.screenshot()
  });
})
