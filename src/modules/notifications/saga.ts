const Centrifuge = require('centrifuge');
import { eventChannel } from 'redux-saga';
import { put, call, takeEvery, select, getContext, setContext, all } from 'redux-saga/effects';
import { create } from 'apisauce';

import api, { apiDeleteToken, ApiFactory } from '../../utils/api';
import * as Account from 'modules/account';
import * as application from 'modules/application';
import * as notificationsActions from './actions';
import * as nodes from 'modules/nodes';
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
      for (const data of message.data) {
        const newMessage = { ...message, data };
        emitter(notificationsActions.receiveNotification({ ...newMessage, uniqKey }));
      }
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
        id: account.key_id,
        ecosystem: account.ecosystem_id,
      });
    }

    try {
      yield call(api.updateNotifications, { ids: JSON.stringify(accounts) });
    } catch (err) {
      console.log(err, 'ERROR AT updateNotificationsWorker')
    }

  }
}

export function* socketWorker() {
  try {
    let { centrifuge, accounts, socketConnectedAccounts } = yield all({
      centrifuge: getContext(centrifuge_instance),
      accounts: select(Account.selectors.getAccounts),
      socketConnectedAccounts: select(application.selectors.getSocketConnectedAccounts),
    });

    if (!centrifuge) {
      const lastLoggedAccount = yield call(loginByGuestKey);
      const currentNode = yield select(nodes.selectors.getCurrentNode);

      const apiInstance = create({
        baseURL: `${currentNode.apiUrl}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      });

      const Api = new ApiFactory(apiInstance);
      const url = yield call(Api.getCentrifugoUrl);

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
  } catch (err) {
    console.log(err, 'socketInit error')
  }

}

export default function* notificationsSaga() {
  yield takeEvery([application.actions.initFinish, Account.actions.createAccount.done], socketWorker);
  yield takeEvery(application.actions.setChannelSubscribtionStatus, updateNotificationsWorker);
}
