import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment) 

class Calendar extends Component {
  render() {
    console.log(moment.unix(1546639200).toDate())
    return (
      <div className="Calendar">
        <header className="App-header">
          <BigCalendar
            localizer={localizer}
            events={[{
              start: moment.unix(1546639200).toDate(),
              end: moment.unix(1546642800).toDate(),
            }]}
            defaultView={'day'}
            toolbar={false}
            width={1000}
          />
        </header>
      </div>
    );
  }
}

export default Calendar;
