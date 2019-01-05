import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

moment.locale('en', {
  week: {
    dow: moment().day(),
  },
});
const localizer = BigCalendar.momentLocalizer(moment);
const API_URL = 'https://jakenesbitt.com/astroplanner/api/';
const ONE_HOUR_SECONDS = 3600;

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      events: [],
    };
  }

  determineColorClass = (event) => {
    const config = {
      style: {
        textAlign: 'center',
      },
    };

    const maxHue = 120;
    const color = `hsl(${event.viability * maxHue}, 60%, 45%)`;

    if (event.viability === 0) {
      config.className = 'inviable';
    }
    else {
      config.style = {
        ...config.style,
        backgroundColor: color,
        borderColor: color,
      };
    }
    return config;
  }

  // showEventToolTip = (event) => (
  //   // some shit
  // );

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const hours = data.daily.data.map(x => x.hours).flat();
        this.setState({
          ...this.state,
          data: {
            currently: data.currently,
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone,
          },
          events: hours.map(x => ({
            start: moment.unix(x.time).toDate(),
            end: moment.unix(x.time + ONE_HOUR_SECONDS - 1).toDate(),
            viability: x.viability,
            title: x.viability === 0 ? "" : `Viability: ${(x.viability * 100).toFixed()}%`,
          })),
        });
      });
  }

  render() {
    return (
      <div className="calendar-container">
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          defaultView={'week'}
          views={['week', 'day']}
          eventPropGetter={this.determineColorClass}
          // tooltipAccessor={this.showEventToolTip}
        />
      </div>
    );
  }
}

export default Calendar;
