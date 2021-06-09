const jwt = require('koa-jwt')
const { secret } = require('../config/index')

module.exports = jwt({
  secret,
})
