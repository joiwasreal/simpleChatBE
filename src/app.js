const Koa = require('koa')
const favicon = require('koa-favicon')
const cors = require('koa2-cors')

const { PORT = 3000 } = process.env

const app = new Koa()

app.use(favicon(`${__dirname}/favicon.ico`))
app.use(cors())
app.use(require('./middleware/ssl'))
app.use(require('./middleware/error'))

app.on('error', err => console.error(err.message))

app.use(require('./route/users').routes())
app.use(require('./route/index').routes())

module.exports = app.listen(PORT)
