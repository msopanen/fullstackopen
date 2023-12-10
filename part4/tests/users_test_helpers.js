const User = require("../models/user")

const initialUsers = [
  {
    "username": "vlinna",
    "name": "Vaino Linna",
    "passwordHash": "$2b$10$e7TWthKXGdo1UAHrv/C0xu2ijOrmnbznqvZLhYw4DlU2i1ekuwauu",
    "notes": []
  }
]

const usersInDbByUsername = async (username) => {
  const user = await User.findOne({ username })
  return user.toJSON()
}

module.exports = { initialUsers, usersInDbByUsername }