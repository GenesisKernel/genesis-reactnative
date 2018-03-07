import { SagaIterator } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { NavigationStackAction } from 'react-navigation';

import * as page from 'modules/page';
import { waitForRoute } from './utils';
import { DEFAULT_PAGE, navTypes } from '../../constants';

export function* homeRouteWorker(): SagaIterator {
  yield put(page.actions.requestPage.started({ name: DEFAULT_PAGE }));
}

export default function* seedSaga(): SagaIterator {
  yield takeEvery(waitForRoute(navTypes.HOME), homeRouteWorker);
}
