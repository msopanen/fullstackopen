const bcrypt = require("bcrypt")
const User = require("../models/user")

const initTestUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("hyshys", 10)
  const user = new User({ username: "root", passwordHash })

  await user.save()
}

const usersInDbByUsername = async (username) => {
  const user = await User.findOne({ username })
  return user.toJSON()
}

const usersInDb = async () => {
  const user = await User.find({})
  return user.map(r => r.toJSON())
}

module.exports = {
  initTestUser,
  usersInDbByUsername,
  usersInDb
}