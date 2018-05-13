function init(router, repo) {
  var postsRouter = require('express').Router()
  postsRouter.get(function (req, res) {
    res.json({message: 'got posts'})
  })
  router.use('/posts', postsRouter)
}

module.exports = {
  init: init
}
