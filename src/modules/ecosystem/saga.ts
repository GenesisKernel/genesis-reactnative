import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call } from 'redux-saga/effects';
import api from 'utils/api';
import { requestEcosystem } from './actions';

const defaultParams: string[] = ['ava', 'key_mask', 'ecosystem_name'];

export function* requestEcosystemWorker(action: Action<any>) {
  try {
    const { data: parameters } = yield call(
      api.getEcosystemParameters,
      action.payload.id,
      defaultParams
    );

    yield put(
      requestEcosystem.done({
        params: action.payload,
        result: { id: action.payload.id, parameters }
      })
    );
  } catch (error) {
    yield put(
      requestEcosystem.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* ecosystemSaga(): SagaIterator {
  yield takeEvery(requestEcosystem.started, requestEcosystemWorker);
}

export default ecosystemSaga;
