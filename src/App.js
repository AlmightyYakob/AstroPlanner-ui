import React, { Component } from 'react';
import Calendar from './Calender';
import moment from 'moment';

import LocationSelector from './LocationSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const BACKEND_API_URL = 'https://jakenesbitt.com/astroplanner/api/';
const ONE_HOUR_SECONDS = 3600;

const GOOGLE_API_KEY = 'AIzaSyBqHbbTpxtq7dwr-3XtxSGLPgvIqLq7RmM';
const GOOGLE_API_PATH = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
    };
  }

  componentDidMount = () => {
    // fetch(BACKEND_API_URL)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.status !== "OK") throw data;
    //     const hours = data.daily.data.map(x => x.hours).flat();
    //     this.setState({
    //       ...this.state,
    //       data: {
    //         currently: data.currently,
    //         latitude: data.latitude,
    //         longitude: data.longitude,
    //         timezone: data.timezone,
    //       },
    //       events: hours.map(x => ({
    //         start: moment.unix(x.time).toDate(),
    //         end: moment.unix(x.time + ONE_HOUR_SECONDS - 1).toDate(),
    //         viability: x.viability,
    //         title: x.viability === 0 ? "" : `Viability: ${(x.viability * 100).toFixed()}%`,
    //       })),
    //     });
    //   })
    //   .catch(err => {
    //     console.error("API Error:", err.error);
    //   });
  }

  onLocationSet = (params) => {
    console.log(params);

    // this.setState({
    //   ...this.state,
    //   lat,
    //   lng,
    // });
  }

  render() {
    return (
      <div className="App">
        <script type="text/javascript" src={GOOGLE_API_PATH}></script>
        <div className="main">
          <LocationSelector
            // onChange={(params) => {this.set}}
          />
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
