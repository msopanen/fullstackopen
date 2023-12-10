const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const helper = require("./users_test_helpers")

const api = supertest(app)

describe("with initial users in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test("list all users username, name and id", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(({ body }) => {
        expect(body.length).toEqual(1)
        body.forEach(({ username, name, id, notes, passwordHash }) => {
          expect(username).toBeDefined()
          expect(name).toBeDefined()
          expect(id).toBeDefined()
          expect(notes).not.toBeDefined()
          expect(passwordHash).not.toBeDefined()
        })
      })
  })

  test("succeeds to add new user and retuns user data without passwordHash with HTTP status 201 ", async () => {
    const payload = {
      "username": "avirtanen",
      "name": "Artturi Iivari Virtanen",
      "password": "a1v"
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(payload)
      .expect(201)

    const addedUser = await helper.usersInDbByUsername(payload.username)

    expect(addedUser.name).toEqual(payload.name)
    expect(addedUser.username).toEqual(payload.username)
    expect(addedUser.id).toBeDefined()
    expect(addedUser.notes).toBeDefined()
    expect(addedUser.passwordHash).not.toBeDefined()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})