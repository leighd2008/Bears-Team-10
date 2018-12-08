const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const session = require('koa-session')
const db = require('./config/db')
const passport = require('koa-passport')

const app = new Koa()
const router = new Router()

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())

// sessions
app.keys = ['secret-key'] //TODO: Change later to env keys
app.use(session(app))

app.use(BodyParser())

app.use(respond())

//AUTH setup
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
// db.query('SELECT * FROM "public"."employee" LIMIT 100', [], (err, res) => console.log(res.rows))

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(require('koa-static')('./build'))
app.use(router.allowedMethods())

module.exports = app
