const crypto = require('crypto')

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

function _genRandomString (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function _sha512 (password, salt) {
  var hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  var password = hash.digest('hex')
  return { password, salt }
}

/**
 * stores a password securely by hashing it with a random salt and the SHA512 cypher
 * @param {string} password a string which will be hashed with SHA512
 * @returns {object} with two properties: salt (a random salt) and passwordHash (the hashed password)
 */
function getSecurePassword (password) {
  return _sha512(password, _genRandomString(16))
}
module.exports = {returnRepoData, getSecurePassword}
