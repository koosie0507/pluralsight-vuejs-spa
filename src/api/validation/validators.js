function createError (message) {
  return { isValid: false, message }
}
function createSuccess () {
  return { isValid: true }
}

function exists (value, message) {
  const msg = message || 'value cannot be null or undefined'
  if (value === null || typeof value === 'undefined') {
    return createError(msg)
  }
  return createSuccess()
}

function nonEmptyString (value, message) {
  const existsResult = exists(value, message)
  if (!existsResult.isValid) return existsResult
  if (typeof value !== 'string') return createError(message || 'value is not a string')
  if (value.length < 1) return createError(message || 'empty string')
  return createSuccess()
}

function firstError (...validationResults) {
  for (var v of validationResults) {
    if (!v.isValid) return v
  }
  return createSuccess()
}

function findDuplicateAsync (repo, conditions, message) {
  const promise = repo.get(conditions)
    .then(function foundDuplicate (dbData) {
      if (dbData !== null && typeof dbData !== 'undefined') {
        const error = { message }
        return Promise.reject(error)
      }
      return Promise.resolve(dbData)
    })
  return promise
}

module.exports = { exists, nonEmptyString, firstError, findDuplicateAsync }
