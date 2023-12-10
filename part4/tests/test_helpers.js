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

const pickBlogByTitle = (blogs, expectedTitle) => {
  return blogs.find(({ title }) =>
    title === expectedTitle)
}

const pickBlogByTitleWithoutId = (blogs, expectedTitle) => {
  // eslint-disable-next-line no-unused-vars
  const pick = ({ id, ...rest } = {}) => rest
  return pick(pickBlogByTitle(blogs, expectedTitle))
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  pickBlogByTitle,
  pickBlogByTitleWithoutId,
  blogsInDb
}
