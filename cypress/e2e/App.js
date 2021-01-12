describe("App", () => {
  it("should show books list", () => {
    cy.visit("/");
    cy.findAllByTestId("book-element").its("length").should("be.gt", 1);
  });

  it("should show 20 books", () => {
    cy.visit("/");
    cy.findAllByTestId("book-element");
    cy.should("have.length", 20);
  });

  it("should show pagination element", () => {
    cy.visit("/");
    cy.findByTestId("pagination-element");
    cy.should("exist");
  });

  it("should update a query string on pagination changed", () => {
    cy.visit("/");
    cy.findByText(/^2$/).click();
    cy.url().should("include", "page=2");
  });
});
