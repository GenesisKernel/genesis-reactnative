import { takeEvery, delay } from 'redux-saga';
import { IAccout } from 'modules/account/reducer';

import { put, race, cancel, take, call, select } from 'redux-saga/effects';
import { ModalTypes, navTypes, MODAL_ANIMATION_TIME } from '../../constants';
import Keyring from 'utils/keyring';

import * as account from 'modules/account';
import * as application from 'modules/application';
import * as navigator from 'modules/navigator';
import { validatePassword } from './privateKey';
import { changePassword, cancelChangingPassword, confirmChangingPassword } from 'modules/account/actions';
import * as auth from 'modules/auth';

interface IExtendedAccount extends IAccout {
  ecosystemId: string;
}

export function* changePasswordWorker(action: { payload: IExtendedAccount }) {
  yield put(application.actions.showModal({ type: ModalTypes.PASSWORD }));

  const { cancel, confirm } = yield race({
    cancel: take(application.actions.closeModal),
    confirm: take(application.actions.confirmModal),
  });

  if (cancel) return;

  if (confirm) {
    const privateKey = yield call(validatePassword,
      {
        encKey: action.payload.encKey,
        password: confirm.payload
      }
    );

    if (!!privateKey) {
      yield call(delay, MODAL_ANIMATION_TIME); // closing modal animation
      yield put(application.actions.toggleDrawer(false));
      yield call(delay, MODAL_ANIMATION_TIME); // closing drawer animation
      yield put(navigator.actions.navigate(navTypes.SIGN_UP_CONFIRM, { changePassword: true }));

      const { success, failure } = yield race({
        success: take(confirmChangingPassword),
        failure: take(cancelChangingPassword)
      });

      if (failure) {
        yield put(navigator.actions.back());
        return;
      }

      if (success) {
        const encKey = yield call(Keyring.encryptAES, privateKey, success.payload);
        const accountWithNewKey = {
          ...action.payload,
          encKey
        };

        yield put(changePassword.done({ params: '', result: accountWithNewKey }));

        const loggedAccountAddress = yield select(auth.selectors.getCurrentAccountAddress);

        if (loggedAccountAddress === accountWithNewKey.address) {
          yield put(navigator.actions.navigateWithReset([{ routeName: navTypes.HOME }]));
        } else {
          yield put(navigator.actions.navigateWithReset([
            {
              routeName: navTypes.SIGN_IN,
              params: {
                ecosystemId: action.payload.ecosystemId,
                password: confirm.payload,
                id: accountWithNewKey.address,
              }
            }
          ]));
        }
      }
    }
  }
}

export default function* changePasswordSaga() {
  yield takeEvery(changePassword.started, changePasswordWorker)
}