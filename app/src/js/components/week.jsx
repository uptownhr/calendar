'use strict';

const React = require('react')
const Day = require('./day')
const moment = require('moment')

class Week extends React.Component{
  constructor(props){
    super(props)
  }

  days_in_range(date){
    var range = date.range('week')
    var days = []
    range.by('days', function(day){
      days.push(day.date())
    })
    return days
  }

  render(){
    var date = moment().isoWeekday(7).week(this.props.week)
    var days = this.days_in_range(date)

    return(
      <div className="week">
        {days.map( day => <Day key={day} day={day}/>)}
      </div>
    );
  }
}

module.exports = Week