const jwt = require("jsonwebtoken")

const User = require("../models/user")
const { SECRET } = require("../utils/config")
const logger = require("./logger")

const requestLogger = (request, _, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "UserPasswordValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired"
    })
  }

  next(error)
}

const userValidator = (request, response, next) => {
  const { username, password } = request.body

  try {
    if(username.length < 3 || password.length < 3) {
      const e = new Error(`expected 'username' and 'password' min lenght 3 
      : username length: ${username.length} password length: ${password.length}`)
      e.name = "UserPasswordValidationError"
      throw e
    }
    next()
  } catch (error) {
    next(error)
  }
}

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get("authorization")
  if (/^bearer /i.test(authHeader)) {
    request.token = authHeader.replace(/bearer /ig, "")
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, SECRET)
    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  userExtractor,
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userValidator
}