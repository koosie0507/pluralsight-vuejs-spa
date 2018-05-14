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

module.exports = {returnRepoData}
