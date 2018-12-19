const Router = require('koa-router')
const router = new Router({ prefix: '/messages' })
const knex = require('../db')
const body = require('koa-body')
const validate = require('../middleware/validate')

router.get('/', async ctx => {
  const { userId, contactId } = ctx.params

  const data = await knex('messages').where({
    sender_id: userId,
    recipient_id: contactId
  }).orWhere({
    sender_id: contactId,
    recipient_id: userId
  }).select('message', 'sender_id', 'recipient_id', 'created_at')
    .orderBy('id', 'desc')
    .limit(100)

  ctx.body = {
    status: 'success',
    data
  }
})

router.post('/', body(), validate(require('../schema/message')), async ctx => {
  const { userId, contactId } = ctx.params
  const message = {
    sender_id: userId,
    recipient_id: contactId,
    message: ctx.request.body.message
  }

  const [result] = await knex('messages').insert(message, 'id')

  ctx.status = 201
  ctx.body = {
    status: 'success',
    data: { ...message, id: result }
  }
})

module.exports = router
