import { path } from 'ramda';
import { Action } from 'typescript-fsa';
import { delay, SagaIterator } from 'redux-saga';
import { takeEvery, put, call, select, all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';

import { apiSetToken } from 'utils/api';
import { checkTouchIDAvailiability, getCurrentLocale } from 'utils/common';
import { waitForError } from '../sagas/utils';
import { navTypes, ERRORS } from '../../constants';
import { initStart, initFinish, receiveAlert, checkForTouchID, cancelAlert, toggleDrawer, setCurrentLocale } from './actions';
import { getDrawerState, getAlert } from './selectors';

import * as auth from 'modules/auth';
import * as page from 'modules/page';
import * as account from 'modules/account';
import * as navigator from 'modules/navigator';

interface IErrorAlert {
  error: {
    message: string;
    data: {
      error: string;
    }
  };
  params: any;
}

export function* initWorker(): SagaIterator {
  const { hasValidToken, token, isTouchIDAvailable, currentLocale } = yield all({
    token: select(auth.selectors.getToken),
    hasValidToken: select(auth.selectors.hasValidToken),
    isTouchIDAvailable: call(checkTouchIDAvailiability),
    currentLocale: call(getCurrentLocale),
  });

  yield put(setCurrentLocale(currentLocale));
  yield put(checkForTouchID(isTouchIDAvailable));

  const { accounts } = yield select((state) => state);

  yield call(delay, 300); // Just for visual effect

  if (hasValidToken) {
    apiSetToken(token);

    yield put(initFinish());
    yield put(
      navigator.actions.navigateWithReset([{ routeName: navTypes.HOME }])
    );

    return;
  } else {
    yield put(auth.actions.detachSession());
    yield put(initFinish());
    yield put(
      navigator.actions.navigateWithReset([
        { routeName: navTypes.ACCOUNT_SELECT }
      ])
    );
  }
}

export function* persistWorker() {
  yield put(initStart());
}

export function* expiredTokenWorker(params: { address?: string; ecosystemId?: string }) {
  yield take(cancelAlert);
  const { drawerOpen, address, ecosystemId } = yield all({
    drawerOpen: select(getDrawerState),
    address: params.address || (select(auth.selectors.getCurrentAccountAddress)),
    ecosystemId: params.ecosystemId || (select(auth.selectors.getCurrentEcosystemId)),
  });

  if (drawerOpen) {
    yield put(toggleDrawer(false));
  }

  yield put(auth.actions.detachSession());
  yield put(navigator.actions.navigateWithReset([{ routeName: navTypes.SIGN_IN, params: { id: address, ecosystemId}  }]));
}

export function* alertWorker(action: Action<IErrorAlert>): SagaIterator {
  const message =
    path<string>(['error', 'message'])(action.payload) ||
    path<string>(['error'])(action.payload) ||
    'Unexpected error!';

  if (message && !(action.meta && action.meta.ignore)) {
    const isActiveAlert = yield select(getAlert);
    if (!isActiveAlert) {
      yield put(receiveAlert({ title: 'Server error!', message, type: 'error' }));

      if (path(['error', 'data', 'error'], action.payload) === ERRORS.TOKEN_EXPIRED) {
        yield call(expiredTokenWorker, action.payload.params);
      }
    }
  }
}

export function* applicationWatcher(): SagaIterator {
  // yield takeEvery(REHYDRATE, persistWorker);
  yield takeEvery(initStart, initWorker);
  yield takeEvery(waitForError(), alertWorker);
}

export default applicationWatcher;
