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
import { REQUIRED_ALIVE_NODES_COUNT } from '../../constants';
import { checkNodeValidity } from 'modules/sagas/sagaHelpers';
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

export function* validateContractWorker(action: Action<any>, locale: string, privateKey: string) {
  const { nodesList, currentNode, token, uniqKey } = yield all({
    nodesList: select(nodes.selectors.getNodesList),
    currentNode: select(nodes.selectors.getCurrentNode),
    uniqKey: select(auth.selectors.getCurrentAccount),
    token: select(auth.selectors.getToken),
  });

  const currentAcc = yield select(account.selectors.getAccount(uniqKey));
  const validNodes = yield call(checkNodeValidity, nodesList, REQUIRED_ALIVE_NODES_COUNT, token, currentNode, true);

  if (!validNodes.length || validNodes.length !== REQUIRED_ALIVE_NODES_COUNT) return false;
  let validatedContracts = [];

  for (const node of validNodes) {
    try {
      yield call(apiSetToken, node.signature.token);
      yield call(apiSetUrl, `${node.apiUrl}api/v2`);
      const signature = yield call(Keyring.sign, node.signature.uid, privateKey);

      let { data: accountData } = yield call(api.login, {
        signature,
        ecosystem: currentAcc.ecosystem_id,
        publicKey: currentAcc.publicKey,
      });
      yield call(apiSetToken, accountData.token);

      const { data: prepareData } = yield call(
        api.prepareContract,
        action.payload.contract,
        { ...action.payload.params, Lang: locale },
      );

      prepareData.forsign = prepareData.forsign.replace(/,(\d+),/, ',');
      validatedContracts.push(prepareData);
    } catch (err) {
      yield call(apiSetUrl, `${currentNode.apiUrl}api/v2`);
      yield call(apiSetToken, token);
      return false;
    }
  }

  yield call(apiSetUrl, `${currentNode.apiUrl}api/v2`);
  yield call(apiSetToken, token);

  if (validatedContracts[0].forsign === validatedContracts[1].forsign && Math.abs(validatedContracts[0].time - validatedContracts[1].time) <= 60) {
    return true;
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
    const isContractValid = yield call(validateContractWorker, action, locale, privateKey);

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
