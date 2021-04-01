import { callApi } from '../utils/callApi'
import {
    GET_AUTHORS
} from '../constants/ActionTypes'

export const getAuthors = () => async (dispatch) => {
    const res = await callApi('author', 'GET', { active: 1, row_per_page: 1000000 });
    dispatch({
        type: GET_AUTHORS,
        data: res.data.rows
    })
}
