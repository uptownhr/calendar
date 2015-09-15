"use strict"
const router = require('koa-router')({
  prefix: '/users'
})
const User = require('../models/User')

router.post('/signup', function *(next){
  this.checkBody('email').isEmail()
  this.checkBody('password').notEmpty().len(6,20).sha1()

  if(this.errors){
    return this.body = this.errors
  }

  var user = new User({
    email: this.request.body.email,
    password: this.request.body.password
  })

  var saved = yield user.save()
  //this.body = saved
  console.log(this.req.login)
  this.req.logIn(user, function(err){
    console.log('wtf');
    console.log(err)
    this.response.redirect('/');
  }.bind(this))
})

module.exports = router