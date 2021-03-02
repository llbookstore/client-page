import { GET_USER_INFO, LOG_OUT, UPDATE_ACCOUNT } from '../constants/ActionTypes'
const userData = sessionStorage.getItem('userData');
const initialState = (userData === null || userData === 'null') ? {} : JSON.parse(userData);

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return { ...action.data };
        case LOG_OUT:
            return {};
        case UPDATE_ACCOUNT:
            return {
                ...state,
                fullname: action.data.fullname,
                gender: action.data.gender,
                email: action.data.email,
                phone: action.data.phone,
                birth_date: action.data.birth_date
            }
        default:
            return state;
    }
}

export default userReducer;