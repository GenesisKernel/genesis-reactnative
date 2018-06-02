import { Action } from 'typescript-fsa';
import { SagaIterator, delay } from 'redux-saga';
import { takeEvery, put, call, race, take, spawn } from 'redux-saga/effects';
import { takeLast } from 'ramda';
import * as uuid from 'uuid';
import * as transaction from 'modules/transaction';
import { validateContractWorker } from 'modules/transaction/saga';
import Keyring from 'utils/keyring';
import { requestPrivateKeyWorker, refreshPrivateKeyExpireTime } from 'modules/sagas/privateKey';
import api, { apiSetUrl, apiSetToken } from 'utils/api';

class StatusError extends Error {};
type ICompositeContract = {
  data: { [name: string]: any; };
  name: string;
  meta: {}
};

type ICompositeContractsPayload = {
  composite: ICompositeContract[],
  uuid: string;
};

export function* getMultipleTransactionsStatus(hashes: string[]) {
  while (true) {
    const response = yield call(api.transactionStatusMultiple, { hashes });

    if (response.data.results) {
      for(let item of Object.values(response.data.results)) {
        if (item.errmsg) {
          throw new StatusError(item.errmsg.error);
        }
      }

      return Object.values(response.data.results)[0];
    }

    yield call(delay, 3000);
  }
}

export function* compositeContractsWorker(action: Action<ICompositeContractsPayload>) {
  const generatedKey = yield call(requestPrivateKeyWorker);
  if (!generatedKey) return;

  const { privateKey, publicKey } = generatedKey;

  const { meta, payload } = action;
  let contracts: { contract: string; params: any }[] = [];

  payload.composite.forEach((contract) => {
    contract.data.forEach((el: any) => {
      contracts.push({
        contract: contract.name,
        params: el,
      });
    });
  });

  try {
    const isContractsValid = yield call(validateContractWorker, { contracts }, privateKey, true);

    if (!isContractsValid) throw new Error(`Contract isn't valid.`);

    const prepareData = yield call(api.prepareMultiple, { contracts });

    let signatures: string[] = [];

    for(let sign of  prepareData.data.forsign) {
      const signed = yield call(Keyring.sign, sign, privateKey);
      signatures.push(signed);
      yield call(delay, 10);
    }

    const runContract = yield call(api.runMultiple, prepareData.data.request_id, { signatures, time: prepareData.data.time, pubkey: publicKey });

    const statusData = yield call(getMultipleTransactionsStatus, runContract.data.hashes);

    yield put(
      transaction.actions.runCompositeContracts.done({
        params: { composite: { name: 'finished', data: '' }, uuid: payload.uuid },
        result: 'success',
      })
    );

    yield call(refreshPrivateKeyExpireTime);
  } catch (error) {
    yield put(transaction.actions.runCompositeContracts.failed({
      params: { composite: { name: 'finished', data: '' }, uuid: payload.uuid },
      error: error,
    }));
  }
}

export default function* compositeContractsSaga() {
  yield takeEvery(transaction.actions.runCompositeContracts.started, compositeContractsWorker);
}
