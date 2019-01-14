import React, { Component } from 'react';
// import Calendar from '../Calendar';
// import moment from 'moment';
import { ListGroup, ListGroupItem, Input } from 'reactstrap';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    // geocodeByPlaceId,
} from 'react-places-autocomplete';

import './LocationSelector.css';

class LocationSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            lat: null,
            lng: null,
        };
    }

    componentDidUpdate = (_, prevState) => {
        if (prevState !== this.state) {
            console.log("update");
            (this.props.onLocationSelect !== undefined)
                && this.state.lat !== null
                && this.state.lng !== null
                && this.props.onLocationSelect(this.state);
        }
    };

    renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        // if (suggestions.length > 0) console.log(getSuggestionItemProps(suggestions[0]));
        return (
            <div className="autocomplete-root">
                <Input {...getInputProps()} />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    <ListGroup>
                        {suggestions.map(suggestion => (
                            <ListGroupItem
                                {...getSuggestionItemProps(suggestion)}
                                tag="a"
                                href="#"
                                action
                                active={suggestion.active}
                            >
                                {suggestion.description}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        );
    };

    handleChange = address => {
        this.setState({
            ...this.state,
            address,
        });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    ...this.state,
                    address,
                    lat,
                    lng,
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
                <h1>AstroPlanner</h1>
                <label>Select Location</label>
                <PlacesAutocomplete
                    value={this.state.address}
                    onLocationSelect={this.handleChange}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    onError={this.handleError}
                >
                    {this.renderFunc}
                </PlacesAutocomplete>
            </div>
        );
    }
}

export default LocationSelector;