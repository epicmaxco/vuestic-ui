describe("Home Page", () => {
  it("Visit start page and make a screenshot", () => {
    cy.visit("/")
    cy.screenshot()
  });
})
