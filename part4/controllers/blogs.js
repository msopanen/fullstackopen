const Blog = require("../models/blog")

const blogsRouter = require("express").Router()

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch(err => next(err))
})

blogsRouter.delete("/:id", async (req, response, next) => {
  const { id } = req.params
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter