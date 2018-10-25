const Koa = require('koa')

const { PORT = 3000 } = process.env

const app = new Koa()

app.use(require('./middleware/ssl'))
app.use(require('./middleware/error'))

app.on('error', err => console.error(err.message))

app.use(require('./route/user').routes())
app.use(require('./route/index').routes())

module.exports = app.listen(PORT)
