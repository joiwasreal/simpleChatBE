const credentials = require('./credentials')
const Joi = require('joi')

module.exports = {
  ...credentials,
  name: Joi.string().max(100)
}
