import React, { Component } from 'react';
import Calendar from '../Calendar';
// import moment from 'moment';

import LocationSelector from '../LocationSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
    };
  }

  handleLocationSelect = (params) => {
    this.setState({
      ...this.state,
      lat: params.lat,
      lng: params.lng,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="main">
          <LocationSelector />
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
