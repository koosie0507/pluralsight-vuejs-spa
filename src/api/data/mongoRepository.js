const mongoose = require('mongoose')

module.exports = function MongoRepository (connectionString, entityName, meta, errorLogger) {
  mongoose.connect(connectionString, {
    autoIndex: false,
    reconnectTries: 2,
    reconnectInterval: 500,
    poolSize: 2,
    bufferMaxEntries: 0
  }, errorLogger)

  const MongoModel = mongoose.model(entityName, meta)

  return {
    new: function (inputData) {
      return new MongoModel(inputData).save()
    },
    list: function () {
      return MongoModel.find().exec()
    },
    save: function (entity, idMapper) {
      const id = idMapper(entity)
      return MongoModel.findById(id)
        .exec()
        .then(function onEntityFound (dbEntity) {
          Object.assign(dbEntity, entity)
          return dbEntity.save()
        })
        .catch(function notFound (err) {
          const error = {
            message: `cannot update entity with id '${id}'`,
            innerError: err.message
          }
          return Promise.reject(error)
        })
    }
  }
}
