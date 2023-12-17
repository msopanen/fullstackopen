describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      username: "ctester",
      name: "Cypress Tester",
      password: "s3cr3t",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:5173");
  });

  describe("when not logged in", function () {
    it("login form is shown", function () {
      cy.visit("http://localhost:5173");
      cy.contains("log in to application");
    });

    describe("login", function () {
      it("succeeds with correct credentials", function () {
        cy.contains("log in to application").click();
        cy.get("#username-input").type("ctester");
        cy.get("#password-input").type("s3cr3t");
        cy.get("#login-button").click();

        cy.contains("Cypress Tester logged in");
      });

      it("fails with wrong credentials", function () {
        cy.contains("log in to application").click();
        cy.get("#username-input").type("ctester");
        cy.get("#password-input").type("wrong-password");
        cy.get("#login-button").click();

        cy.get(".notification").should("contain", "wrong username or password");
        cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
        cy.get(".notification").should("have.css", "border-style", "solid");

        cy.contains("Cypress Tester logged in").should("not.exist");
      });
    });
  });
});
