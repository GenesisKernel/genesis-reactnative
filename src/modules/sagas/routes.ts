import { SagaIterator } from 'redux-saga';
import { takeEvery, put, select } from 'redux-saga/effects';
import { NavigationStackAction } from 'react-navigation';

import * as page from 'modules/page';
import * as application from 'modules/application';
import { waitForRoute } from './utils';
import { DEFAULT_PAGE, navTypes } from '../../constants';

export function* homeRouteWorker(): SagaIterator {
  const defaultPage = yield select(application.selectors.getDefaultPage);
  yield put(page.actions.requestPage.started({ name: defaultPage || DEFAULT_PAGE }));
}

export default function* seedSaga(): SagaIterator {
  yield takeEvery(waitForRoute(navTypes.HOME), homeRouteWorker);
}
