const Router = require('koa-router')
const router = new Router({ prefix: '/messages' })
const knex = require('../db')

router.get('/', async ctx => {
  const { userId, contactId } = ctx.params

  const data = await knex('messages').where({
    sender_id: userId,
    recipient_id: contactId
  }).orWhere({
    sender_id: contactId,
    recipient_id: userId
  }).select('message').orderBy('id')

  ctx.body = {
    status: 'success',
    data
  }
})

module.exports = router
