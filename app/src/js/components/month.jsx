'use strict'

const React = require('react')
const Modal = require('react-modal')
const Week = require('./week')
const moment = require('moment')
require('moment-range')

class Month extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      date: props.month,
      selectionRange: moment.range(),
      mouseDown: false,
      modal: {
        isOpen: false,
        component: null
      }
    }
  }

  componentDidMount(){

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

  onMouseOver(day){
    if(this.state.mouseDown){
      var range = moment.range(this.state.selectionRange.start, day)
      this.state.selectionRange = range
      this.setState(this.state)
    }
  }

  onMouseDown(day){
    var range = moment.range(day, day)

    this.state.selectionRange = range
    this.state.mouseDown = true
    this.setState(this.state)
  }

  onMouseUp(day){
    this.state.mouseDown = false
    this.setState(this.state)
    this.showModal()
  }

  showModal(component){
    this.state.modal.isOpen = true
    this.setState(this.state)
  }

  closeModal(){
    this.state.modal.isOpen = false
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
                                    week={week}
                                    calendar={{
                                      over: this.onMouseOver.bind(this),
                                      down: this.onMouseDown.bind(this),
                                      up: this.onMouseUp.bind(this),
                                      selectionRange: this.state.selectionRange,
                                      modal: this.showModal.bind(this)
                                    }}
            />
        ) }
        <Modal isOpen={this.state.modal.isOpen} onRequestClose={this.closeModal.bind(this)}>
          {this.state.selectionRange.start.toString()} - {this.state.selectionRange.end.toString()}
        </Modal>
      </div>
    );
  }
}

module.exports = Month