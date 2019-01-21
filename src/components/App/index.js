import React, { Component } from 'react';
import styled from 'styled-components';
import { clamp } from 'lodash';
import Geocode from 'react-geocode';

import Calendar from '../Calendar';
import GeoLocateButton from '../GeoLocateButton';
import LocationSelector from '../LocationSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// ADD FIX FOR WHEN WINDOW RESIZED LIVE
const calcSideColWidth = x => clamp((20) * (x - 1080) / (840), 0, 20);
const GridContainer = styled.div`
    display: grid;
    /* grid-template-columns: 20% auto 20%; */
    grid-template-columns: ${calcSideColWidth(window.innerWidth)}% auto ${calcSideColWidth(window.innerWidth)}%;
    grid-template-rows: auto auto auto;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  // componentDidMount(){
  //   window.addEventListener("resize", () => {
  //     console.log("resize");
  //     this.setState({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   });
  // }

  // componentWillUnmount(){
  //   window.removeEventListener("resize");
  // }

  handleGeoLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(x => {
        console.log(x);
        // Call Geocode, then update redux state
      }, y => {
        console.log("ERROR")
      },
        {
          enableHighAccuracy: true,
        });
    }
    else {
      console.log("no geolocate available.");
    }
  }

  render() {
    return (
      <div className="App">
        <GridContainer className="grid-container">
          <h1 className="main-title">AstroPlanner</h1>
          <div className="location-selector-row">
            <GeoLocateButton
              onClick={this.handleGeoLocationButtonClick}
              size={30}
            />
            <LocationSelector />
          </div>
          <Calendar className="calendar" />
        </GridContainer>
      </div >
    );
  }
}

export default App;
