import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import products from './products'
import user from './user'
import category from './category'
import author from './author'
import publishingHouse from './publishingHouse'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'category', 'user', 'author', 'publishing_house']
}
const rootReducer = combineReducers({
    products,
    user,
    category,
    author,
    publishing_house: publishingHouse
})
export default persistReducer(persistConfig, rootReducer);