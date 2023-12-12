const bcrypt = require("bcrypt")
const User = require("../models/user")

const TEST_PWD = "hyshys"
const TEST_USER = "root"

const initTestUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(TEST_PWD, 10)
  const user = new User({ username: TEST_USER, passwordHash })

  await user.save()

  return user._id.toString()
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
  TEST_PWD,
  TEST_USER,
  initTestUser,
  usersInDbByUsername,
  usersInDb
}