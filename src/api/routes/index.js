const express = require('express')
const MongoRepository = require('../data/mongoRepository')
const PostMeta = require('../models/post')
const postsRepo = new MongoRepository('mongodb://mongo:abcd1234@ds016138.mlab.com:16138/tech_posts', 'Post', PostMeta, console.log)
const UserMeta = require('../models/user')
const userRepo = new MongoRepository('mongodb://mongo:abcd1234@ds016138.mlab.com:16138/tech_posts', 'User', UserMeta, console.log)

function initializeApiRoutes (app) {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.json({message: 'API Home'})
  })

  require('./auth').init(router, userRepo)
  require('./users').init(router, userRepo)
  require('./posts').init(router, postsRepo)

  app.use('/api', router)
}

module.exports = initializeApiRoutes
