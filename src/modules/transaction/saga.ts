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
  signs?: {
    forsign: string;
    field: string;
  }[];
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

export function* signsWorker(prepareData: IPrepareData, params: any): SagaIterator {
  let fullForsign = prepareData.forsign;
  const signParams: any = {};
  if (prepareData.signs) {
    for (const el of prepareData.signs) {
      yield put(applicationActions.showNestedContractSigningModal({ ...el, ...params })); // modal, where user can confirm or cancel signing of nested contracts

      const result = yield race({
        confirm: take(applicationActions.confirmNestedContractSignin),
      });

      if(result.confirm) {
        signParams[el.field] = yield call(signNestedContractsWorker, el);
        fullForsign += `,${signParams[el.field]}`;
        yield put(applicationActions.hideNestedContractSigningModal());
      }
    }
  }
  yield put(confirmNestedContracts({ fullForsign, signParams }));
}

export function* signNestedContractsWorker(sign: { forsign: string } ): SagaIterator {
  try { // signing nested contract
    const privateKey = yield select(auth.selectors.getPrivateKey);
    const signature = yield call(Keyring.sign, sign.forsign, privateKey);

    return signature;
  } catch(err) {
    console.error(err, 'ERROR AT => getSignParamsWorker');
  }
}

export function* contractWorker(action: Action<any>): SagaIterator {
  try {
    const privateKeyValid = yield select((state: any) => state.auth.privateKeyValid);
    if (!privateKeyValid) return;

    const { data: prepareData } = yield call(
      api.prepareContract,
      action.payload.contract,
      action.payload.params
    ); // Prepate contract

    yield fork(signsWorker, prepareData, { ...action.payload.params, ...action.payload.contract }); // checking if there is nested contracts

    const signingResult = yield race({
      valid: take(confirmNestedContracts),
      invalid: take(rejectNestedContract)
    });

    if (signingResult.valid) {
      const { fullForsign, signParams } = yield select(getFullForsign);
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
          ...signParams,
          pubkey: publicKey
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
      yield put(applicationActions.hideNestedContractSigningModal());
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
