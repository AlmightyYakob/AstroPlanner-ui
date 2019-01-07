import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import Axios from 'axios';

moment.updateLocale('en', {
  week: {
    dow: moment().day(),
  },
});
const localizer = BigCalendar.momentLocalizer(moment);
const BACKEND_API_URL = 'https://jakenesbitt.com/astroplanner/api/';
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

  static getDerivedStateFromProps = (nextProps, prevState) => {
    console.log(prevState);
    if (nextProps.lat === null || nextProps.lng === null) return prevState;

    Axios.get(BACKEND_API_URL, {
      params: {
        lat: nextProps.lat,
        lng: nextProps.lng,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status !== "OK") throw data;
        const hours = data.daily.data.map(x => x.hours).flat();
        return {
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
        };
      })
      .catch(err => {
        console.error("API Error:", err.error);
        return prevState;
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
