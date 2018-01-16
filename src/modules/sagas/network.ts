import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put } from 'redux-saga/effects';

import * as application from 'modules/application';
import * as account from 'modules/account';
import * as auth from 'modules/auth';
import * as page from 'modules/page';

export function* startRequestWorker(action: Action<any>): SagaIterator {
  yield put(application.actions.strartNetworkRequest(action.type));
}

export function* finishRequestWorker(action: Action<any>): SagaIterator {
  yield put(application.actions.finishNetworkRequest());
}

export default function* networkSaga(): SagaIterator {
  yield takeEvery(
    [
      auth.actions.login.started,
      account.actions.createAccount.started
    ],
    startRequestWorker
  );
  yield takeEvery(
    [
      auth.actions.login.done,
      auth.actions.login.failed,
      account.actions.createAccount.done,
      account.actions.createAccount.failed
    ],
    finishRequestWorker
  );
}
