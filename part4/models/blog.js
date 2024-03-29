const mongoose = require("mongoose")
const { MONGODB_URI } = require("../utils/config")
const { error, info } = require("../utils/logger")

mongoose.connect(MONGODB_URI).then(() => {
  info("connected to MongoDB")
}).catch(err => {
  error("error connecting to MongoDB:", err.message)
})

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: [true, "title required!"]
  },
  author: {
    type: String,
    minLength: 3
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return /^http:\/\/[A-Za-z0-9_]{2}|^https:\/\/[A-Za-z0-9_]{2}/.test(v)
      },
      message: p => `${p.value} is not a valid url!`
    },
    required: [true, "url required!"]
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog", blogSchema)