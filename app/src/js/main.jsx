'use strict'
const $ = require('jquery')
const moment = require('moment')
const React = require('react')
const Calendar = require('./components/calendar')

React.render(
  <Calendar />,
  $('#calendar')[0]
)

/*
$(document).ready( () => {
  var start = 0
  var end = 0
  var mousedown = false

  $('.day').on('mousedown', function(e){
    unselect()
    mousedown = true
    start = $(this).text()
  })

  $('.day').on('mouseup', function(e){
    mousedown = false
    end = $(this).text()
    console.log('up', start, end)
    select(start,end)
  })

  $('.day').on('mouseover', function(e){
    end = $(this).text()
    if(mousedown){
      select(start,end)
    }
  })

  render_events(test_json)
})

var render_events = function(events){
  events.forEach(function(event){
    var day = moment(event.date).date();
    var $day = get_day(day);

    $day.then( function(test){
      var $ul = $('<ul>')
      var $li = $('<li>').text(event.title).appendTo($ul)
      console.log($ul,test)
      test.append($ul)
    })
  })
}


var get_day = function(day){
  return new Promise( function(res,rej){
    $('.day').each(function(k,v){
      var date = parseInt($(this).text());
      if(date == day){
        res($(this));
      }
    })
  })
}

var unselect = function(){
  $('.day').removeClass('selected')
}
var select = function(start, end){
  start = parseInt(start)
  end = parseInt(end)

  var $days = $('.day')

  $days.each(function(k,v){
    var $day = $(v)
    var day = parseInt($day.text())

    if( (day >= start && day <= end) || (day >= end && day <= start) ){
      $day.addClass('selected')
    }else{
      $day.removeClass('selected')
    }
  })
}

var types=['media','image','event']
var providers=['instagram','twitter','facebook','meetup','gcal','calendar']

var test_json = [
  {
    date: '2015-01-01',
    title: "tu madre",
    description: "hello world",
    visibility: 'private',
    type: 'text',
    provider: 'calendar'
  }
]*/
