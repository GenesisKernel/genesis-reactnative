import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import { receiveQRCode } from 'modules/application/actions';
import { navigate } from 'modules/navigator/actions';
import { extractParamsFromLink } from 'utils/link';
import { navTypes } from '../../constants';

export function* qrCodeWorker(action: Action<string>): SagaIterator {
  const extractedData = extractParamsFromLink(action.payload);

  try {
    if (!extractedData) throw new Error('Wrong QR-code.');
    const { privateKey, ecosystems } = extractedData;

    if (privateKey.length < 64 || privateKey.length > 65) { // its костыль
      throw new Error('Its not a private key');
    }

    yield put(
      navigate(navTypes.SIGN_IN, {
        privateKey,
        ecosystemId: ecosystems[0],
        ecosystems,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* scannerSaga(): SagaIterator {
  yield takeEvery(receiveQRCode, qrCodeWorker);
}
