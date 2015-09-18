'use strict';

const React = require('react');

class Day extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="day">
        {this.props.day}
      </div>
    );
  }
}

module.exports = Day;