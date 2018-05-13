const express = require('express')
const posts = require('./routes/posts')

function initializeApiRoutes (app) {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.json({message: 'API Home'})
  })

  posts.init(router, app.store)

  app.use('/api', router)
}

module.exports = initializeApiRoutes
