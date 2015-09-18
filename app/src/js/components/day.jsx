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

    return(
      <div className={"day " + inactive}>
        {date}
      </div>
    );
  }
}

module.exports = Day;