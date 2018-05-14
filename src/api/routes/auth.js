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
      res.status(200).send(`user '${user.name}' verified`)
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
