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
  password = hash.digest('hex')
  return { password, salt }
}

/**
 * Creates a secure password hash with a random salt and the SHA512 cypher

 * @param {string} password a string which will be hashed with SHA512
 * @returns {object} with two properties: salt (a random salt) and passwordHash (the hashed password)
 */
function getSecurePassword (password) {
  return _sha512(password, _genRandomString(16))
}

/**
 * Gets the password hash obtained by using the provided salt and the SHA512 cypher

 * @param {string} password clear-text value of the password
 * @param {string} salt a salt value to encode the password with
 */
function getPasswordHash (password, salt) {
  return _sha512(password, salt).password
}

module.exports = {returnRepoData, getSecurePassword, getPasswordHash}
