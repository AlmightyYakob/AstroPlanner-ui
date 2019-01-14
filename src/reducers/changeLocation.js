import CHANGE_LOC from '../actions'

const initialState = {
    location: {
        lat: null,
        lng: null,
    }
}

const newLocation = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOC:
            return {
                ...state,
                location: {
                    lat: action.payload.lat,
                    lng: action.payload.lng,
                }
            };
        default:
            return state;
    }
};

export default newLocation;