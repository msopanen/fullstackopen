describe("blog list spec", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // create here a user to backend
    cy.visit("http://localhost:5173");
  });

  it("login form is shown", () => {
    cy.visit("http://localhost:5173");
    cy.contains("log in to application");
  });
});
