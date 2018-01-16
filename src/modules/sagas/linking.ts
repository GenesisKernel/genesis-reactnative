import { eventChannel, SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { Linking, LinkingStatic } from 'react-native';
import { takeEvery, put, call, select, take } from 'redux-saga/effects';

import { extractParamsFromLink } from 'utils/link';
import { initFinish } from 'modules/application/actions';
import { navigate } from 'modules/navigator/actions';
import { URL_PREFIX } from '../../constants';
import { navTypes } from '../../navigatorConfig';

const linkingChanel = eventChannel(emitter => {
  const handle = (data: object) => emitter(data.url);

  Linking.addEventListener('url', handle);

  return () => Linking.removeEventListener('url', handle);
});

export function* navigateToRoute(extraUrl: string): SagaIterator {
  const url = extraUrl.replace(`${URL_PREFIX}code/`, '');
  const { key, ecosystem } = extractParamsFromLink(url);

  yield put(
    navigate(navTypes.SIGN_IN, {
      privateKey: key,
      ecosystemId: ecosystem
    })
  );
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
