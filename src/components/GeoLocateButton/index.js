import React, { Component } from 'react';
import styled from 'styled-components';
// import { MyLocation } from 'styled-icons/material';
import { LocationArrow } from 'styled-icons/fa-solid';


const Button = styled.button`
  color: skyblue;
  background-color: unset;
  cursor: pointer;
  border-radius: 5px;
  border: white;
`;

class GeoLocateButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
    };
  }

  render() {
    return (
      <div>
        <Button
          {...this.props}
        >
          <LocationArrow
            size={this.props.size}
          />
        </Button>
      </div>
    );
  }
}

export default GeoLocateButton;
