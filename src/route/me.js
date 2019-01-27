const Router = require('koa-router')
const router = new Router({ prefix: '/me' })
const auth = require('../middleware/auth')

router.get('/', auth(), async ctx => {
  ctx.body = {
    data: ctx.user
  }
})

module.exports = router
