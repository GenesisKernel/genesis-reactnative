import { applicationWatcher, persistWorker, initWorker, alertWorker } from '../saga';
import { Action, AnyAction } from 'typescript-fsa';
import { initStart, initFinish, receiveAlert, checkForTouchID, cancelAlert, toggleDrawer } from '../actions';
import { waitForError } from '../../sagas/utils';
import { checkTouchIDAvailiability } from 'utils/common';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { navTypes } from '../../../constants';

import * as auth from 'modules/auth';
import * as navigator from 'modules/navigator';

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
      token: '123',
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
      token: '123',
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

// describe('alertWorker', () => {
//   it('alertWorker', () => {
//     const iterator = alertWorker();
//   })
// });