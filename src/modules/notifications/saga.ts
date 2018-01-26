import * as Centrifuge from 'centrifuge'
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, select } from 'redux-saga/effects';

import * as applicationActions from '../application/actions';
import * as notificationsActions from './actions';
import * as authActions from '../auth/actions';
import * as accountSelectors from '../account/selectors';
import * as authSelectors from '../auth/selectors';

import { INotification } from './reducer';

interface ISocketInit {
  key_id: string;
  timestamp: string;
  notify_key: string;
  address: string;
}

export function socketInit(payload:ISocketInit, centrifuge: any) {
  return eventChannel(emitter => {
    centrifuge.on('connect', () => {
      emitter(authActions.setSocketConnectionStatus(true));
      console.log('centrifuge CONNECTED');
    });

    centrifuge.on('error', (err: object) => {
      console.log(err, 'centrifuge error');
    })

    centrifuge.on('disconnect', () => {
      console.log('centrifuge DISCONNECTED');
      emitter(authActions.setSocketConnectionStatus(false));
    })

    centrifuge.subscribe(`client${payload.key_id}`,(message: INotification) => {
      emitter(notificationsActions.receiveNotification({ ...message, address: payload.address }))
    });

    centrifuge.connect();

    return () => {
      // do whatever to interrupt the socket communication here
    }
  });
}

export function* socketWorker() {
  const accounts = yield select(accountSelectors.getAccounts);
  const lastLoggedAccount = yield select(authSelectors.getLastLoggedAccount);
  const socketConnectionStatus = yield select(authSelectors.getSocketConnectionStatus);

  if (socketConnectionStatus) {
    const channels = [];
    const centrifuge = new Centrifuge({
      url: 'ws://127.0.0.1:8888',
      user: lastLoggedAccount.key_id,
      timestamp: lastLoggedAccount.timestamp,
      token: lastLoggedAccount.notify_key,
    });
    for (let account in accounts) {
      const channel = yield call(socketInit, accounts[account], centrifuge);
      yield takeEvery(channel, function* (action) {
        yield put(action);
      })
    }
  }
}

export default function* notificationsSaga() {
  yield takeEvery([applicationActions.initFinish, authActions.saveLastLoggedAccount], socketWorker);
}

