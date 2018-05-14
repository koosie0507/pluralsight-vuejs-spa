const {returnRepoData, getSecurePassword} = require('./utils')
const {exists, nonEmptyString, firstError} = require('../validation/validators')

function init (router, repo) {
  var usersRouter = require('express').Router()

  usersRouter.post('/', function (req, res) {
    const user = req.body
    const validation = firstError(
      exists(user, 'please supply user'),
      nonEmptyString(user.name, 'please provide user name'),
      nonEmptyString(user.password, 'please provide password'),
      nonEmptyString(user.email, 'please provide e-mail')
    )
    if (!validation.isValid) {
      res.status(400).json(validation)
      return
    }
    Object.assign(user, getSecurePassword(user.password))
    returnRepoData(res, repo.new(user), console.log, {
      successCode: 201
    })
  })

  router.use('/users', usersRouter)
}

module.exports = { init }
