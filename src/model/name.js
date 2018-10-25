const Joi = require('joi')

module.exports = {
  name: Joi.string().max(100)
}
