import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import products from './products'
import user from './user'
import category from './category'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'category', 'user']
}
const rootReducer = combineReducers({
    products, user, category
})
export default persistReducer(persistConfig, rootReducer);