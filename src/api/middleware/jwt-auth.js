const config = require('../config')
const jwt = require('jsonwebtoken')

function verifyJwtMiddleware (req, res, next) {
  if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader.replace('Bearer ', '')
      req.user = jwt.verify(token, config.JWT_SECRET)
    } catch (err) {
      return res.status(401).json({
        message: 'failed to process JSON web token',
        details: err
      })
    }
  } else {
    return res.status(401).json({
      message: 'missing token'
    })
  }
  next()
}

module.exports = verifyJwtMiddleware
