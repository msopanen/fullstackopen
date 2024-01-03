const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const { userValidator } = require("../utils/middlewares");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}, { username: 1, name: 1 }).populate(
      "blogs",
      { url: 1, title: 1, author: 1, id: 1 },
    );
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", userValidator, async (request, response, next) => {
  const { username, name, password } = request.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
