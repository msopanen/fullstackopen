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

const pickBlogWithoutId = (body, expectedTitle) => {
  // eslint-disable-next-line no-unused-vars
  const pick = ({ id, ...rest } = {}) => rest
  return pick(body.find(({ title }) =>
    title === expectedTitle))

}
module.exports = { initialBlogs, pickBlogWithoutId }