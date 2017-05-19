import Sequelize from 'sequelize'
import config from '../config/index'
import models from './models'

const sequelize = new Sequelize(config.database.connectionString, config.database.options)

// Import all models
const db = {}
Object.entries(models).forEach(([modelName, modelDef]) => {
  const model = sequelize.import(modelName, modelDef)
  db[model.name] = model
})

// Load relations between models
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
