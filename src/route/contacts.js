const Router = require('koa-router')
const router = new Router({ prefix: '/contacts' })

router.get('/', async ctx => {
  ctx.body = []
})

router.use('/:contactId', require('./messages').routes())

module.exports = router
