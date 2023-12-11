const Blog = require("../models/blog")

const initialBlogs = [
  {
    "title": "Kaminan lämmitys",
    "author": "Vaino Linna",
    "url": "https://xyz",
    "likes": 5
  },
  {
    "title": "Perunateatteri",
    "author": "Vaino Linna",
    "url": "https://xyz",
    "likes": 4
  },
  {
    "title": "Montun kaivuu",
    "author": "Stephen King",
    "url": "https://xyz",
    "likes": 3
  }
]

const pickBlogById = (blogs, expectedId) => {
  return blogs.find(({ id }) =>
    id === expectedId)
}

const pickBlogByTitle = (blogs, expectedTitle) => {
  return blogs.find(({ title }) =>
    title === expectedTitle)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  pickBlogById,
  pickBlogByTitle,
  blogsInDb
}
