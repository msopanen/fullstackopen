// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs = []) => {
  return blogs.reduce((sum, b) => sum += b.likes, 0)
}

const favoriteBlog = (blogs = []) => {
  // eslint-disable-next-line no-unused-vars
  const pick = ({ __v, _id, url, ...rest }) => rest
  return blogs.reduce((f,b) => {
    if(!f) {
      f = pick(b)
    }
    else if(f.likes < b.likes) {
      f = pick(b)
    }
    return f
  }, null)
}

module.exports = { dummy, totalLikes, favoriteBlog }