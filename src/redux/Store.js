import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers/RootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import expireReducer from 'redux-persist-expire'

const rootPersistConfig = {

    key: 'root',
    storage:storage,
    transforms: [
        expireReducer('userdata',{
            expireSeconds: 10,
            expiredState: {},
            autoExpire: true
        })
    ]
}


const persistedReducer = persistReducer(rootPersistConfig, RootReducer);

const initialState = {}
const middlewares = [thunk]
let devtools = (x) => x

// if(
//     process.env.NODE_ENV !== 'production' &&
//     process.browser &&
//     window.__REDUX_DEVTOOLS_EXTENSION__
// ) {
 //   devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
//}

export const Store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares),devtools)
)