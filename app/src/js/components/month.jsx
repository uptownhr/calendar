'use strict'

const React = require('react')
const Week = require('./week')
const moment = require('moment')
require('moment-range')

const {Row, Col, Nav, Navbar, NavItem} = require('react-bootstrap')

class Month extends React.Component{
  constructor(props){
    super(props)
  }

  weeks_in_range(date){
    var range = date.range('month')
    var weeks = []
    range.by('weeks', function(week){
      weeks.push(week.week())
    })
    return weeks
  }

  render(){
    var date = this.props.month
    var month = date.month()
    var weeks = this.weeks_in_range(date)

    return(
      <div className="month">
        <div style={{position: 'relative'}}>
          <h1>{date.format("MMMM DD, YYYY")}</h1>
          <span style={{position: 'absolute', right:0, bottom:0}}>
            Previus | Next
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Sunday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Monday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Tuesday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Wednesday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Thursday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Friday</div>
          <div style={{ flex: 1, border: '1px solid grey', padding: '10px' }}>Saturday</div>
        </div>
        { weeks.map( week =>  <Week key={week} month={month} week={week} /> ) }
      </div>
    );
  }
}

module.exports = Month