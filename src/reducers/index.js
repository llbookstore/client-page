import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import products from './products'
import user from './user'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products']
}
const rootReducer = combineReducers({
    products, user
})
export default persistReducer(persistConfig, rootReducer);