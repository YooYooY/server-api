const compose = require('koa-compose')
const postProcessing = require('./postProcessing')
const errorHandler = require('./errorHandler')

module.exports = () => compose([postProcessing, errorHandler])
