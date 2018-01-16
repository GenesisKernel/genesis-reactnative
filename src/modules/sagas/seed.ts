import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import Keyring from 'utils/keyring';
import {
  generateSeed,
  exportSeed,
  importSeed,
  receiveSeed
} from '../application/actions';

export function* generateSeedWorker(): SagaIterator {
  const seed = yield call(Keyring.generateSeed);

  yield put(receiveSeed(seed));
}

export function* exportSeedWorker(): SagaIterator {
  yield call(console.log, 'export');
}

export function* importSeedWorker(): SagaIterator {
  yield call(console.log, 'import');
}

export default function* seedSaga(): SagaIterator {
  yield takeEvery(generateSeed, generateSeedWorker);
  yield takeEvery(exportSeed, exportSeedWorker);
  yield takeEvery(importSeed, importSeedWorker);
}
