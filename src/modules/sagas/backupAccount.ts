import Mailer from 'react-native-mail';
import { takeEvery, put, race, take, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
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
    const email = confirm.payload;
    yield put(application.actions.closeModal());
    yield call(delay, MODAL_ANIMATION_TIME); // closing modal animation
    yield put(application.actions.toggleDrawer(false));
    yield call(delay, MODAL_ANIMATION_TIME); // closing drawer animation

    const { privateKey } = yield call(requestPrivateKeyWorker);
    const ecosystem = yield select(auth.selectors.getCurrentEcosystemId);

    try {
      Mailer.mail({
        subject: 'Your account import key.',
        body: `Your account key is: \n \n \n ${privateKey};${ecosystem} \n \n \n Just put it into import account field on your client.`,
        recipients: [email],
      }, (err: string, event: any) => {

      });
    } catch(error) {
      console.error(error);
    }
  }
}

export default function* backupAccountSaga() {
  yield takeEvery(account.actions.backupAccount, backupAccountWorker);
}