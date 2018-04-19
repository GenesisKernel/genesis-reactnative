import { Action } from 'typescript-fsa';
import { SagaIterator, delay } from 'redux-saga';
import { takeEvery, put, call, select, fork, take, race } from 'redux-saga/effects';
import { requestPrivateKeyWorker, refreshPrivateKeyExpireTime } from '../sagas/privateKey';
import { ModalTypes } from '../../constants';

import * as auth from 'modules/auth';
import * as application from 'modules/application';
import * as account from 'modules/account';

import api from 'utils/api';
import Keyring from 'utils/keyring';
import { getCurrentLocale } from 'utils/common';
import { runTransaction, checkTransactionStatus, confirmNestedContracts, setTransactions } from './actions';
import { getTransactions } from './selectors';

class StatusError extends Error {}
export interface IPrepareData {
  forsign: string;
  signs?: {
    forsign: string;
    field: string;
  }[];
}

export function* getTransactionStatus(hash: string) {
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

export function* signsWorker(prepareData: IPrepareData, params: any, privateKey: string, transactionUuid: string): SagaIterator {
  let fullForsign = prepareData.forsign;
  const signParams: any = {};

  if (prepareData.signs) {
    for (const el of prepareData.signs) {
      yield put(application.actions.showModal({ type: ModalTypes.CONTRACT, params: {
        ...el,
        ...params
      }})); // modal, where user can confirm or cancel signing of nested contracts

      const result = yield race({
        confirm: take(application.actions.confirmModal),
        cancel: take(application.actions.closeModal),
      });

      if (result.confirm) {
        signParams[el.field] = yield call(signNestedContractsWorker, el, privateKey);
        fullForsign += `,${signParams[el.field]}`;
      }

      if (result.cancel) {
        yield call(filterTransactions, transactionUuid);
        return;
      }
    }
  }
  yield put(confirmNestedContracts({ fullForsign, signParams }));
}

export function* signNestedContractsWorker(sign: { forsign: string } , privateKey: string): SagaIterator {
  try {
    const signature = yield call(Keyring.sign, sign.forsign, privateKey); // signing nested contract
    return signature;
  } catch(err) {
    console.error(err, 'ERROR AT => getSignParamsWorker');
  }
}

export function* filterTransactions(transactionToDelete: string): SagaIterator {
  let transactions = yield select(getTransactions);
  for (let key in transactions) {
    if (key === transactionToDelete) {
      delete transactions[key];
    }
  }
  yield put(setTransactions(transactions)); // removing transaction which was canceled
}

export function* contractWorker(action: Action<any>): SagaIterator {
  try {
    const getKey = yield call(requestPrivateKeyWorker);
    const locale = yield select(application.selectors.getCurrentLocale);

    if (!getKey) {
      yield call(filterTransactions, action.payload.uuid);
      return; // if no no key we need to clear transactions
    }

    const { privateKey } = getKey;
    const { data: prepareData } = yield call(
      api.prepareContract,
      action.payload.contract,
      { ...action.payload.params, Lang: locale },
    ); // Prepate contract

    yield fork(signsWorker, prepareData, { ...action.payload.params, ...action.payload.contract }, privateKey, action.payload.uuid); // checking if there is nested contracts

    const signingResult = yield race({
      valid: take(confirmNestedContracts),
      invalid: take(setTransactions)
    });

    if (signingResult.valid) {
      const { fullForsign, signParams } = signingResult.valid.payload;
      const uniqKey = yield select(auth.selectors.getCurrentAccount);
      const { publicKey } = yield select(account.selectors.getAccount(uniqKey));

      const signature = yield call(Keyring.sign, fullForsign, privateKey); // generate the signature

      const { data: contractData } = yield call(
        api.runContract,
        action.payload.contract,
        {
          ...action.payload.params,
          signature,
          time: prepareData.time,
          ...signParams,
          pubkey: publicKey,
          Lang: locale,
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
      yield call(refreshPrivateKeyExpireTime);
    }

    if (signingResult.invalid) {
      yield put(application.actions.closeModal());
      return;
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
