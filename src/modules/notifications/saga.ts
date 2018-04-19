// import * as Centrifuge from 'centrifuge'
const Centrifuge = require('centrifuge');
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, select, getContext, setContext } from 'redux-saga/effects';
import { SOCKET_URL } from '../../config';

import api from '../../utils/api';
import * as applicationActions from '../application/actions';
import * as notificationsActions from './actions';
import * as authActions from '../auth/actions';
import * as accountSelectors from '../account/selectors';
import * as authSelectors from '../auth/selectors';
import * as applicationSelectors from '../application/selectors';

import { INotification } from './reducer';

interface IAccount {
  key_id: string;
  timestamp: string;
  notify_key: string;
  address: string;
}

interface ISocketInit {
  account: IAccount;
  centrifuge: any;
}

interface ITestAccount {
  id: string;
  ecosystem: string;
}

const centrifuge_instance = 'CENTRIFUGE_INSTANCE';

export function socketInit(payload: ISocketInit) {
  const { account, centrifuge } = payload;
  return eventChannel(emitter => {
    centrifuge.on('connect', () => {
      emitter(applicationActions.setSocketConnectionStatus({ accountAddress: account.address, status: true }));
      console.log('centrifuge CONNECTED');
    });

    centrifuge.on('error', (err: object) => {
      console.log(err, 'centrifuge error');
    });

    centrifuge.on('disconnect', () => {
      console.log('centrifuge DISCONNECTED');
      emitter(applicationActions.setSocketConnectionStatus({ accountAddress: account.address, status: false }));
    });

    const subscribtion = centrifuge.subscribe(`client${account.key_id}`, (message: INotification) => {
      console.log(`got message in ${message.channel}`);
      emitter(notificationsActions.receiveNotification({ ...message, address: account.address }));
    });

    subscribtion.on('subscribe', () => {
      emitter(applicationActions.setChannelSubscribtionStatus({ accountAddress: account.address, status: true }));
    });

    subscribtion.on('error', () => {
      emitter(applicationActions.setChannelSubscribtionStatus({ accountAddress: account.address, status: false }));
    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    }
  });
}

export function* updateNotificationsWorker() {
  const subscribedAccounts = Object.values(yield select(applicationSelectors.getChannelSubscribedAccounts));
  const totalAccounts = Object.values(yield select(accountSelectors.getAccounts));

  if (subscribedAccounts.length === totalAccounts.length && subscribedAccounts.every(el => el)) {
    let accounts: ITestAccount[] = [];
    for (let account in totalAccounts) {
      totalAccounts[account].ecosystems.forEach((el: string) => {
        accounts.push({
          id: totalAccounts[account].key_id,
          ecosystem: el,
        });
      });
    }
    yield call(api.updateNotifications, { ids: JSON.stringify(accounts) });
  }
}

export function* socketWorker() {
  const lastLoggedAccount = yield select(authSelectors.getLastLoggedAccount);

  if (lastLoggedAccount) {
    let centrifuge = yield getContext(centrifuge_instance);
    const accounts = yield select(accountSelectors.getAccounts);
    const socketConnectedAccounts = yield select(applicationSelectors.getSocketConnectedAccounts);

    if (!centrifuge) {
      centrifuge = new Centrifuge({
        url: SOCKET_URL,
        user: lastLoggedAccount.key_id,
        timestamp: lastLoggedAccount.timestamp,
        token: lastLoggedAccount.notify_key,
      });

      yield setContext({
        [centrifuge_instance]: centrifuge
      });
    }

    for (let account in accounts) {
      if (!socketConnectedAccounts[accounts[account].address]) {

        const channel = yield call(socketInit, { account: accounts[account], centrifuge });
        yield takeEvery(channel, function* (action) {
          yield put(action);
        });
      }
    }
  }
}

export default function* notificationsSaga() {
  yield takeEvery([applicationActions.initFinish], socketWorker);
  yield takeEvery(applicationActions.setChannelSubscribtionStatus, updateNotificationsWorker);
}

