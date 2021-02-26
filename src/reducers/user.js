import { GET_USER_INFO, LOG_OUT } from '../constants/ActionTypes'
const userData = sessionStorage.getItem('userData');

const initialState = (userData==null || userData=='null') ? {} : userData;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return {...action.data};
        case LOG_OUT:
            return {}
        default:
            return state;
    }
}

export default userReducer;