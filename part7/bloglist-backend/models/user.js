const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { MONGODB_URI } = require("../utils/config");
const { error, info } = require("../utils/logger");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    error("error connecting to MongoDB:", err.message);
  });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
