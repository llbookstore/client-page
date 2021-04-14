import { callApi } from '../utils/callApi'
import {
    GET_ALL_PRODUCTS,
} from '../constants/ActionTypes'

export const getAllBooks = () => async (dispatch) => {
    const res = await callApi('books', 'GET', { active: 1, row_per_page: 10000000 });
    if (res && res.status === 1)
        dispatch({
            type: GET_ALL_PRODUCTS,
            data: res.data.rows
        })
}

// export const getAllBooks = () => async (dispatch) => {
//     const res = await callApi('books', 'GET', { active: 1, row_per_page: 10000000 });
//     dispatch({
//         type: GET_ALL_PRODUCTS,
//         data: res.data.rows
//     })
// }
