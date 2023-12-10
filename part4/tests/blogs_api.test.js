const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blogs = require("../models/blog")
const helper = require("./test_helpers")

const api = supertest(app)

describe("with initial blogs in DB", () => {
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

  describe("addition of new blog to the DB", () => {
    test("succeeds with valid blog data", async () => {
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

    test("succeeds wihout likes prop and likes defaults to value 0", async () => {
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
      ])("fails to missing '%s' prop with HTTP status 400", async (prop) => {
      await api
        .post("/api/blogs")
        .set("Content-Type", "application/json")
        .send({ ...payload, [prop]: undefined })
        .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toEqual(3)
    })
  })

  describe("deletion of blog from the DB", () => {
    test("succeeds for valid id with HTTP status 204", async () => {
      const blogs = await helper.blogsInDb()
      expect(blogs.length).toEqual(3)
      const blogToBeDeleted = blogs.pop()

      await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .expect(204)

      const blogsAfterDel = await helper.blogsInDb()
      expect(blogsAfterDel.length).toEqual(2)
      expect(blogsAfterDel).not.toContain(blogToBeDeleted)
    })

    test("succeeds for invalid id with HTTP status 204 without delete", async () => {
      const blogs = await helper.blogsInDb()
      expect(blogs.length).toEqual(3)
      const invalidId = "000000000000000000000000"
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(204)

      const blogsAfterDel = await helper.blogsInDb()
      expect(blogsAfterDel.length).toEqual(3)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
