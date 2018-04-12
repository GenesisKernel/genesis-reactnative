import { combineReducers } from 'redux';
import { reducer as formReducer, FormReducer as IFormReducer } from 'redux-form';
import { all } from 'redux-saga/effects';
import * as auth from './auth';
import * as application from './application';
import * as account from './account';
import * as navigator from './navigator';
import * as ecosystem from './ecosystem';
import * as page from './page';
import * as transaction from './transaction';
import * as notifications from './notifications';
import * as nodes from './nodes';

import commonSagas from './sagas';

export interface IRootState {
  nodes: nodes.IState;
  auth: auth.IState;
  application: application.IState;
  accounts: account.IState;
  ecosystems: ecosystem.IState;
  pages: page.IState;
  transactions: transaction.IState;
  form: IFormReducer;
  notifications: notifications.IState;
}

export function* rootSaga() {
  yield all([
    application.saga(),
    nodes.saga(),
    auth.saga(),
    notifications.saga(),
    page.saga(),
    transaction.saga(),
    ecosystem.saga(),
    ...commonSagas()
  ]);
}

export default {
  nodes: nodes.reducer,
  auth: auth.reducer,
  application: application.reducer,
  accounts: account.reducer,
  ecosystems: ecosystem.reducer,
  pages: page.reducer,
  navigation: navigator.reducer,
  transactions: transaction.reducer,
  form: formReducer,
  notifications: notifications.reducer,
};
