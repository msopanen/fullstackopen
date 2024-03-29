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
    cy.visit("");
  });

  describe("when not logged in", function () {
    it("login form is shown", function () {
      cy.visit("");
      cy.contains("Log in to application");
    });

    describe("login", function () {
      it("succeeds with correct credentials", function () {
        cy.contains("Log in to application").click();
        cy.get("#username-input").type("atester");
        cy.get("#password-input").type("s3cr3t");
        cy.get("#login-button").click();

        cy.contains("Cypress Tester A logged in");
      });

      it("fails with wrong credentials", function () {
        cy.contains("Log in to application").click();
        cy.get("#username-input").type("atester");
        cy.get("#password-input").type("wrong-password");
        cy.get("#login-button").click();

        // Verify notification
        cy.get(".notification").should("contain", "wrong username or password");
        cy.get(".notification").should("have.css", "color", "rgb(95, 33, 32)");
        cy.get(".notification").should("have.css", "border-style", "none");

        cy.contains("Cypress Tester A logged in").should("not.exist");
      });
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "atester", password: "s3cr3t" });
    });

    it("a blog can be created", function () {
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
      cy.get(".notification").should("have.css", "color", "rgb(30, 70, 32)");
      cy.get(".notification").should("have.css", "border-style", "none");
      // Verify blog list
      cy.contains("cypress testing");
    });

    it("a blog can be liked", function () {
      cy.createBlog({
        title: "do you like cypress testing?",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
      });

      cy.get("#details-toggle-button").click();

      cy.contains("likes: 0");

      cy.get("#like-button").click();

      cy.contains("likes: 1");
      cy.get("#remove-button").should("exist");
    });

    it("a blog can be removed", function () {
      // NOTE: blog will be create as a logged in user that is
      // atester by default
      cy.createBlog({
        title: "this blog will be removed",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
      });

      cy.contains("this blog will be removed");

      cy.get("#remove-button").click();

      cy.contains("this blog will be removed").should("not.exist");
    });

    it("remove blog button is visible only for a user who has created it", function () {
      // NOTE: blog will be create as a logged in user that is
      // atester by default
      cy.createBlog({
        title: "this blog can be removed only by atester",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
      });

      cy.get("#remove-button").should("exist");

      cy.login({ username: "btester", password: "s3cr3t" });

      cy.get("#remove-button").should("not.exist");
    });

    it("sorts blogs according to likes", function () {
      cy.createBlog({
        title: "blog_a",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
        likes: 1,
      });

      cy.createBlog({
        title: "blog_b",
        author: "Cypress Tester",
        url: "https://blogs-test-url",
        likes: 0,
      });
      // Verify initial expected sort
      cy.get(".blog").eq(0).should("contain", "blog_a");
      cy.get(".blog").eq(1).should("contain", "blog_b");

      cy.get(".blog").eq(1).should("contain", "blog_b").as("blogB");

      cy.get("@blogB").find("#details-toggle-button").click();
      cy.get("@blogB").find("#like-button").as("blogBLikeButton");

      cy.get("@blogBLikeButton").click();
      // Verify when likes are equal
      cy.get(".blog").eq(0).should("contain", "blog_a");
      cy.get(".blog").eq(1).should("contain", "blog_b");

      cy.get("@blogBLikeButton").click();
      // Verify when b has more likes
      cy.get(".blog").eq(0).should("contain", "blog_b");
      cy.get(".blog").eq(1).should("contain", "blog_a");
    });
  });
});
