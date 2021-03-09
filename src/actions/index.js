import {
    GET_ALL_PRODUCTS,
    GET_USER_INFO,
    LOG_OUT,
    UPDATE_ACCOUNT,
    GET_CATEGORY
} from '../constants/ActionTypes'

export const getAllProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        data: products
    }
}
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

export const updateAccount = (user) => {
    return {
        type: UPDATE_ACCOUNT,
        data: user
    }
}
//category
export const getCategories = (categories) => {
    return {
        type: GET_CATEGORY,
        data: categories
    }
}