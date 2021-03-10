import {
    GET_ALL_PRODUCTS,
    GET_USER_INFO,
    LOG_OUT,
    UPDATE_ACCOUNT,
    GET_CATEGORY,
    ADD_BOOK_FAVOURITE,
    REMOVE_BOOK_FAVOURITE
} from '../constants/ActionTypes'

export const getAllProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        data: products
    }
}
//user
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
export const addBookFavourite = (book_id) => {
    return {
        type: ADD_BOOK_FAVOURITE,
        book_id
    }
}
export const removeBookFavourite = (book_id) => {
    return {
        type: REMOVE_BOOK_FAVOURITE,
        book_id
    }
}


//category
export const getCategories = (categories) => {
    return {
        type: GET_CATEGORY,
        data: categories
    }
}