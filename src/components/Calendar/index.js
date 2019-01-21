import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux'
import Axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

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

  componentDidUpdate = (prevProps) => {
    if (this.props.lat === null || this.props.lng === null) return;
    if (this.props === prevProps) return;

    Axios.get(BACKEND_API_URL, {
      params: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
    })
      .then(res => res.data)
      .then(data => {
        if (data.status !== "OK") throw data;
        const hours = data.hourly.data;
        this.setState({
          ...this.props,
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
      })
      .catch(err => {
        console.error("API Error:", err);
      });
  };

  render() {
    return (
      <div className={this.props.className || "calendar-container"}>
        <BigCalendar
          className="main-astro-calendar"
          localizer={localizer}
          events={this.state.events}
          defaultView={'week'}
          views={['week', 'day']}
          eventPropGetter={this.determineColorClass}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    lat: state.location.lat,
    lng: state.location.lng,
  }
}

const CalendarContainer = connect(
  mapStateToProps,
)(Calendar)

export default CalendarContainer;
