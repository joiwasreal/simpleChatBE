const { STATUS_CODES } = require('http')

module.exports = async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.app.emit('error', err, ctx)

    if (err.headers) {
      ctx.set(err.headers)
    }

    const code = ctx.status = typeof err.status === 'number' ? err.status : 500
    ctx.type = 'application/vnd.api+json'
    ctx.body = {
      errors: [
        {
          status: '' + code,
          title: err.expose ? err.message : STATUS_CODES[code],
          detail: ctx.app.env === 'development' ? err.stack : undefined
        }
      ]
    }
  }
}
