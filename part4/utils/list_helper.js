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
    if(!f || f.likes < b.likes) {
      f = pick(b)
    }
    return f
  }, null)
}

const mostBlogs = (blogs = []) => {
  const topBlogers = blogs.reduce((acc, b) => {
    // Add author to acc if not exists
    if (!acc[b.author]) {
      acc[b.author] = { blogs: 0 }
    }
    // Update sum of blogs per author
    acc[b.author].blogs++
    // Update top blogs author if new high score found
    // in same reduce loop to optimize performance
    // NOTE: if many authors has same amount of the blogs
    // first found is set.
    if(acc.blogs < acc[b.author].blogs) {
      acc.author = b.author
      acc.blogs = acc[b.author].blogs
    }
    return acc
  }, { blogs: 0 })

  return { author: topBlogers.author, blogs: topBlogers.blogs }
}

const mostLikes = (blogs = []) => {
  const topLikes = blogs.reduce((acc, b) => {
    // Add author to acc if not exists
    if (!acc[b.author]) {
      acc[b.author] = { likes: 0 }
    }
    // Update sum of likes per author
    acc[b.author].likes += b.likes
    // Update top likes author if new high score found
    // in same reduce loop to optimize performance
    // NOTE: if many authors has same amount of the likes
    // first found is set.
    if(acc.likes < acc[b.author].likes) {
      acc.author = b.author
      acc.likes = acc[b.author].likes
    }
    return acc
  }, { likes: 0 })

  return { author: topLikes.author, likes: topLikes.likes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }