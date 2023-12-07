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

  test("three blogs are returned as json and identified by id", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(({ body }) => {
        expect(body.length).toEqual(3)
        body.forEach(({ id }) => expect(id).toBeDefined())
      })
  })

  test("new blog is added", async () => {
    const payload = {
      "title": "Biologinen rehunsäilöntä",
      "author": "Artturi Iivari Virtanen",
      "url": "https://xyz",
      "likes": 2
    }
    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .send(payload)
      .expect(201)

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(({ body }) => {
        expect(body.length).toEqual(4)
        body.forEach(({ id }) => expect(id).toBeDefined())
        const blog = helper.pickBlogWithoutId(body, payload.title)
        expect(blog).toEqual(payload)
      })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
