import React, { Component } from 'react';
import Calendar from '../Calendar';
// import moment from 'moment';

import LocationSelector from '../LocationSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// const BACKEND_API_URL = 'https://jakenesbitt.com/astroplanner/api/';
// const ONE_HOUR_SECONDS = 3600;

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

  handleLocationSelect = (params) => {
    console.log('handle select', params);

    this.setState({
      ...this.state,
      lat: params.lat,
      lng: params.lng,
    });
  }

  render() {
    return (
      <div className="App">
        <script type="text/javascript" src={GOOGLE_API_PATH}></script>
        <div className="main">
          <LocationSelector
            onLocationSelect={this.handleLocationSelect}
          />
          <Calendar
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </div>
      </div>
    );
  }
}

export default App;
