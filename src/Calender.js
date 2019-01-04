import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment) 

class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <header className="App-header">
          <BigCalendar
            localizer={localizer}
            events={[]}
            defaultView={'day'}
            toolbar={false}
            width={'1000px'}
            step={60}
          />
        </header>
      </div>
    );
  }
}

export default Calendar;
