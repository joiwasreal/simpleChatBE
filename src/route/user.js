const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const body = require('koa-body')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const knex = require('../db')

router.get('/', async ctx => {
  const data = await knex('users').select('id', 'username', 'name').orderBy('id')
  ctx.body = {
    status: 'success',
    data
  }
})

router.post('/', body(), validate(require('../model/user')), async ctx => {
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

router.put('/:id', auth(), body(), validate(require('../model/name')), async ctx => {
  const id = ctx.params.id
  if (`${id}` !== `${ctx.user.id}`) {
    return ctx.throw(403)
  }

  await knex('users').where({ id }).update(ctx.request.body)

  ctx.status = 204
})

router.get('/:id', async ctx => {
  const data = await knex('users').where({
    id: ctx.params.id
  }).first('id', 'username', 'name')

  if (data === undefined) {
    return ctx.throw(404)
  }

  ctx.body = {
    status: 'success',
    data
  }
})

router.delete('/:id', auth(), async ctx => {
  const id = ctx.params.id
  if (`${id}` !== `${ctx.user.id}`) {
    return ctx.throw(403)
  }

  await knex('users').where({ id }).delete()

  ctx.status = 204
})

module.exports = router
