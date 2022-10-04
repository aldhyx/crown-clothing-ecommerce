import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

// Jika true maka akan mengembalikan [logger], jika false akan mengambalikan []
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);