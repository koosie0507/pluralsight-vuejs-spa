const express = require('express')
const MongoRepository = require('../data/mongoRepository')
const PostMeta = require('../models/post')

function initializePostsRoutes (router) {
  const postsRepo = new MongoRepository('mongodb://mongo:abcd1234@ds016138.mlab.com:16138/tech_posts', 'Post', PostMeta, console.log)
  const postsRoutes = require('./posts')

  postsRoutes.init(router, postsRepo)
}

function initializeApiRoutes (app) {
  var router = express.Router()

  router.get('/', function (req, res) {
    res.json({message: 'API Home'})
  })

  initializePostsRoutes(router)

  app.use('/api', router)
}

module.exports = initializeApiRoutes
