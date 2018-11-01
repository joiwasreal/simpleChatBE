const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

module.exports = schema => (ctx, next) => {
  const valid = ajv.validate(schema, ctx.request.body)
  if (valid) {
    return next()
  }
  ctx.throw(400, ajv.errorsText())
}
