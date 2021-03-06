import { callApi } from '../utils/callApi'
import {
    GET_PUBLISHING_HOUSES
} from '../constants/ActionTypes'

export const getPublishingHouses = () => async (dispatch) => {
    const res = await callApi('publishing_house', 'GET', { active: 1, row_per_page: 1000000 });
    if (res && res.status === 1)
        dispatch({
            type: GET_PUBLISHING_HOUSES,
            data: res.data.rows
        })
}
