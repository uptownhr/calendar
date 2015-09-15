var moment = require('moment')
var express = require('express')

var app = express()

app.locals.moment = moment

app.set('view engine', 'jade')
app.set('views', __dirname + '/app/views');
app.use( express.static('public') )


app.get('/', function(req,res){
  res.render('index')
})

app.listen(9999, function(){
  console.log('listening')
});