import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';

import rootReducer, { rootSaga, IRootState } from './index';
import { actions as applicationActions } from './application';

const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'apla',
  version: 1,
  storage,
  whitelist: [
    'auth',
    'accounts',
    'ecosystems'
  ]
};

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...[sagaMiddleware])
);
const reducer = persistCombineReducers(config, rootReducer);
const store = createStore<IRootState>(reducer, composedEnhancers);

persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
