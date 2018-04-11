import { Action } from 'typescript-fsa';
import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call, race, take, spawn } from 'redux-saga/effects';
import { takeLast } from 'ramda';
import * as uuid from 'uuid';
import * as transaction from 'modules/transaction';
import { requestPrivateKeyWorker } from 'modules/sagas/privateKey';

type ICompositeContract = {
  data: { [name: string]: any; };
  name: string;
  meta: {}
};

type ICompositeContractsPayload = ICompositeContract[];

const CONTRACTS_PER_TICK = 5;

export function* compositeContractsFinishCatcher(itemToStop: number) {
  let counter = 0;
  yield takeEvery(transaction.actions.runTransaction.done, function* (contract: any) {
    counter += 1;
    if (counter === itemToStop) {
      yield put(transaction.actions.runCompositeContracts.done({
        params: { name: 'finished', data: '' },
        result: {},
      }));
    }
  });
}

export function* compositeContractsWorker(action: Action<ICompositeContractsPayload>) {
  const generatedKey = yield call(requestPrivateKeyWorker);
  if (!generatedKey) return;

  const { meta, payload } = action;
  let contracts: { name: string; data: any, uuid: string; }[] = [];
  payload.forEach((item: any) => {
    const id: string = uuid.v4();
    const contract = item.data.map((el: any) => {
      return {
        uuid: id,
        name: item.name,
        data: el,
      }
    });
    contracts.push(...contract);
  });

  yield spawn(compositeContractsFinishCatcher, contracts.length);

  let isFirstIteration = true;
  while (true) {
    const itemsToSlice = !isFirstIteration ? 1 : CONTRACTS_PER_TICK;
    const newContracts = contracts.splice(0, itemsToSlice);

    if (newContracts.length === 0) return;

    for (const contract of newContracts) {
      yield put(transaction.actions.runTransaction.started(
        {
          uuid: contract.uuid,
          datetime: new Date(),
          contract: contract.name,
          params: contract.data
        },
        action.meta,
      ));
    }

    const compositeResult = yield race({
      success: take(transaction.actions.runTransaction.done),
      failed: take(transaction.actions.runTransaction.failed),
    });

    if (compositeResult.success) {
      isFirstIteration = false;
    }

    if (compositeResult.failed) {
      yield put(transaction.actions.runCompositeContracts.failed({
        params: { name: 'finished', data: '' },
        error: 'Composite contract run failed.'
      }));
      return;
    };
  }
}

export default function* compositeContractsSaga() {
  yield takeEvery(transaction.actions.runCompositeContracts.started, compositeContractsWorker);
}
