import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist';
import reducers from './reducers/index';
const middleware = [thunk];
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store)
