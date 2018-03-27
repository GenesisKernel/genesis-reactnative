import { changePasswordWorker } from '../changePassword';
import { changePassword } from 'modules/account/actions';
import { put } from 'redux-saga/effects';
import { navTypes } from '../../../constants';

import * as navigator from 'modules/navigator';

describe('changePasswordWorker', () => {
  const action = {
    type: changePassword.started,
    payload: {
      ecosystemId: '1',
      encKey: 'encKey',
      address: 'address',
    }
  }

  it('changePasswordWorker cancel', () => {
    const iterator = changePasswordWorker(action);
    iterator.next();
    iterator.next(); // showModal
    expect(iterator.next({ cancel: {  } }).value).toEqual(undefined); // race
  });

  it('changePasswordWorker confirm, invalid password', () => {
    const iterator = changePasswordWorker(action);
    iterator.next();
    iterator.next(); // showModal
    iterator.next({ confirm: { payload: 'password' } }); // race
    expect(iterator.next('').value).toEqual(undefined); // password not valid
  });

  it('changePasswordWorker confirm, valid password, cancelChangingPassword', () => {
    const iterator = changePasswordWorker(action);
    iterator.next();
    iterator.next(); // showModal
    iterator.next({ confirm: { payload: 'password' } }); // race
    iterator.next('12323') // password valid
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({ failure: {} }); // cancelChangingPassword
    expect(iterator.next().value).toEqual(undefined);
  });

  it('changePasswordWorker confirm, valid password, confirmChangingPassword, changing password for current account', () => {
    const iterator = changePasswordWorker(action);
    iterator.next();
    iterator.next(); // showModal
    iterator.next({ confirm: { payload: 'password' } }); // race
    iterator.next('12323') // password valid
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({ success: { payload: 'newPassword' } }); // confirmChangingPassword
    iterator.next(); // get encKey
    iterator.next(); // changePassword.done
    expect(iterator.next('address').value).toEqual(put(navigator.actions.navigateWithReset([{ routeName: navTypes.HOME }]))) // loggedAccountAddress === accountWithNewKey.address
    // if user changed password for current logged account we should navigate him to home screen, keeping logged
  });

  it('changePasswordWorker confirm, valid password, confirmChangingPassword, changing password for current account', () => {
    const iterator = changePasswordWorker(action);
    iterator.next();
    iterator.next(); // showModal
    iterator.next({ confirm: { payload: 'password' } }); // race
    iterator.next('12323') // password valid
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({ success: { payload: 'newPassword' } }); // confirmChangingPassword
    iterator.next(); // get encKey
    iterator.next(); // changePassword.done
    expect(iterator.next('123').value).toEqual(put(navigator.actions.navigateWithReset([
      {
        routeName: navTypes.SIGN_IN,
        params: {
          ecosystemId: action.payload.ecosystemId,
          password: 'password',
          id: 'address',
        }
      }
    ]))); // loggedAccountAddress === accountWithNewKey.address
    // if user changed password not for current account we should navigate him to SIGN_IN route, to give him opportunity to sign in into this account with new password
  });
});