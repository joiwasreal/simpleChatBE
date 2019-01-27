const Router = require('koa-router')
const router = new Router({ prefix: '/chats' })
const knex = require('../db')

router.get('/', async ctx => {
  const data = await knex('messages').where({
    recipient_id: ctx.params.userId
  }).select('sender_id AS user_id')    
    .max('created_at AS created_at')
    .groupBy('sender_id')
    .orderBy('sender_id', 'asc')

  ctx.body = {
    status: 'success',
    data
  }
})

module.exports = router
