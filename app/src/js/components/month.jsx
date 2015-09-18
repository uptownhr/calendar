'use strict'

const React = require('react')
const Week = require('./week')
const moment = require('moment')
require('moment-range')

const {Row, Col, Nav, Navbar, NavItem} = require('react-bootstrap')

class Month extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      date: props.month,
      selectionRange: moment.range()
    }
  }

  weeks_in_range(date){
    var range = date.range('month')
    var weeks = []
    range.by('weeks', function(week){
      weeks.push(week.week())
    })
    return weeks
  }

  changeMonth(direction){
    var next;
    if(direction == 'next'){
      this.state.date.add(1, 'month')
    }else{
      this.state.date.subtract(1, 'month')
    }

    this.setState({
      date: this.state.date
    })
  }

  onMouseHover(day){
    console.log('hover', day)
  }

  onMouseDown(day){
    var range = moment.range(day, day)

    this.state.selectionRange = range
    this.setState(this.state)
  }

  render(){
    var month = this.state.date.month()
    var weeks = this.weeks_in_range(this.state.date)

    return(
      <div className="month">
        <div style={{position: 'relative'}}>
          <h1>{this.state.date.format("MMMM DD, YYYY")}</h1>
          <ul className="pagination pagination-sm" style={{position: 'absolute', right:0, bottom:0}}>
            <li><a onClick={this.changeMonth.bind(this, 'prev')}>Previous</a></li>
            <li><a onClick={this.changeMonth.bind(this, 'next')}>Next</a></li>
          </ul>
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
        { weeks.map( week =>  <Week key={week} month={month}
                                    week={week} onMouseHover={this.onMouseHover.bind(this)}
                                    onMouseDown={this.onMouseDown.bind(this)} selectionRange={this.state.selectionRange} />
        ) }
      </div>
    );
  }
}

module.exports = Month