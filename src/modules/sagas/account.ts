import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, take, race } from 'redux-saga/effects';

import * as account from 'modules/account';
import * as application from 'modules/application';

export function* removeAccountWorker(action: Action<any>): SagaIterator {
  yield put(
    application.actions.receiveAlert({
      title: 'Warning!',
      message: 'Do you want to remove this account?',
      type: 'warning'
    })
  );

  const result = yield race({
    confirm: take(application.actions.confirmAlert),
    cancel: take(application.actions.cancelAlert)
  });

  if (result.confirm) {
    yield put(
      account.actions.removeAccount.done({
        params: action.payload,
        result: null
      })
    );
  }

  if (result.cancel) {
    yield put(
      account.actions.removeAccount.failed(
        {
          params: action.payload,
          error: 'User rejected the action!'
        },
        { ignore: true }
      )
    );
  }
}

export default function* AccountSaga(): SagaIterator {
  yield takeEvery(account.actions.removeAccount.started, removeAccountWorker);
}
