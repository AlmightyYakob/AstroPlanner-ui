import React, { Component } from 'react';
import styled from 'styled-components';
import { MyLocation } from 'styled-icons/material';


const Button = styled.button`
  color: red;
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
          <MyLocation
            size={48}
          />
        </Button>
      </div>
    );
  }
}

export default GeoLocateButton;
