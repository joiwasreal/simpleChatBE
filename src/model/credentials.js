const Joi = require('joi')

module.exports = {
  username: Joi.string().required().alphanum().lowercase().min(4).max(20),
  password: Joi.string().required(),
}
