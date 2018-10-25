const knex = require('../db')

module.exports = () => async (ctx, next) => {
  const header = ctx.headers.authorization
  if (header === undefined) {
    return ctx.throw(401)
  }

  const [, base64] = header.split(' ')

  const [username, password] = Buffer.from(base64, 'base64').toString().split(':')

  const user = await knex('users').where({ username, password }).first('*')
  if (user === undefined) {
    return ctx.throw(401)
  }

  ctx.user = user

  return next()
}
