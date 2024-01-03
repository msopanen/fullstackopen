const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./users_test_helpers");
const api = supertest(app);

describe("with initial user in DB", () => {
  beforeEach(async () => {
    await helper.initTestUser();
  });

  test("list all users username and id", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        body.forEach(({ username, id, notes, passwordHash }) => {
          expect(username).toBeDefined();
          expect(id).toBeDefined();
          expect(notes).not.toBeDefined();
          expect(passwordHash).not.toBeDefined();
        });
      });
  });

  describe("addition of new user", () => {
    test("succeeds for unique username and returns user data without passwordHash with HTTP status 201 ", async () => {
      const payload = {
        username: "avirtanen",
        name: "Artturi Iivari Virtanen",
        password: "a1v",
      };

      await api
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(payload)
        .expect(201);

      const addedUser = await helper.usersInDbByUsername(payload.username);

      expect(addedUser.name).toEqual(payload.name);
      expect(addedUser.username).toEqual(payload.username);
      expect(addedUser.id).toBeDefined();
      expect(addedUser.blogs).toBeDefined();
      expect(addedUser.passwordHash).not.toBeDefined();
    });

    test("fails for existing username with error message and HTTP status 400", async () => {
      const usersBefore = await helper.usersInDb();

      const payload = {
        username: "avirtanen",
        password: "a1v",
      };
      // NOTE: Just wanted to demonstrate looping over
      // async/await fn that doesn't work with forEach.
      for await (const status of [201, 400]) {
        const result = await api
          .post("/api/users")
          .set("Content-Type", "application/json")
          .send(payload)
          .expect(status);

        if (status === 400) {
          expect(result.body.error).toContain(
            "expected `username` to be unique",
          );
        }
      }

      // Veriry that only one new user is added
      const usersAfter = await helper.usersInDb();
      expect(usersBefore.length + 1).toEqual(usersAfter.length);
    });

    test("fails for too short username with error message and HTTP status 400", async () => {
      const usersBefore = await helper.usersInDb();

      const payload = {
        username: "av",
        password: "a1v",
      };

      const result = await api
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(payload)
        .expect(400);

      expect(result.body.error).toContain(
        "expected 'username' and 'password' min lenght 3",
      );

      // Veriry that no new users added
      const usersAfter = await helper.usersInDb();
      expect(usersBefore.length).toEqual(usersAfter.length);
    });

    test("fails for too short password with error message and HTTP status 400", async () => {
      const usersBefore = await helper.usersInDb();

      const payload = {
        username: "aiv",
        password: "a1",
      };

      const result = await api
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(payload)
        .expect(400);

      expect(result.body.error).toContain(
        "expected 'username' and 'password' min lenght 3",
      );

      // Veriry that no new users added
      const usersAfter = await helper.usersInDb();
      expect(usersBefore.length).toEqual(usersAfter.length);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
