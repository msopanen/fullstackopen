describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const aUser = {
      username: "atester",
      name: "Cypress Tester A",
      password: "s3cr3t",
    };
    cy.request("POST", "http://localhost:3001/api/users", aUser);
    const bUser = {
      username: "btester",
      name: "Cypress Tester B",
      password: "s3cr3t",
    };
    cy.request("POST", "http://localhost:3001/api/users", bUser);
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
        cy.get("#username-input").type("atester");
        cy.get("#password-input").type("s3cr3t");
        cy.get("#login-button").click();

        cy.contains("Cypress Tester A logged in");
      });

      it("fails with wrong credentials", function () {
        cy.contains("log in to application").click();
        cy.get("#username-input").type("atester");
        cy.get("#password-input").type("wrong-password");
        cy.get("#login-button").click();

        // Verify notification
        cy.get(".notification").should("contain", "wrong username or password");
        cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
        cy.get(".notification").should("have.css", "border-style", "solid");

        cy.contains("Cypress Tester A logged in").should("not.exist");
      });
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "atester", password: "s3cr3t" });
    });

    it("A blog can be created", function () {
      cy.get("#create-toggle-button").click();

      cy.get('input[placeholder*="blog title"]').type("cypress testing");
      cy.get('input[placeholder*="blog author"]').type("Cypress Tester");
      cy.get('input[placeholder*="blog url"]').type("https://blogs-test-url");

      cy.get("#create-blog-button").click();

      // Verify notification
      cy.get(".notification").should(
        "contain",
        "a new blog cypress testing added",
      );
      cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notification").should("have.css", "border-style", "solid");
      // Verify blog list
      cy.contains("cypress testing");
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "do you like cypress testing?",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
      });

      cy.get("#details-toggle-button").click();

      cy.contains("likes: 0");

      cy.get("#like-button").click();

      cy.contains("likes: 1");
    });

    it("A blog can be removed", function () {
      // NOTE: blog will be create as a logged in user that is atester
      cy.createBlog({
        title: "this blog will be removed",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
      });

      cy.contains("this blog will be removed");

      cy.get("#remove-button").click();

      cy.contains("this blog will be removed").should("not.exist");
    });
  });
});
