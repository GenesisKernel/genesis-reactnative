import { path } from 'ramda';
import { Action } from 'typescript-fsa';
import { delay, SagaIterator } from 'redux-saga';
import { takeEvery, put, call, select, all, take } from 'redux-saga/effects';

import { apiSetToken } from 'utils/api';
import { checkTouchIDAvailiability, getCurrentLocale } from 'utils/common';
import { defaultPageSetter } from 'modules/sagas/sagaHelpers';
import { waitForError } from '../sagas/utils';
import { navTypes, ERRORS, DEFAULT_PAGE } from '../../constants';
import {
  initStart, initFinish, receiveAlert, checkForTouchID,
  cancelAlert, toggleDrawer, setCurrentLocale, setDefaultPage
} from './actions';
import { getDrawerState, getAlert } from './selectors';

import * as navigatorActions from 'modules/navigator/actions';
import * as authActions from 'modules/auth/actions';
import * as authSelectors from 'modules/auth/selectors';
import * as accountSelectors from 'modules/account/selectors';

interface IErrorAlert {
  error: {
    title?: string;
    message: string;
    data: {
      error: string;
    }
  };
  params: any;
}

export function* initWorker(): SagaIterator {
  const { hasValidToken, token, isTouchIDAvailable, currentLocale } = yield all({
    token: select(authSelectors.getToken),
    hasValidToken: select(authSelectors.hasValidToken),
    isTouchIDAvailable: call(checkTouchIDAvailiability),
    currentLocale: call(getCurrentLocale),
  });

  yield put(setCurrentLocale(currentLocale));
  yield put(checkForTouchID(isTouchIDAvailable));

  yield call(delay, 300); // Just for visual effect

  if (hasValidToken) {
    apiSetToken(token);
    try {
      yield call(defaultPageSetter);
    } catch (error) {
      console.log(error);
    }

    yield put(initFinish());
    yield put(
      navigatorActions.navigateWithReset([{ routeName: navTypes.HOME }])
    );

    return;
  } else {
    yield put(authActions.detachSession());
    yield put(initFinish());
    yield put(
      navigatorActions.navigateWithReset([
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
  const isAuthed = yield select(authSelectors.getAuthStatus);
  if (!isAuthed) return;

  const uniqKey = yield select(authSelectors.getCurrentAccount);
  const { drawerOpen, encKey } = yield all({
    drawerOpen: select(getDrawerState),
    encKey: select(accountSelectors.getAccountEncKey(uniqKey))
  });

  if (drawerOpen) {
    yield put(toggleDrawer(false));
  }

  yield put(authActions.detachSession());
  yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.SIGN_IN, params: { uniqKey, encKey } }]));
}

export function* alertWorker(action: Action<IErrorAlert>): SagaIterator {
  const message =
    path<string>(['error', 'message'])(action.payload) ||
    path<string>(['error'])(action.payload) ||
    'Unexpected error!';

  const { error: { title = 'Warning!' } } = action.payload;

  if (message && !(action.meta && action.meta.ignore)) {
    const isActiveAlert = yield select(getAlert);
    if (!isActiveAlert) {
      yield put(receiveAlert({ title, message, type: 'error' }));

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
  yield takeEvery(authActions.detachSession, resetDefaultPageWorker);
}

export default applicationWatcher;
