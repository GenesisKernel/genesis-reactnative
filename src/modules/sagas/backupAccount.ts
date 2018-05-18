import { Share } from 'react-native';

import { takeEvery, put, race, take, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { path } from 'ramda';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';

import { requestPrivateKeyWorker } from 'modules/sagas/privateKey';
import * as auth from 'modules/auth';
import * as account from 'modules/account';
import * as application from 'modules/application';

export function* backupAccountWorker() {
  yield put(application.actions.showModal({ type: ModalTypes.BACKUP_ACCOUNT }));

  const { cancel, confirm } = yield race({
    cancel: take(application.actions.closeModal),
    confirm: take(application.actions.confirmModal),
  });

  if (cancel) return;

  if (confirm) {
    yield put(application.actions.closeModal());
    yield call(delay, MODAL_ANIMATION_TIME); // closing modal animation
    yield put(application.actions.toggleDrawer(false));
    yield call(delay, MODAL_ANIMATION_TIME); // closing drawer animation

    const requestKey = yield call(requestPrivateKeyWorker);
    const privateKey = path(['privateKey'], requestKey);

    if (!privateKey) return;
    const ecosystem = yield select(auth.selectors.getCurrentEcosystemId);
    yield call(delay, 700); // dont know why, but without delay, or delay < 700, we get some troubles on iOS

    try {
      const shareResult = yield call(Share.share,
        {
          message: `${privateKey};${ecosystem}`,
          title: 'apla',
          url: `${privateKey};${ecosystem}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return;
}

export default function* backupAccountSaga() {
  yield takeEvery(account.actions.backupAccount, backupAccountWorker);
}