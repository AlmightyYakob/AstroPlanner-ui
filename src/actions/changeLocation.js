
export const CHANGE_LOC = 'CHANGE_LOC';

const changeLocation = (loc) => {
    return {
        type: CHANGE_LOC,
        payload: loc,
    }
}

export default changeLocation;