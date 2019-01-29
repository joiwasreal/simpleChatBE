const Router = require('koa-router')
const router = new Router({ prefix: '/chats' })
const knex = require('../db')

router.get('/', async ctx => {
  const subquery = knex('messages').where({
    sender_id: knex.raw('??', ['users.id']),
    recipient_id: ctx.params.userId
  }).select('created_at')
    .orderBy('created_at', 'DESC')
    .limit(1)
    .as('created_at')
  const data = await knex('users').select('id AS user_id', subquery)

  ctx.body = { data }
})

module.exports = router
