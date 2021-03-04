import { GET_ALL_PRODUCTS } from '../constants/ActionTypes';
const initialState = [];
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            console.log('actions', action);
            return [...action.data];
        default:
            return state;
    }
}

export default productReducer;