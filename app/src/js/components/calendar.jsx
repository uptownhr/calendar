'use strict';

const React = require('react')
const Month = require('./month')
const moment = require('moment')

class Calendar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var date = moment(this.props.date)

    return(
      <div className="calendar">
        <div className="background">
        </div>
        <Month month={date} />
      </div>
    );
  }
}

module.exports = Calendar