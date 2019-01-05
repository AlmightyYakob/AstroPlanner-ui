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

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...this.state,
          data,
        });
      });
  }

  componentWillUpdate(newProps, newState){
    console.log(newState.data.daily.data.map(x => x.hours).flat());
  //   this.setState({
  //     ...this.state,
  //     events: stuff
  //   });
  }

  render() {
    // console.log(this.state.data);
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
          steps={60}
        />
      </div>
    );
  }
}

export default Calendar;
