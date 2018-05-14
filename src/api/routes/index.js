const express = require('express')
const MongoRepository = require('../data/mongoRepository')
const PostMeta = require('../models/post')
const UserMeta = require('../models/user')

function initializePostsRoutes (router) {
  const postsRepo = new MongoRepository('mongodb://mongo:abcd1234@ds016138.mlab.com:16138/tech_posts', 'Post', PostMeta, console.log)
  const postsRoutes = require('./posts')

  postsRoutes.init(router, postsRepo)
}

function initializeUserRoutes (router) {
  const userRepo = new MongoRepository('mongodb://mongo:abcd1234@ds016138.mlab.com:16138/tech_posts', 'User', UserMeta, console.log)
  const userRoutes = require('./users')

  userRoutes.init(router, userRepo)
}

function initializeApiRoutes (app) {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.json({message: 'API Home'})
  })

  initializePostsRoutes(router)
  initializeUserRoutes(router)

  app.use('/api', router)
}

module.exports = initializeApiRoutes
