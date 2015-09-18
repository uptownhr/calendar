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
      days.push(day)
    })
    return days
  }

  selected(day){

    return this.props.selectionRange.contains(day)
  }

  render(){
    var date = moment().isoWeekday(7).week(this.props.week)
    var days = this.days_in_range(date)

    return(
      <div className="week">
        {days.map( (day,index) => <Day key={index} month={this.props.month}
                                       day={day} onMouseHover={this.props.onMouseHover}
                                       onMouseDown={this.props.onMouseDown} selected={this.selected(day)} />)}
      </div>
    );
  }
}

module.exports = Week