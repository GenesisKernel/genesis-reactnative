import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import { receiveQRCode } from 'modules/application/actions';
import { navigate } from 'modules/navigator/actions';
import { extractParamsFromLink } from 'utils/link';
import { navTypes } from '../../constants';

export function* qrCodeWorker(action: Action<string>): SagaIterator {
  const { key, ecosystem } = extractParamsFromLink(action.payload);

  try {
    if (key.length !== 64) {
      throw new Error('Its not a private key');
    }

    yield put(
      navigate(navTypes.SIGN_IN, {
        privateKey: key,
        ecosystemId: ecosystem
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* scannerSaga(): SagaIterator {
  yield takeEvery(receiveQRCode, qrCodeWorker);
}
