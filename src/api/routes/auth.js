const jwt = require('jsonwebtoken')
const config = require('../config')
const {getPasswordHash} = require('./utils')
const {nonEmptyString, firstError} = require('../validation/validators')

function _login (req, res) {
  const login = req.body
  const validation = firstError(
    nonEmptyString(login.name, 'please provide user name'),
    nonEmptyString(login.password, 'please provide password')
  )
  if (!validation.isValid) {
    res.status(400).json(validation)
  }

  this.repo.get({name: login.name})
    .then((user) => {
      if (!user) {
        const err = {'message': `user '${login.name}' doesn't exist`}
        throw err
      }
      return user
    })
    .then((user) => {
      const dbPass = user.password
      const dbSalt = user.salt
      const test = getPasswordHash(login.password, dbSalt)
      if (dbPass !== test) {
        const err = {'message': 'invalid user name or password'}
        throw err
      }
      return user
    })
    .then((user) => {
      const token = jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role
      }, config.JWT_SECRET, { expiresIn: 60 * 60 })
      const verified = jwt.verify(token, config.JWT_SECRET)
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        sandwich: user.sandwich,
        role: user.role,
        expiration: verified.exp,
        token
      }
      res.status(200).json(payload)
    })
    .catch((err) => {
      res.status(401).json(err)
    })
}

function _logout (req, res) {
  res.status(200).send('logged out')
}

function init (router, repo) {
  const authRouter = require('express').Router()
  const context = { repo }
  authRouter.post('/login', _login.bind(context))
  authRouter.post('/logout', _logout.bind(context))

  router.use('/auth', authRouter)
}

module.exports = { init }
