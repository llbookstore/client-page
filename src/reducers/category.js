import { GET_CATEGORY } from '../constants/ActionTypes';
const initialState = [];
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return [...action.data];
        default:
            return state;
    }
}

export default categoryReducer;