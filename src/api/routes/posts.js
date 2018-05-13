const PostMeta = require('../models/post')

function init(router, repo) {
  const PostRepo = repo.model('Post', PostMeta)

  var postsRouter = require('express').Router()
  postsRouter.get('/', function (req, res) {
    PostRepo.find(function (err, data) {
      if (err) {
        res.status(400).json(err)
      } else {
        res.json(data)
      }
    })
  })
  postsRouter.post('/', function (req, res) {
    const item = new PostRepo(req.body)
    item.save(function (err, saved) {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(saved)
      }
    })
  })
  postsRouter.put('/:id', function (req, res) {
    const postId = req.params.id
    if (!req.body) {
      res.status(400).json({message: 'must have some data'})
    } else if (!postId) {
      res.status(400).json({message: 'must provide id'})
    } else {
      PostRepo.findOne({id: postId}, function (err, post) {
        if (err) {
          res.status(400).json(err)
        } else {
          Object.assign(post, req.body)
          post.save(function (err, post) {
            if (err) {
              res.status(400).json(err)
            } else {
              res.json(post)
            }
          })
        }
      })
    }
  })
  router.use('/posts', postsRouter)
}

module.exports = {
  init: init
}
