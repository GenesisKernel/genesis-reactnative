import { SagaIterator } from 'redux-saga';
import { takeEvery, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import * as navigationSelectors from 'modules/navigator/selectors';
import * as navigatorActions from 'modules/navigator/actions';
import * as applicationActions from 'modules/application/actions';

export function* navigationWorker() {
  try {
    const currentRoute = yield select(navigationSelectors.getCurrentRoute);

    if (currentRoute.routeName.indexOf('HOME') !== -1 || currentRoute.routeName.indexOf('SUB_MENU') !== -1) {
      yield put(applicationActions.receiveTitle('Home'));
    }
  } catch(err) {
    console.error(err, 'ERROR AT NAVIGATOR SAGA => navigatorWorker');
  }
}

export default function* navigationSaga(): SagaIterator {
  yield takeEvery(NavigationActions.back, navigationWorker)
}