"use strict"
const moment = require('moment')
const _ = require('lodash')

const koa = require('koa')
const serve = require('koa-static')
const router = require('koa-router')()
const Jade = require('koa-jade')

const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('koa-passport')
const passportConf = require('./app/config/passport')
const validator = require('koa-validate')

const mongoose = require('mongoose')

const userRoutes = require('./app/routes/user')


mongoose.connect( process.env.MONGODB || 'mongodb://localhost:27017/calendar' )
mongoose.connection.on('error', function(err){
  console.log('error connecting to db', err)
})
mongoose.connection.on('open', function(){
  console.log('mongodb connected')
})


var app = koa()

const jade = new Jade({
  viewPath: 'app/views',
  debug: false,
  pretty: false,
  compileDebug: false,
  locals: {
    moment: moment
  },
  basedir: 'app/views',
  helperPath: [
    { _: _ },
    { moment: moment }
  ]
})

app.use(jade.middleware)
app.use( serve(__dirname + '/public') )
app.use(bodyParser())
app.use(validator())

//sessions
app.keys = ['testing123']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

app.use(function *(next){
  try{
    yield next
  }catch(err){
    console.log('error',err)
    this.status = err.status || 500
    this.body = err.message
  }
})

router.get('/', function *(next){
  if(this.req.user){
    this.render('calendar')
  }else{
    this.render('index')
  }
})

router.get('/logout', function *(next){
  console.log('logging out')
  this.req.logout()
  this.redirect('/')
})

app.use(router.routes())
app.use(userRoutes.routes())



app.listen(9999, function(){
  console.log('listening')
});