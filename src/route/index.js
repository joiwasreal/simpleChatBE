const Router = require('koa-router')
const router = new Router()

router.get('/', ctx => ctx.redirect('https://github.com/bulyshko/up/blob/master/README.md'))

module.exports = router
