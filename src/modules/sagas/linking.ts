import { eventChannel, SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { Linking, LinkingStatic } from 'react-native';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';

import { extractParamsFromLink } from 'utils/link';
import { initFinish } from 'modules/application/actions';
import { navigate } from 'modules/navigator/actions';
import { URL_PREFIX, navTypes } from '../../constants';

const linkingChanel = eventChannel(emitter => {
  const handle = (data: { url: string }) => emitter(data.url);

  Linking.addEventListener('url', handle);

  return () => Linking.removeEventListener('url', handle);
});

export function* navigateToRoute(extraUrl: string): SagaIterator {
  const url = extraUrl.replace(`${URL_PREFIX}code/`, '');
  const extractResult = extractParamsFromLink(url);

  if (extractResult) {
    const { privateKey, ecosystems } = extractResult;

    yield put(
      navigate(navTypes.SIGN_IN, {
        privateKey,
        ecosystems,
        ecosystemId: ecosystems[0],
      })
    );
  }
}

export function* linkingWorker(extraUrl: string): SagaIterator {
  yield call(navigateToRoute, extraUrl);
}

export function* initialLinkingWorker(): SagaIterator {
  const extraUrl: string = yield call(Linking.getInitialURL);
  if (extraUrl) {
    yield call(navigateToRoute, extraUrl);
  }
}

export default function* seedSaga(): SagaIterator {
  yield takeEvery(initFinish, initialLinkingWorker);
  yield takeEvery(linkingChanel, linkingWorker);
}
