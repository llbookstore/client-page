import { GET_PUBLISHING_HOUSES } from '../constants/ActionTypes';
const initialState = [];
const publishingHouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PUBLISHING_HOUSES:
            return [...action.data];
        default:
            return state;
    }
}

export default publishingHouseReducer;