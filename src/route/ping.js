const Router = require('koa-router')
const router = new Router({ prefix: '/ping' })
const auth = require('../middleware/auth')
const knex = require('../db')

router.post('/', auth(), async ctx => {
  await knex('users').where({ id: ctx.user.id }).update({ seen_at: knex.fn.now() })

  ctx.body = {
    status: 'success',
    data: null
  }
})

module.exports = router
