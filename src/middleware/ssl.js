module.exports = (ctx, next) => {
  const secure = ctx.secure || ctx.headers['x-forwarded-proto'] === 'https'
  if (secure || ctx.app.env !== 'production') {
    next()
  } else if (ctx.method === 'GET') {
    ctx.status = 301
    ctx.redirect(`https://${ctx.host}${ctx.url}`)
  } else {
    ctx.throw(400, 'Please use HTTPS when communicating with this server.')
  }
}
