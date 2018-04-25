import { updateNotificationsWorker, socketWorker } from '../saga';
import api from '../../../utils/api';
import * as accountSelectors from 'modules/account/selectors';
import * as applicationSelectors from 'modules/application/selectors';

import { call, select, setContext } from 'redux-saga/effects';


describe('updateNotificationsWorker check if all accounts connected to centrifuge and makes api call to update their counter', () => {
  const totalAccounts = {
    address: {
      ecosystems: ['1'],
      key_id: 'key_id',
      address: 'address'
    },
    address1: {
      ecosystems: ['1'],
      key_id: 'key_id1',
      address: 'address1'
    },
  };

  it('test updateNotificationsWorker if all accounts CONNECTED', () => {
    const iterator = updateNotificationsWorker();
    const subscribedAccounts = {
      address: true,
      address1: true,
    };
    const accountsToUpdate = [{ id: 'key_id', ecosystem: '1' }, { id: 'key_id1', ecosystem: '1' }];
    iterator.next(subscribedAccounts);
    iterator.next(totalAccounts);
    expect(iterator.next(totalAccounts).value).toEqual(call(api.updateNotifications, { ids: JSON.stringify(accountsToUpdate) }));
  });

  it('test updateNotificationsWorker if NOT all accounts CONNECTED', () => {
    const iterator = updateNotificationsWorker();
    const subscribedAccounts = {
      address: true,
      address1: false,
    };
    iterator.next(subscribedAccounts);
    iterator.next(totalAccounts);
    expect(iterator.next(false).value).toEqual(undefined);
  });
});

describe('socketWorker should create a centrifuge instance and subscribe all accounts', () => {
  it('test socketWorker, when there is NO lastLoggedAccount', () => {
    const iterator = socketWorker();
    const lastLoggedAccount = undefined;

    iterator.next();
    iterator.next(lastLoggedAccount);
    expect(iterator.next().done);
  });

  it('test socketWorker, when there IS lastLoggedAccount and centrifuge in context', () => {
    const iterator = socketWorker();
    const centrifuge_instance = 'CENTRIFUGE_INSTANCE';
    const lastLoggedAccount = {
      key_id: '-123122353452343453423',
      timestamp: '123123',
      notify_key: '123123123',
    };
    const accounts = {
      address: {
        address: 'address',
        key_id: 'key_id',
        timestamp: '123123',
        notify_key: '123123123',
      },
      address1: {
        address: 'address1',
        key_id: '-123122353452343453423',
        timestamp: '123123',
        notify_key: '123123123',
      }
    };
    const socketConnectedAccounts = {
      address: false,
      address1: false,
    };

    iterator.next(lastLoggedAccount);
    iterator.next(true); // lastLoggedAccount
    iterator.next(true); //  centrifuge in context
    iterator.next(accounts); // get accounts
    for(let account in accounts) { // connectiong every account
      iterator.next(socketConnectedAccounts);
      iterator.next();
    }
    expect(iterator.next().done);
  });
});