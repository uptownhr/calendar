'use strict';

const React = require('react');
const Month = require('./month');

class Calendar extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="calendar">
        <div className="background">
        </div>
        <Month />
      </div>
    );
  }
}

module.exports = Calendar;