"use strict"
const moment = require('moment')
require('moment-range')

const _ = require('lodash')

const koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const router = require('koa-router')()
const jade = require('jade')
//const Jade = require('koa-jade')

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
app.use(function *(next){
  this.render = function(name, opts){
    return jade.renderFile( 'app/views/' + name + '.jade', _.merge(this.locals,opts) )
  }.bind(this)

  yield next
})
/*const jade = new Jade({
  viewPath: 'app/views',
  debug: true,
  pretty: false,
  compileDebug: false,
  basedir: 'app/views',
  helperPath: [
    { _: _ },
    { moment: moment }
  ],
  noCache: false
})

jade.options.noCache = false*/

app.use( serve(__dirname + '/public') )
app.use(bodyParser())
app.use(validator())

//sessions
app.keys = ['testing123']
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())

//custom middlewares
app.use(function *(next){
  try{
    yield next
  }catch(err){
    this.status = err.status || 500
    this.body = err.message
  }
})

app.use(function *(next){
  //jade.locals.user = this.req.user
  this.locals = {
    user: this.req.user,
    moment: moment
  }
  yield next
})

router.get('/', function *(next){
  if(this.req.user){
    var date = moment(this.query.date).utc() || moment().utc()

    var month = yield monthArr(date.range('month'));

    this.body = this.render('calendar',{
      month: month,
      date: date
    })

  }else{
    this.body = this.render('index')
  }
})

function monthArr(range){
  var month = {}

  range.by('days', function(day){
    var week = day.week()
    var day_of_week = day.day()

    if(month[week] == undefined ){
      month[week] = {};
    }

    month[week][day_of_week] = day
  })

  return _.values(month)
}

app.use(router.routes())
app.use(userRoutes.routes())



app.listen(9999, function(){
  console.log('listening')
});