const Router = require('koa-router')
const router = new Router({
  prefix: '/users'
})
const knex = require('../db')

router.get('/', async ctx => {
  const data = await knex('users').select('id', 'name')
  ctx.body = {
    status: 'success',
    data
  }
})

module.exports = router
