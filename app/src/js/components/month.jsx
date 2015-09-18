'use strict';

const React = require('react');
const Week = require('./week');
const moment = require('moment');
require('moment-range')

const {Row, Col, Nav, Navbar, NavItem} = require('react-bootstrap');

class Month extends React.Component{
  constructor(props){
    super(props);
    let date = moment()
    this.state = {
      weeks: this.weeks_in_range(date)
    }

    console.log(this.state.weeks)
  }

  weeks_in_range(date){
    var range = date.range('month')
    var weeks = []
    let test = range.by('weeks', function(week){
      weeks.push(week.week())
    })
    return weeks
  }

  render(){
    return(
      <div className="month">
        <h1>{moment().format("MMM DD, YYYY")}</h1>
        { this.state.weeks.map( week =>  <Week key={week} week={week} /> ) }
      </div>
    );
  }
}

module.exports = Month;