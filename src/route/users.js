const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const body = require('koa-body')
const auth = require('../middleware/auth')
const self = require('../middleware/self')
const validate = require('../middleware/validate')
const knex = require('../db')

router.get('/', auth(), async ctx => {
  const data = await knex('users').select('id', 'username', 'name', 'seen_at').orderBy('id')
  ctx.body = {
    status: 'success',
    data
  }
})

router.post('/', body(), validate(require('../schema/user')), async ctx => {
  const user = ctx.request.body
  const { username } = user

  const id = await knex('users').where({ username }).first('id')
  if (id !== undefined) {
    return ctx.throw(400, 'username already taken')
  }

  const [result] = await knex('users').insert(user, 'id')

  ctx.status = 201
  ctx.body = {
    status: 'success',
    data: { ...user, id: result }
  }
})

router.put('/:userId', auth(), self(), body(), validate(require('../schema/name')), async ctx => {
  await knex('users').where({ id: ctx.params.userId }).update(ctx.request.body)

  ctx.status = 204
})

router.get('/:userId', auth(), async ctx => {
  const data = await knex('users').where({
    id: ctx.params.userId
  }).first('id', 'username', 'name', 'seen_at')

  if (data === undefined) {
    return ctx.throw(404)
  }

  ctx.body = {
    status: 'success',
    data
  }
})

router.delete('/:userId', auth(), self(), async ctx => {
  await knex('users').where({ id: ctx.params.userId }).delete()

  ctx.status = 204
})

router.use('/:userId', auth(), self(), require('./contacts').routes())
router.use('/:userId', auth(), self(), require('./chats').routes())

module.exports = router
