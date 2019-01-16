import { SELECT_LOC } from '../actions/types'

const initialState = {
    lat: null,
    lng: null,
    address: "",
}

const newLocation = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LOC:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default newLocation;