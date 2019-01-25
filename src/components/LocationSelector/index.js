import React, { Component } from 'react';
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Input } from 'reactstrap';
import {
  InputGroup,
  Button,
  Icon,
  Intent,
  Menu,
  MenuItem,
  Classes,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { selectLocation } from '../../actions/creators';
import './LocationSelector.css';

class LocationSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null,
    };
  }

  renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
    // if (suggestions.length > 0) console.log(getSuggestionItemProps(suggestions[0]));
    return (
      <div className="autocomplete-root">
        {/* <Input {...getInputProps()} /> */}
        <InputGroup
          {...getInputProps()}
          placeholder="Type Location..."
          large
          icon="search"
          rightElement={
            <Button>
              <Icon icon={IconNames.GEOLOCATION} intent={Intent.PRIMARY} />
            </Button>
          }
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          <Menu className={Classes.ELEVATION_1}>
            {suggestions.map(suggestion => (
              <MenuItem
                {...getSuggestionItemProps(suggestion)}
                tag="a"
                href="#"
                action
                active={suggestion.active}
                text={suggestion.description}
              />
            ))}
          </Menu>
        </div>
      </div>
    );
  };

  handleChange = address => {
    this.setState({
      ...this.state,
      address: address,
    });
  };

  handleSelect = address => {
    // Quickly set address in state to the returned value,
    // until the result from the call below, then dispatch action.

    this.setState({
      ...this.state,
      address,
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((loc) => {
        // Dispatch action
        this.props.setLocation({
          ...loc,
          address,
        });

        // Set local state back to null, so it uses the props
        this.setState({
          ...this.state,
          address: null,
        });
      })
      .catch(error => console.error('Error', error));
  };

  handleError = err => {
    console.log(err);
  };

  render() {
    return (
      <div className="location-selector-container">
        <PlacesAutocomplete
          value={this.state.address === null ? this.props.address : this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onError={this.handleError}
          highlightFirstSuggestion={true}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (loc) => {
      dispatch(selectLocation(loc))
    }
  }
};

const LocationSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationSelector)

export default LocationSelectorContainer;