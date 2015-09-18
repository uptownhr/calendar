'use strict';

const React = require('react');

class Day extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="day">
        {this.props}
      </div>
    );
  }
}

module.exports = Day;