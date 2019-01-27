const Router = require('koa-router')
const router = new Router({ prefix: '/contacts' })
const body = require('koa-body')
const validate = require('../middleware/validate')
const knex = require('../db')

router.get('/', async ctx => {
  const data = await knex('contacts')
    .where({ user_id: ctx.params.userId })
    .join('users', 'users.id', '=', 'contacts.contact_id')
    .select('users.id', 'users.username', 'users.name')

  ctx.body = { data }
})

router.post('/', body(), validate(require('../schema/id')), async ctx => {
  await knex('contacts').insert({
    user_id: ctx.params.userId,
    contact_id: ctx.request.body.id
  })

  ctx.status = 204
})

router.delete('/:contactId', async ctx => {
  const { userId, contactId } = ctx.params

  await knex('contacts').where({ user_id: userId, contact_id: contactId }).delete()

  ctx.status = 204
})

router.use('/:contactId', require('./messages').routes())

module.exports = router
