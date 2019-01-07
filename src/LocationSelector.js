import React, { Component } from 'react';
import Calendar from './Calender';
import moment from 'moment';
import { ListGroup, ListGroupItem, Input } from 'reactstrap';

import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
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

    componentDidUpdate = () => {
        this.props.onChange !== undefined && this.props.onChange(this.state);
    }

    renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        if (suggestions.length > 0) console.log(getSuggestionItemProps(suggestions[0]));
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
        )
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
    }

    render() {
        return (
            <div className="location-selector-container">
                <h1>HEYY</h1>
                <PlacesAutocomplete
                    value={this.state.address}
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