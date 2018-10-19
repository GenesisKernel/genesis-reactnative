import { Action } from 'typescript-fsa';
import { SagaIterator, delay } from 'redux-saga';
import { takeEvery, put, call, select, fork, take, race, all } from 'redux-saga/effects';
import { requestPrivateKeyWorker, refreshPrivateKeyExpireTime } from '../sagas/privateKey';
import { ModalTypes } from '../../constants';

import * as auth from 'modules/auth';
import * as application from 'modules/application';
import * as account from 'modules/account';
import * as nodes from 'modules/nodes';

import api, { apiSetUrl, apiSetToken } from 'utils/api';
import Keyring from 'utils/keyring';
import { TxDissect } from 'utils/common';

import { REQUIRED_ALIVE_NODES_COUNT } from '../../constants';
import { checkNodeValidity, loginCall, prepareContractWorker } from 'modules/sagas/sagaHelpers';
import { runTransaction, checkTransactionStatus, confirmNestedContracts, setTransactions } from './actions';
import { getTransactions } from './selectors';
import { toHex } from 'utils/transactions/convert';

class StatusError extends Error { }
export interface IPrepareData {
  forsign: string;
  signs?: Array<{
    forsign: string;
    field: string;
  }>;
}

export function* getTransactionStatus(hashes: {[hash: string]: string}) {
  while (true) {
    const response = yield call(api.transactionStatus, Object.values(hashes));
    yield put(checkTransactionStatus(response.data));

    if (response.data.results) {
      const resultsValues = Object.values(response.data.results);
      for (const item of resultsValues) {
        if (item.errmsg) {
          throw ({
            title: item.errmsg.type || 'didn\'t get error type',
            message: item.errmsg.error || 'didn\'t get error message',
          });
        }
      }

      if (resultsValues.every(item => item.blockid)) {
        return resultsValues;
      }
    }

    yield call(delay, 2000);
  }
}

/* L E G A C Y
export function* signsWorker(prepareData: IPrepareData, params: any, privateKey: string, transactionUuid: string): SagaIterator {
  let fullForsign = prepareData.forsign;
  const signParams: any = {};

  if (prepareData.signs) {
    for (const el of prepareData.signs) {
      yield put(application.actions.showModal({
        type: ModalTypes.CONTRACT, params: {
          ...el,
          ...params
        }
      })); // modal, where user can confirm or cancel signing of nested contracts

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

export function* signNestedContractsWorker(sign: { forsign: string }, privateKey: string): SagaIterator {
  try {
    const signature = yield call(Keyring.sign, sign.forsign, privateKey); // signing nested contract
    return signature;
  } catch (err) {
    console.error(err, 'ERROR AT => getSignParamsWorker');
  }
}
*/
export function* filterTransactions(transactionToDelete: string): SagaIterator {
  const transactions = yield select(getTransactions);
  for (const key in transactions) {
    if (key === transactionToDelete) {
      delete transactions[key];
    }
  }
  yield put(setTransactions(transactions)); // removing transaction which was canceled
}

export function* contractWorker(action: Action<ITransactionStarted>): SagaIterator {
  try {
    const getKey = yield call(requestPrivateKeyWorker);
    const locale = yield select(application.selectors.getCurrentLocale);

    if (!getKey) {
      yield call(filterTransactions, action.payload.uuid);
      return; // if no key we need to clear transactions
    }

    const { privateKey } = getKey;
    const preparedContracts = yield call(prepareContractWorker, action.payload, privateKey);
    if (!preparedContracts) throw new Error(`Error while preparing contract`);

    const transactionsStatus = yield call(getTransactionStatus, preparedContracts);

    yield put(
      runTransaction.done({
        params: action.payload,
        result: {
          id: transactionsStatus[0].result,
          block: transactionsStatus[0].blockid,
          contract: action.payload.contracts[0].contract,
        } // TODO: push all transactions here, instead of first
      })
    );
    yield call(refreshPrivateKeyExpireTime);
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
