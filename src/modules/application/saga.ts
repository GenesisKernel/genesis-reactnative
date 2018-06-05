import { path } from 'ramda';
import { Action } from 'typescript-fsa';
import { delay, SagaIterator } from 'redux-saga';
import { takeEvery, put, call, select, all, take } from 'redux-saga/effects';

import { apiSetToken } from 'utils/api';
import { checkTouchIDAvailiability, getCurrentLocale } from 'utils/common';
import { defaultPageSetter } from 'modules/sagas/sagaHelpers';
import { waitForError } from '../sagas/utils';
import { navTypes, ERRORS, DEFAULT_PAGE } from '../../constants';
import { initStart, initFinish, receiveAlert, checkForTouchID, cancelAlert, toggleDrawer, setCurrentLocale, setDefaultPage } from './actions';
import { getDrawerState, getAlert } from './selectors';

import * as auth from 'modules/auth';
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

  yield call(delay, 300); // Just for visual effect

  if (hasValidToken) {
    apiSetToken(token);

    yield call(defaultPageSetter);

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

export function* expiredTokenWorker() {
  yield take(cancelAlert);
  const isAuthed = yield select(auth.selectors.getAuthStatus);
  if (!isAuthed) return;

  const uniqKey = yield select(auth.selectors.getCurrentAccount);
  const { drawerOpen, encKey } = yield all({
    drawerOpen: select(getDrawerState),
    encKey: select(account.selectors.getAccountEncKey(uniqKey))
  });

  if (drawerOpen) {
    yield put(toggleDrawer(false));
  }

  yield put(auth.actions.detachSession());
  yield put(navigator.actions.navigateWithReset([{ routeName: navTypes.SIGN_IN, params: { uniqKey, encKey } }]));
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
        yield call(expiredTokenWorker);
      }
    }
  }
}

function* resetDefaultPageWorker() {
  yield put(setDefaultPage(DEFAULT_PAGE));
}

export function* applicationWatcher(): SagaIterator {
  yield takeEvery(initStart, initWorker);
  yield takeEvery(waitForError(), alertWorker);
  yield takeEvery(auth.actions.detachSession, resetDefaultPageWorker);
}

export default applicationWatcher;
