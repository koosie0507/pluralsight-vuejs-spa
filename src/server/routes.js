const express = require('express')

function initializeApiRoutes (app) {
  var router = express.Router()
  router.get('/', function (req, res) {
    res.json({message: 'API Home'})
  })
  app.use('/api', router)
}

module.exports = initializeApiRoutes
