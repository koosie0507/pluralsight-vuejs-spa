const mongoose = require('mongoose')

function byId (MongoModel, id) {
  return MongoModel.findById(id).exec()
}

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
    byId: function (id) {
      return byId(MongoModel, id)
    },
    get: function (conditions) {
      return MongoModel.findOne(conditions).exec()
    },
    save: function (entity, idMapper) {
      const id = idMapper(entity)
      return byId(MongoModel, id)
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
