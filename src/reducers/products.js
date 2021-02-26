import { GET_ALL_PRODUCTS } from '../constants/ActionTypes';
const initialState = [];
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return state;
        default:
            return state;
    }
}

export default productReducer;