const knex = require('../db')

const headers = {
  'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"'
}

module.exports = () => async (ctx, next) => {
  const header = ctx.headers.authorization
  if (header === undefined) {
    return ctx.throw(401, null, { headers })
  }

  const [, base64] = header.split(' ')

  const [username, password] = Buffer.from(base64, 'base64').toString().split(':')

  const user = await knex('users').where({ username, password }).first('*')
  if (user === undefined) {
    return ctx.throw(401, null, { headers })
  }

  ctx.user = user

  return next()
}
