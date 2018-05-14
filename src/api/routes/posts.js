function returnRepoData (res, promise, errorLogger, options) {
  const successCode = options && options.successCode ? options.successCode : 200
  const errorCode = options && options.errorCode ? options.errorCode : 400
  return promise
    .then(function onRepoDataSuccess (data) {
      res.status(successCode).json(data)
    })
    .catch(function onRepoDataFailure (err) {
      res.status(errorCode).json(err)
      errorLogger(err)
    })
}

function init (router, repo) {
  var postsRouter = require('express').Router()

  postsRouter.get('/', function (req, res) {
    returnRepoData(res, repo.list(), console.log)
  })

  postsRouter.post('/', function (req, res) {
    returnRepoData(res, repo.new(req.body), console.log, {
      successCode: 201
    })
  })

  postsRouter.put('/:id', function (req, res) {
    const postId = req.params.id
    if (!req.body) {
      res.status(400).json({message: 'must have some data'})
    } else if (!postId) {
      res.status(400).json({message: 'must provide id'})
    } else {
      returnRepoData(res, repo.save(req.body, e => postId), console.log, {
        successCode: 200,
        errorCode: 404
      })
    }
  })

  router.use('/posts', postsRouter)
}

module.exports = {
  init: init
}
