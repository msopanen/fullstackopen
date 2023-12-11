const Blog = require("../models/blog")
const User = require("../models/user")

const blogsRouter = require("express").Router()

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const users = await User.find({})
    const user = users.pop()

    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params
  const { likes } = request.body
  const blog = {
    likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog,
      { new: true, runValidators: true, context: "query" }
    )
    if(updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
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