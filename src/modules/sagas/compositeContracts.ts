import { Action } from 'typescript-fsa';
import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call, race, take, spawn } from 'redux-saga/effects';
import { takeLast } from 'ramda';
import * as uuid from 'uuid';
import * as transaction from 'modules/transaction';
import { requestPrivateKeyWorker } from 'modules/sagas/privateKey';

type ICompositeContractsPayload = {
  data: { [name: string]: any; };
  name: string;
  meta: {}
}[];

const CONTRACTS_PER_TICK = 5;

export function* compositeContractsWorker(action: Action<ICompositeContractsPayload>) {
  yield call(requestPrivateKeyWorker);
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

  let firstPackInWork = true;
  while (true) {
    const itemsToSlice = !firstPackInWork ? 1 : CONTRACTS_PER_TICK;
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
      failed: take(transaction.actions.runCompositeContracts.failed),
    });

    if (compositeResult.success) {
      firstPackInWork = false;
    }

    if (compositeResult.failed) return;
  }
}

export default function* compositeContractsSaga() {
  yield takeEvery(transaction.actions.runCompositeContracts.started, compositeContractsWorker);
}
