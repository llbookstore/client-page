import {
    GET_USER_INFO,
    LOG_OUT,
    UPDATE_ACCOUNT,
    ADD_BOOK_FAVOURITE,
    REMOVE_BOOK_FAVOURITE
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
            console.log('remove book here')
            const { book_id } = action;
            console.log('actions', book_id)
            const { favourites } = state;
            const removeFavourite = favourites.filter(item => item.book_id != book_id);
            console.log('remove', removeFavourite)
            return {
                ...state,
                favourites: [...removeFavourite]
            }

        default:
            return state;
    }
}

export default userReducer;