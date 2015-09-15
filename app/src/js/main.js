'use strict'
global.jQuery = global.$ = require('jquery')
const FC = require('fullcalendar')
console.log(FC)
const View = FC.View      // the class that all views must inherit from

var CustomView          // our subclass

CustomView = View.extend({ // make a subclass of View

  initialize: function() {
    // called once when the view is instantiated, when the user switches to the view.
    // initialize member variables or do other setup tasks.
  },

  render: function() {
    // responsible for displaying the skeleton of the view within the already-defined
    // this.el, a jQuery element.
  },

  setHeight: function(height, isAuto) {
    // responsible for adjusting the pixel-height of the view. if isAuto is true, the
    // view may be its natural height, and `height` becomes merely a suggestion.
  },

  renderEvents: function(events) {
    // reponsible for rendering the given Event Objects
  },

  destroyEvents: function() {
    // responsible for undoing everything in renderEvents
  },

  renderSelection: function(range) {
    // accepts a {start,end} object made of Moments, and must render the selection
  },

  destroySelection: function() {
    // responsible for undoing everything in renderSelection
  }

})

FC.views.custom = CustomView;



$(document).ready(function() {

  // page is now ready, initialize the calendar...

  $('div.cal').fullCalendar({
    // put your options and callbacks here
  })

})