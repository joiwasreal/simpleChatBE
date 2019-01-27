const Router = require('koa-router')
const router = new Router()

router.get('/', ctx => ctx.redirect('https://github.com/bulyshko/up'))

module.exports = router
