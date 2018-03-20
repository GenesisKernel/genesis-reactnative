import { applicationWatcher, persistWorker, initWorker, alertWorker, expiredTokenWorker } from '../saga';
import { Action, AnyAction } from 'typescript-fsa';
import { initStart, initFinish, receiveAlert, checkForTouchID, cancelAlert, toggleDrawer } from '../actions';
import { waitForError } from '../../sagas/utils';
import { checkTouchIDAvailiability } from 'utils/common';
import { takeEvery, put, call, select, all, take } from 'redux-saga/effects';

import { REHYDRATE } from 'redux-persist/lib/constants';
import { navTypes, ERRORS } from '../../../constants';

import * as auth from 'modules/auth';
import * as navigator from 'modules/navigator';
import * as application from 'modules/application';

describe('applicationWatcher', () => {
  it('applicationWatcher SAGA', () => {
    const iterator = applicationWatcher();
    expect(iterator.next().value).toEqual(takeEvery(REHYDRATE, persistWorker));
    expect(iterator.next().value).toEqual(takeEvery(initStart, initWorker));
  });

  it('persistWorker', () => {
    const iterator = persistWorker();
    expect(iterator.next().value).toEqual(put(initStart()));
  });

  it('initWorker with VALID token', () => {
    const iterator = initWorker();
    iterator.next();
    const { token, hasValidToken, isTouchIDAvailable } = {
      token: 'valid_token',
      hasValidToken: true,
      isTouchIDAvailable: false
    };

    iterator.next({ token, hasValidToken, isTouchIDAvailable });
    iterator.next(checkForTouchID(isTouchIDAvailable)); // put checkForTouchID
    iterator.next({ accounts: {} }); // set accounts

    expect(iterator.next().value).toEqual(put(initFinish()));
    expect(iterator.next().value).toEqual(put(
      navigator.actions.navigateWithReset([{ routeName: navTypes.HOME }])
    ));
  });

  it('initWorker with INVALID token', () => {
    const iterator = initWorker();
    iterator.next();
    const { token, hasValidToken, isTouchIDAvailable } = {
      token: 'invalid_token',
      hasValidToken: false,
      isTouchIDAvailable: false
    };

    iterator.next({ token, hasValidToken, isTouchIDAvailable });
    iterator.next(checkForTouchID(isTouchIDAvailable)); // put checkForTouchID
    iterator.next({ accounts: {} }); // set accounts

    expect(iterator.next().value).toEqual(put(auth.actions.detachSession()));
    expect(iterator.next().value).toEqual(put(initFinish()));
    expect(iterator.next().value).toEqual(put(
      navigator.actions.navigateWithReset([
        { routeName: navTypes.ACCOUNT_SELECT }
      ])
    ));
  });
});
const errorAction = {
  type: 'smth_FAILED',
  payload: {
    error: {
      message: 'its error',
      data: {
        error: ERRORS.TOKEN_EXPIRED,
      },
    },
    params: {},
  },
};

describe('alertWorker', () => {
  it('alertWorker with error === ERRORS.TOKEN_EXPIRED', () => {
    const iterator = alertWorker(errorAction);
    expect(iterator.next(errorAction.payload).value).toEqual(put(receiveAlert({ title: 'Server error!', message: 'its error', type: 'error' })));
    expect(iterator.next().value).toEqual(call(expiredTokenWorker, errorAction.payload.params))
  });

  it('expiredTokenWorker', () => {
    const iterator = expiredTokenWorker({});
    iterator.next({});
    iterator.next(put(cancelAlert()));

    const { drawerOpen, address, ecosystemId } = {
      drawerOpen: true,
      address: 'address',
      ecosystemId: 'ecosysID',
    };
    expect(iterator.next({ drawerOpen, address, ecosystemId }).value).toEqual(put(toggleDrawer(false)));
    expect(iterator.next().value).toEqual(put(auth.actions.detachSession()));
    expect(iterator.next().value).toEqual(put(navigator.actions.navigateWithReset([{ routeName: navTypes.SIGN_IN, params: { id: address, ecosystemId}  }])));
  });
});