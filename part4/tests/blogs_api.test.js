const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blogs = require("../models/blog")
const helper = require("./test_helpers")

const api = supertest(app)

describe("blogs api", () => {
  beforeEach(async () => {
    await Blogs.deleteMany({})
    await Blogs.insertMany(helper.initialBlogs)
  })

  test("three blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(res.body.length).toEqual(3)
      })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})