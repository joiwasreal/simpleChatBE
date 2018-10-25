const { STATUS_CODES } = require('http')

module.exports = async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.app.emit('error', err, ctx)

    const code = ctx.status = typeof err.status === 'number' ? err.status : 500
    ctx.type = 'application/json'
    ctx.body = { status: 'error', code }

    if (ctx.app.env === 'development') {
      ctx.body = { ...ctx.body, message: err.message, stack: err.stack }
    } else {
      ctx.body = { ...ctx.body, message: err.expose ? err.message : STATUS_CODES[code] }
    }
  }
}
