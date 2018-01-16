import { Action } from 'typescript-fsa';
import { SagaIterator, delay } from 'redux-saga';
import { takeEvery, put, call, select, fork } from 'redux-saga/effects';

import * as auth from 'modules/auth';
import api from 'utils/api';
import Keyring from 'utils/keyring';
import { runTransaction, checkTransactionStatus } from './actions';

class StatusError extends Error {}

function* getTransactionStatus(hash: string) {
  while (true) {
    const response = yield call(api.transactionStatus, hash);

    yield put(checkTransactionStatus(response.data));

    if (response.data.errmsg) {
      throw new StatusError(response.data.errmsg);
    }

    if (response.data.blockid) {
      return response;
    }

    yield call(delay, 1500);
  }
}

export function* contractWorker(action: Action<any>): SagaIterator {
  try {
    const { data: prepareData } = yield call(
      api.prepareContract,
      action.payload.contract,
      action.payload.params
    ); // Prepate contract

    const publicKey = yield select(auth.selectors.getPublicKey);
    const privateKey = yield select(auth.selectors.getPrivateKey);

    const signature = yield call(Keyring.sign, prepareData.forsign, privateKey); // generate the signature

    const { data: contractData } = yield call(
      api.runContract,
      action.payload.contract,
      {
        ...action.payload.params,
        signature,
        time: prepareData.time,
        public: publicKey
      }
    ); // run contract

    const { data: statusData } = yield call(
      getTransactionStatus,
      contractData.hash
    ); // checking status of contract

    yield put(
      runTransaction.done({
        params: action.payload,
        result: {
          id: statusData.result,
          block: statusData.blockid
        }
      })
    );
  } catch (error) {
    yield put(
      runTransaction.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* pageSaga(): SagaIterator {
  yield takeEvery(runTransaction.started, contractWorker);
}

export default pageSaga;
