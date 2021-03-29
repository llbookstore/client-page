import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import products from './products'
import user from './user'
import category from './category'
import author from './author'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'category', 'user', 'author']
}
const rootReducer = combineReducers({
    products, user, category, author
})
export default persistReducer(persistConfig, rootReducer);