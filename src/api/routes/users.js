const {returnRepoData, getSecurePassword} = require('./utils')
const {exists, nonEmptyString, firstError, findDuplicateAsync} = require('../validation/validators')

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

    const promise = Promise.all([
      findDuplicateAsync(repo, {'email': user.email}, `email '${user.email}' already exists in the database`),
      findDuplicateAsync(repo, {'name': user.name}, `user '${user.name}' already exists in the database`)])
      .then(function canCreateUser () {
        Object.assign(user, getSecurePassword(user.password))
        return repo.new(user)
      })

    returnRepoData(res, promise, console.log, {
      successCode: 201
    })
  })

  router.use('/users', usersRouter)
}

module.exports = { init }
