const mongoose = require("mongoose")
const { MONGODB_URI } = require("../utils/config")
const { error, info } = require("../utils/logger")

mongoose.connect(MONGODB_URI).then(() => {
  info("connected to MongoDB")
}).catch(err => {
  error("error connecting to MongoDB:", err.message)
})

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
})

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model("User", userSchema)