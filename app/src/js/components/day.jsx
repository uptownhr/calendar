'use strict';

const React = require('react');

class Day extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var day = this.props.day
    var date = day.date()
    var inactive = ''

    if(day.month() != this.props.month){
      inactive = 'inactive'
    }

    var style = {
      backgroundColor: this.props.selected? '#add8e6': ''
    }

    return(
      <div onMouseOver={this.handleMouseOver.bind(this, day)}
           onMouseDown={this.handleMouseDown.bind(this, day)}
           onMouseUp={this.handleMouseUp.bind(this, day)}
           className={"day " + inactive} style={style}
        >
        {date}
      </div>
    );
  }

  handleMouseOver(day){
    this.props.calendar.over(day)
  }

  handleMouseDown(day){
    this.props.calendar.down(day)
  }

  handleMouseUp(day){
    this.props.calendar.up(day)
  }
}

module.exports = Day;