import { callApi } from '../utils/callApi'
import {
    GET_CATEGORY
} from '../constants/ActionTypes'

export const getCategories = () => async (dispatch) => {
    const res = await callApi('category', 'GET', { active: 1});
    dispatch({
        type: GET_CATEGORY,
        data: res.data
    })
}
