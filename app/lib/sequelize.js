const Sequelize = require('sequelize')
const { db } = require('../config/index')

const sqlConfig = {
  host: db.host,
  dialect: 'mysql',
  port: db.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
}

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  sqlConfig
)

module.exports = sequelize
