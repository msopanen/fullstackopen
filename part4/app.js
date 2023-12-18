const express = require("express")
const app = express()
const cors = require("cors")

const loginRouter = require("./controllers/login")
const usersRouter = require("./controllers/users")
const blogsRouter = require("./controllers/blogs")

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middlewares")

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)


// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app