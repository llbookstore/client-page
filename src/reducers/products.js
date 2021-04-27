import { GET_ALL_PRODUCTS, ADD_BOOK_REVIEW} from '../constants/ActionTypes';
const initialState = [];
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return [...action.data];
        case ADD_BOOK_REVIEW:
            const findBook = state.find(item => item.book_id === action.data.book_id);
            findBook.reviews.push(action.data);
            const findBookIndex = state.findIndex(item => item.book_id === action.data.book_id);
            const newBooks = [...state];
            newBooks[findBookIndex] = findBook;
            return newBooks;
        default:
            return state;
    }
}

export default productReducer;