import { SagaIterator, delay } from 'redux-saga';
import { path } from 'ramda';
import { select, call, put, race, take, spawn } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { ModalTypes } from '../../constants';

import Keyring from 'utils/keyring';
import * as application from 'modules/application';
import * as account from 'modules/account';
import * as auth from 'modules/auth';

const PRIVATE_KEY_LIVE_TIME = 3600000; // 1 hour

export function* privateKeyExpireWorker(): SagaIterator {
  while (true) {
    const privateKey = yield select(application.selectors.getPrivateKey);
    if (!privateKey) return;

    if (privateKey.expireTime <= Date.now()) {
      yield put(application.actions.setPrivateKey(null));
    }
    yield call(delay, 600000); // check every 10 minutes
  }
}

export function* refreshPrivateKeyExpireTime(): SagaIterator {
  const privateKey = yield select(application.selectors.getPrivateKey);
  privateKey.expireTime = Date.now() + PRIVATE_KEY_LIVE_TIME;
  yield put(application.actions.setPrivateKey({
    ...privateKey,
  }));
}

export function validatePassword(data: { encKey: string, password: string }): string | null {
  const { encKey, password } = data;
  const privateKey = Keyring.decryptAES(encKey, password);

  if (!!privateKey && Keyring.KEY_LENGTH === privateKey.length && /[a-f0-9]/i.test(privateKey)) {
    return privateKey;
  } else {
    return null;
  }
}

export function* validatePrivateKeyWorker(payload: { password?: string; privateKey?: string } ) {
  let privateKey = payload.privateKey || null;

  if (!privateKey && payload.password) {
    const currentAccountAddress = yield select(auth.selectors.getCurrentAccountAddress)
    const currentAccount = yield select(account.selectors.getAccount(currentAccountAddress));

    privateKey = yield call(validatePassword, { encKey: currentAccount.encKey, password: payload.password });
  }

  if (privateKey) {
    const privateKeyData = {
      expireTime: Date.now() + PRIVATE_KEY_LIVE_TIME,
      privateKey
    }

    yield put(application.actions.setPrivateKey(privateKeyData));
    yield spawn(privateKeyExpireWorker);
    return privateKeyData;
  }
}

export function* requestPrivateKeyWorker(): SagaIterator {
  const getKey = yield select(application.selectors.getPrivateKey);
  const privateKey: string = path(['privateKey'], getKey);

  if (!privateKey || Keyring.KEY_LENGTH !== privateKey.length) {
    const acc = yield select(account.selectors.getAccount(yield select(auth.selectors.getCurrentAccountAddress)));
    yield put(application.actions.showModal({ type: ModalTypes.PASSWORD, params: { encKey: acc.encKey } }));

    const modalResponse = yield race({
      success: take(application.actions.confirmModal),
      cancel: take(application.actions.closeModal),
    });

    if (modalResponse.cancel) {
      return;
    }

    if (modalResponse.success) {
      const newKey = yield call(validatePrivateKeyWorker, modalResponse.success.payload );
      if (!newKey) {
        return yield call(requestPrivateKeyWorker);
      } else {
        yield put(application.actions.closeModal());
        return newKey;
      }
    }
  }
  return getKey;
}