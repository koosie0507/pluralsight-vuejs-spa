const {returnRepoData, getSecurePassword} = require('./utils')
const {exists, nonEmptyString, firstError, findDuplicateAsync} = require('../validation/validators')

function _getUserProfile (req, res) {
  if (!req.user) {
    return res.status(403).json({message: 'not authenticated'})
  }
  return this.repo.get({name: req.user.name})
    .then(data => {
      const result = {
        name: data.name,
        sandwich: data.sandwich,
        role: data.role,
        email: data.email
      }
      return res.status(200).json(result)
    })
}

function init (router, repo) {
  var usersRouter = require('express').Router()

  usersRouter.get('/profile', require('../middleware/jwt-auth'), _getUserProfile.bind({repo}))
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
