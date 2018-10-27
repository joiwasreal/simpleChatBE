const Joi = require('joi')

module.exports = {
  id: Joi.number().required()
}
