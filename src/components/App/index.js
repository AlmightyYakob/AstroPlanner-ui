import React, { Component } from 'react';
import Calendar from '../Calendar';
import styled from 'styled-components';
import { MyLocation } from 'styled-icons/material';
// import { Button } from 'reactstrap';
// import moment from 'moment';

import LocationSelector from '../LocationSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const GeoLocateButton = styled.button`
  color: red;
  cursor: pointer;
  border-radius: 5px;
  border: white;
`;

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
        <h1>AstroPlanner</h1>
        <div className="location-selector-row">
          <GeoLocateButton
            onClick={() => { console.log('cklia') }}
          >
            <MyLocation
              size={48}
            />
          </GeoLocateButton>
          <LocationSelector />
        </div>
        <Calendar />
      </div>
    );
  }
}

export default App;
