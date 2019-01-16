import { SELECT_LOC } from '../types';


export const selectLocation = (loc) => {
    return {
        type: SELECT_LOC,
        payload: loc,
    }
}

