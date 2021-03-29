import { GET_AUTHORS } from '../constants/ActionTypes';
const initialState = [];
const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTHORS:
            return [...action.data];
        default:
            return state;
    }
}

export default authorReducer;