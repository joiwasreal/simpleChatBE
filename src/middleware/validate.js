const Joi = require('joi')

module.exports = schema => (ctx, next) => {
  const { error } = Joi.validate(ctx.request.body, schema, { convert: false })
  if (error === null) {
    return next()
  }
  ctx.throw(400, error.message)
}
