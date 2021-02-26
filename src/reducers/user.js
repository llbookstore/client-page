import { GET_USER_INFO } from '../constants/ActionTypes'
const initialState = {}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return state;
        default:
            return state;
    }
}

export default userReducer;