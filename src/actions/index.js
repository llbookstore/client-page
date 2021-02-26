import {
    GET_ALL_PRODUCTS,
    GET_USER_INFO,
    LOG_OUT
} from '../constants/ActionTypes'

export const getUserInfo = (user) => {
    return {
        type: GET_USER_INFO,
        data: user
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}