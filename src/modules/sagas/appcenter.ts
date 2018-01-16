import * as AppCenter from 'appcenter';
import * as Push from 'appcenter-push';
import { SagaIterator, eventChannel } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, take, race, call } from 'redux-saga/effects';

import * as application from 'modules/application';

const pushNotificationChanel = eventChannel(emit => {
  Push.setListener({
    onPushNotificationReceived: (notification: any) => {
      emit(application.actions.receivePushNotification(notification));
    }
  });

  return () => {};
});

export function* appCenterWorker(action: Action<any>): SagaIterator {
  try {
    const id = yield call(AppCenter.getInstallId);

    yield put(application.actions.receiveInstallId(id));
  } catch (error) {
    console.log(error);
  }
}

export function* pushNotificationWorker(action) {
  console.log(action);
}

export default function* AccountSaga(): SagaIterator {
  yield takeEvery(application.actions.initFinish, appCenterWorker);
  yield takeEvery(pushNotificationChanel, pushNotificationWorker);
}
