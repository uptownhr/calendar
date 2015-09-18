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
      backgroundColor: this.props.selected? '#333': ''
    }

    return(
      <div onMouseOver={this.handleMouseOver.bind(this, day)} onMouseDown={this.handleMouseDown.bind(this, day)} className={"day " + inactive} style={style}>
        {date}
      </div>
    );
  }

  handleMouseOver(day){
    this.props.onMouseHover(day)
  }

  handleMouseDown(day){
    this.props.onMouseDown(day)
  }
}

module.exports = Day;