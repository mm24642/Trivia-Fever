const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    gamesPlayed: user.gamesPlayed,
    correctAnswers: user.correctAnswers
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, gamesPlayed: user.gamesPlayed, correctAnswers: user.correctAnswers })
})

module.exports = loginRouter