const Centrifuge = require('centrifuge');
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, select, getContext, setContext } from 'redux-saga/effects';

import api, { apiDeleteToken } from '../../utils/api';
import * as Account from 'modules/account';
import * as application from 'modules/application';
import * as notificationsActions from './actions';
import { loginByGuestKey } from 'modules/sagas/sagaHelpers';

import { INotification } from './reducer';

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
  const { uniqKey } = account;

  return eventChannel(emitter => {
    centrifuge.on('connect', () => {
      emitter(application.actions.setSocketConnectionStatus({ uniqKey, status: true }));
      console.log('centrifuge CONNECTED');
    });

    centrifuge.on('error', (err: object) => {
      console.log(err, 'centrifuge error');
    });

    centrifuge.on('disconnect', () => {
      console.log('centrifuge DISCONNECTED');
      emitter(application.actions.setSocketConnectionStatus({ uniqKey, status: false }));
    });

    const subscribtion = centrifuge.subscribe(`client${account.key_id}`, (message: INotification) => {
      console.log(`got message in ${message.channel}`);
      emitter(notificationsActions.receiveNotification({ ...message, uniqKey }));
    });

    subscribtion.on('subscribe', () => {
      emitter(application.actions.setChannelSubscribtionStatus({ uniqKey, status: true }));
      console.log('centrifuge - SUBSCRIBED -')
    });

    subscribtion.on('error', () => {
      emitter(application.actions.setChannelSubscribtionStatus({ uniqKey, status: false }));
      console.log('centrifuge - SUBSCRIBE ERROR -')
    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    }
  });
}

export function* updateNotificationsWorker() {
  const subscribedAccounts = Object.values(yield select(application.selectors.getChannelSubscribedAccounts));
  const totalAccounts = Object.values(yield select(Account.selectors.getAccounts));

  if (subscribedAccounts.length === totalAccounts.length && subscribedAccounts.every(el => el)) {
    let accounts: ITestAccount[] = [];
    for (let account of totalAccounts) {
      accounts.push({
        id:account.key_id,
        ecosystem: account.ecosystem_id,
      });
    }
    yield call(api.updateNotifications, { ids: JSON.stringify(accounts) });
  }
}

export function* socketWorker() {
  try {
    let centrifuge = yield getContext(centrifuge_instance);
    const accounts = yield select(Account.selectors.getAccounts);
    const socketConnectedAccounts = yield select(application.selectors.getSocketConnectedAccounts);

    if (!centrifuge) {
      const lastLoggedAccount = yield call(loginByGuestKey);
      yield call(apiDeleteToken);
      const url = yield call(api.getCentrifugoUrl);
      centrifuge = new Centrifuge({
        url: url.data,
        user: lastLoggedAccount.key_id,
        timestamp: lastLoggedAccount.timestamp,
        token: lastLoggedAccount.notify_key,
      });

      yield setContext({
        [centrifuge_instance]: centrifuge
      });
    }

    for (let account in accounts) {
      if (!socketConnectedAccounts[account]) {
        const channel = yield call(socketInit, { account: accounts[account], centrifuge });
        yield takeEvery(channel, function* (action) {
          yield put(action);
        });
      }
    }
  } catch(err) {
    console.log(err, 'socketInit error')
  }

}

export default function* notificationsSaga() {
  yield takeEvery([application.actions.initFinish, Account.actions.createAccount.done], socketWorker);
  yield takeEvery(application.actions.setChannelSubscribtionStatus, updateNotificationsWorker);
}