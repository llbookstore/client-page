import {
    GET_USER_INFO,
    LOG_OUT,
    UPDATE_ACCOUNT,
    ADD_BOOK_FAVOURITE,
    REMOVE_BOOK_FAVOURITE,
    ADD_BOOK_CART,
    REMOVE_BOOK_CART,
    REMOVE_ALL_BOOK_CART,
} from '../constants/ActionTypes'

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
export const addBookCart = (book_id, quantity) => {
    return {
        type: ADD_BOOK_CART,
        book_id,
        quantity
    }
}
export const removeBookCart = (book_id) => {
    return {
        type: REMOVE_BOOK_CART,
        book_id
    }
}
export const removeAllBookCart = () => {
    return {
        type: REMOVE_ALL_BOOK_CART
    }
}

