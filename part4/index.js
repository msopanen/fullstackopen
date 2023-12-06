require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model("Blog", blogSchema)

// eslint-disable-next-line no-undef
const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post("/api/blogs", (request, response) => {
  console.log({ body: request.body })
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})