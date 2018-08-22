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
import { checkNodeValidity, loginCall } from 'modules/sagas/sagaHelpers';
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
      throw new StatusError(response.data.errmsg.error);
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

export function* validateContractWorker(action: any, privateKey: string, isMultiple = false) {
  const { nodesList, currentNode, token, uniqKey, locale } = yield all({
    nodesList: select(nodes.selectors.getNodesList),
    currentNode: select(nodes.selectors.getCurrentNode),
    uniqKey: select(auth.selectors.getCurrentAccount),
    token: select(auth.selectors.getToken),
    locale: select(application.selectors.getCurrentLocale),
  });

  const currentAcc = yield select(account.selectors.getAccount(uniqKey));
  const validNodes = yield call(checkNodeValidity, nodesList, REQUIRED_ALIVE_NODES_COUNT, token, currentNode, true);

  if (!validNodes.length || validNodes.length !== REQUIRED_ALIVE_NODES_COUNT) return false;
  let validatedContracts: any[] = [];

  for (const node of validNodes) {
    try {
      yield call(apiSetUrl, `${node.apiUrl}api/v2`);
      yield call(loginCall, { ecosystems: [currentAcc.ecosystem_id], public: currentAcc.publicKey, private: privateKey }, undefined, node.signature );

      let prepareResult;
      if (!isMultiple) {
        prepareResult = yield call(
          api.prepareContract,
          action.payload.contract,
          { ...action.payload.params, Lang: locale },
        );
        const { data: prepareData } = prepareResult;
        prepareData.forsign = prepareData.forsign.replace(/^(\w+-\w+-\w+-\w+-\w+,\d+,\d+)/, ',');
        validatedContracts.push(prepareData);
      } else {
        prepareResult = yield call(
          api.prepareMultiple,
          action,
        );

        const { data: prepareData } = prepareResult;

        prepareData.forsign.forEach((forsign: string, index: number) => {
          prepareData.forsign[index] = TxDissect(forsign);
        });
        validatedContracts.push(...prepareData.forsign);
      }
    } catch (err) {
      yield call(apiSetUrl, `${currentNode.apiUrl}api/v2`);
      yield call(apiSetToken, token);
      return false;
    }
  }

  yield call(apiSetUrl, `${currentNode.apiUrl}api/v2`);
  yield call(apiSetToken, token);

  if (!isMultiple) {
    if (validatedContracts[0].forsign === validatedContracts[1].forsign && Math.abs(Number(validatedContracts[0].time) - Number(validatedContracts[1].time)) <= 60) {
      return true;
    }
  } else {
    if (validatedContracts.every(item => item.body === validatedContracts[0].body && Math.abs(item.timestamp - validatedContracts[0].timestamp) <= 3
    )) {
      return true;
    }
  }

  return false;
}

export function* contractWorker(action: Action<any>): SagaIterator {
  try {
    const getKey = yield call(requestPrivateKeyWorker);
    const locale = yield select(application.selectors.getCurrentLocale);

    if (!getKey) {
      yield call(filterTransactions, action.payload.uuid);
      return; // if no key we need to clear transactions
    }

    const { privateKey } = getKey;
    const isContractValid = yield call(validateContractWorker, action, privateKey);

    if (!isContractValid) throw new Error(`Contract isn't valid.`);

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
        prepareData.request_id,
        {
          signature,
          time: prepareData.time,
          pubkey: publicKey,
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
