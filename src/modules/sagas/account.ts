import { SagaIterator, delay } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, take, race, select, call } from 'redux-saga/effects';

import { MODAL_ANIMATION_TIME } from '../../constants';
import * as account from 'modules/account';
import * as application from 'modules/application';
import * as auth from 'modules/auth';

export function* removeAccountWorker(action: Action<any>): SagaIterator {
  yield put(
    application.actions.receiveAlert({
      title: "alert.title.warning",
      type: 'warning',
      message: "account.want.to.remove",
    })
  );

  const result = yield race({
    confirm: take(application.actions.confirmAlert),
    cancel: take(application.actions.cancelAlert)
  });

  if (result.confirm) {
    const currentAccountAddress = yield select(auth.selectors.getCurrentAccountAddress);

    if (action.payload.accountAddress === currentAccountAddress) {
      yield put(application.actions.toggleDrawer(false));
      yield call(delay, MODAL_ANIMATION_TIME);
      yield put(auth.actions.logout());
    }
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
