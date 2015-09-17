"use strict"
const router = require('koa-router')({
  prefix: '/users'
})
const User = require('../models/User')

router
  .post('/signup', function *(next){
  this.checkBody('email').isEmail()
  this.checkBody('username').notEmpty().len(4,20)
  this.checkBody('password').notEmpty().len(6,20).sha1()

  if(this.errors){
    return this.body = this.errors
  }

  var user = new User(this.request.body)

  var saved = yield user.save()

  this.req.logIn(user, function(err){
    this.redirect('/');
  }.bind(this))
})
  .post('/login', function *(next){
    var username = this.request.body.username
    var password = this.request.body.password

    var user = yield User.findOne({username: username})
    console.log(user)
    if( user.comparePassword(password) ){
      this.req.logIn(user, function(err){
        console.log('err',err,'wtf')
        this.redirect('/')
      }.bind(this) )
    }
  })

router.get('/logout', function *(next){
  console.log('logging out')
  this.req.logout()
  this.redirect('/')
})

module.exports = router