import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Jika true maka akan mengembalikan [logger], jika false akan mengambalikan []
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
const composeEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);