"use strict"
const router = require('koa-router')({
  prefix: '/users'
})
const User = require('../models/User')

router.post('/signup', function *(next){
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

router.get('/logout', function *(next){
  console.log('logging out')
  this.req.logout()
  this.redirect('/')
})

module.exports = router