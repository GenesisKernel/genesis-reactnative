import { Action } from 'typescript-fsa';
import { SagaIterator, delay } from 'redux-saga';
import { takeEvery, put, call, select, fork, take, race } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as auth from 'modules/auth';
import * as applicationActions from 'modules/application/actions';
import api from 'utils/api';
import Keyring from 'utils/keyring';
import { runTransaction, checkTransactionStatus, confirmNestedContracts, rejectNestedContract } from './actions';
import { getFullForsign } from './selectors';

class StatusError extends Error {}
export interface IPrepareData {
  forsign: string;
  signs?: object[];
}

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

export function* signsWorker(prepareData: IPrepareData): SagaIterator {
  let fullForsign = prepareData.forsign;

  if (prepareData.signs) {
    for (const el of prepareData.signs) {
      yield put(applicationActions.showNestedContractSigningModal(el));

      const result = yield race({
        confirm: take(applicationActions.confirmNestedContractSignin),
        cancel: take(applicationActions.cancelNestedContractSignin)
      })

      console.log(result)

      if(result.confirm) {
        fullForsign += `,${el.forsign}`;
        yield put(applicationActions.cancelNestedContractSignin()); // just to close the modal
      }

      if(result.cancel) {
        yield put(rejectNestedContract())
        return;
      }
    }
  }
  console.log(fullForsign, 'FUUUUL');
  yield put(confirmNestedContracts(fullForsign));
}

export function* contractWorker(action: Action<any>): SagaIterator {
  try {
    const { data: prepareData } = yield call(
      api.prepareContract,
      action.payload.contract,
      action.payload.params
    ); // Prepate contract

    yield fork(signsWorker, prepareData);
    const signingResult = yield race({
      valid: take(confirmNestedContracts),
      invalid: take(rejectNestedContract)
    });

    if (signingResult.valid) {
      const fullForsign = yield select(getFullForsign);
      const publicKey = yield select(auth.selectors.getPublicKey);
      const privateKey = yield select(auth.selectors.getPrivateKey);

      const signature = yield call(Keyring.sign, fullForsign, privateKey); // generate the signature

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
    } else {
      console.log('SIGNING CANCELED')
    }
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
