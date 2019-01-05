import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {
  render() {
    return (
      <div className="calendar-container">
        <BigCalendar
          localizer={localizer}
          events={[{
            start: moment.unix(1546639200).toDate(),
            end: moment.unix(1546642800).toDate(),
          }]}
          defaultView={'week'}
          views={['week', 'day']}
          // width={1000}
          steps={60}
        />
      </div>
    );
  }
}

export default Calendar;
