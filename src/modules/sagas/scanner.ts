import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import { receiveQRCode } from 'modules/application/actions';
import { navigate } from 'modules/navigator/actions';
import { extractParamsFromLink } from 'utils/link';
import { navTypes } from '../../constants';

export function* qrCodeWorker(action: Action<string>): SagaIterator {
  try {
    const privateKey = action.payload.substr(0, 64);
    if (!privateKey || privateKey.length !== 64) throw new Error('Its not a private key');

    yield put(
      navigate(navTypes.SIGN_IN, {
        privateKey,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* scannerSaga(): SagaIterator {
  yield takeEvery(receiveQRCode, qrCodeWorker);
}
