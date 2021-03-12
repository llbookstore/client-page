import {
    GET_USER_INFO,
    LOG_OUT,
    UPDATE_ACCOUNT,
    ADD_BOOK_FAVOURITE,
    REMOVE_BOOK_FAVOURITE,
    ADD_BOOK_CART,
    REMOVE_BOOK_CART
} from '../constants/ActionTypes'
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
        case ADD_BOOK_FAVOURITE:
            {
                const { book_id } = action;
                const { favourites } = state;
                return {
                    ...state,
                    favourites: [...favourites, { book_id }]
                }
            }
        case REMOVE_BOOK_FAVOURITE:
            {
                const { book_id } = action;
                const { favourites } = state;
                const removeFavourite = favourites.filter(item => item.book_id != book_id);
                return {
                    ...state,
                    favourites: [...removeFavourite]
                }
            }
        case ADD_BOOK_CART:
            {
                const { book_id, quantity } = action;
                const { carts } = state;
                return {
                    ...state,
                    carts: [...carts, { book_id, state }]
                }
            }
        case REMOVE_BOOK_CART:
            {
                const { book_id } = action;
                const { carts } = state;
                const removeBookCart = carts.filter(item => item.book_id != book_id);
                return {
                    ...state,
                    carts: [...removeBookCart]
                }
            }
        default:
            return state;
    }
}

export default userReducer;