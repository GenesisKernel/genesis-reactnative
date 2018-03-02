import { takeEvery, eventChannel } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { BackHandler, Platform } from 'react-native';

import * as application from 'modules/application';
import { back } from 'modules/navigator/actions';
import { getCurrentRoute } from 'modules/navigator/selectors';
import { isRouteToCollapseApp } from '../../utils/common';

const backButtonChannel = eventChannel(emitter => {
  const handler = () => {
    emitter(1);
    return true;
  }

  BackHandler.addEventListener('hardwareBackPress', handler);

  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handler);
  }
});

export function* backButtonWorker() {
  const currentRoute = yield select(getCurrentRoute);
  const shouldAppCollapse = yield call(isRouteToCollapseApp, currentRoute.routeName);
  const isDrawerOpened = yield select(application.selectors.getDrawerState);

  if (isDrawerOpened) {
    yield put(application.actions.toggleDrawer(false));
  } else {
    if (shouldAppCollapse) {
      BackHandler.exitApp();
    } else {
      yield put(back());
    }
  }
}

export default function* hardwareBackButtonSaga() {
  if (Platform.OS === 'android') {
    yield takeEvery(backButtonChannel, backButtonWorker);
  }
}