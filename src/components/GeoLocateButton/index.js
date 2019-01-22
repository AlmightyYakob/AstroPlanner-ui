import React, { Component } from 'react';
import styled from 'styled-components';
// import { MyLocation } from 'styled-icons/material';
// import { LocationArrow } from 'styled-icons/fa-solid';
import { SearchLocation } from 'styled-icons/fa-solid';


const Button = styled.button`
  color: dodgerblue;
  background-color: unset;
  cursor: pointer;
  border-color: transparent;
  /* border-radius: 5px; */
  /* border-width: 2px; */
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
          <SearchLocation
            size={this.props.size}
          />
        </Button>
      </div>
    );
  }
}

export default GeoLocateButton;
