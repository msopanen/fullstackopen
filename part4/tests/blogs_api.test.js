const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./blogs_test_helpers")

const api = supertest(app)

describe("with initial blogs in DB", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

    test("fails for malformed id with HTTP status 400 without delete", async () => {
      const blogs = await helper.blogsInDb()
      expect(blogs.length).toEqual(3)
      const invalidId = "xyz"
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)

      const blogsAfterDel = await helper.blogsInDb()
      expect(blogsAfterDel.length).toEqual(3)
    })
  })

  describe("update of the blog in DB", () => {
    test("succeeds for valid id and likes prop with HTTP status 200", async () => {
      const blogs = await helper.blogsInDb()
      const blogToBeUpdated = blogs.pop()

      const updatedLikes = blogToBeUpdated.likes + 100

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .set("Content-Type", "application/json")
        .send({
          likes: updatedLikes
        })
        .expect(200)

      const blogsAfterUpdate = await helper.blogsInDb()
      const updatedBlog = helper.pickBlogById(blogsAfterUpdate, blogToBeUpdated.id)
      expect(updatedBlog.likes).toEqual(updatedLikes)
    })

    test("fails for invalid id with HTTP status 404", async () => {
      const invalidId = "000000000000000000000000"
      await api
        .put(`/api/blogs/${invalidId}`)
        .set("Content-Type", "application/json")
        .send({
          likes: 999
        })
        .expect(404)
    })

    test("fails for malformed id with HTTP status 400", async () => {
      const invalidId = "xyz"
      await api
        .put(`/api/blogs/${invalidId}`)
        .set("Content-Type", "application/json")
        .send({
          likes: 999
        })
        .expect(400)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
