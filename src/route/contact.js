const Router = require('koa-router')
const router = new Router({ prefix: '/contacts' })
const auth = require('../middleware/auth')
const self = require('../middleware/self')

router.get('/', auth(), self(), async ctx => {
  ctx.body = {}
})

module.exports = router
