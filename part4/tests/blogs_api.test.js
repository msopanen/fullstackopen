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

  const payload = {
    "title": "Biologinen rehunsäilöntä",
    "author": "Artturi Iivari Virtanen",
    "url": "https://xyz",
    "likes": 1
  }

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

  test("of new blog", async () => {
    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .send(payload)
      .expect(201)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(4)
    blogs.forEach(({ id }) => expect(id).toBeDefined())
    const blog = helper.pickBlogByTitleWithoutId(blogs, payload.title)
    expect(blog).toEqual(payload)
  })

  test("of new blog likes defaults to value 0", async () => {
    const payload = {
      "title": "Kemiallinen kasvinsuojelu",
      "author": "Monsanto",
      "url": "https://xyz",
    }
    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .send(payload)
      .expect(201)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(4)
    blogs.forEach(({ id }) => expect(id).toBeDefined())
    const blog = helper.pickBlogByTitleWithoutId(blogs, payload.title)
    expect(blog).toEqual({ ...payload, likes: 0 })
  })

  test.each(
    [["title"],
      ["url"]
    ])("of new blog missing %s error", async (prop) => {
    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .send({ ...payload, [prop]: undefined })
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(3)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
