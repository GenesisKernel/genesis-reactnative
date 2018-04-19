import { authSaga, createAccountWorker, auth, IAuthPayload, IKeyPairs, refresh, loginByPrivateKeyWorker, loginWorker, receiveSelectedAccountWorker, tokenWorker } from '../saga';
import { roleSelect } from 'modules/sagas/sagaHelpers';

import { delay } from 'redux-saga';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { navTypes, ERRORS } from '../../../constants';
import api, { apiSetToken, apiDeleteToken } from 'utils/api';

import Keyring from 'utils/keyring';
import * as accountActions from 'modules/account/actions';
import * as applicationActions from 'modules/application/actions';
import * as authActions from 'modules/auth/actions';
import * as navigatorActions from 'modules/navigator/actions';
import * as authSelectors from 'modules/auth/selectors';


const encKey = 'encKey';
const account = {
  address: "address",
  ecosystems: ['1'],
  key_id: "key_id",
  notify_key: "not_key",
  publicKey: "pub_key",
  timestamp: "1521535569",
  encKey,
  avatar: '',
  username: '',
};

describe('createAccountWorker', () => {
  const action = { type: 'ACCOUNT/CREATE_STARTED', payload: { seed: 'seed', password: 'password' } };
  const authPayload = { private: 'private', public: 'public' };

  it('test generator createAccountWorker TRY block', () => {
    const iterator = createAccountWorker(action);
    iterator.next(action.payload.seed);
    iterator.next(authPayload);
    iterator.next(encKey);
    expect(iterator.next(account).value).toEqual(put(accountActions.createAccount.done({
      params: action.payload,
      result: {
        ...account,
      }
    })));

    expect(iterator.next().value).toEqual(put(applicationActions.removeSeed()));
    expect(iterator.next(account).value).toEqual(put(authActions.saveLastLoggedAccount(account)));
    expect(iterator.next().value).toEqual(put(
      navigatorActions.navigateWithReset([
        {
          routeName: navTypes.AUTH_SUCCESSFUL,
          params: {
            isKnownAccount: false
          }
        }
      ])
    ));
    expect(iterator.next().done);
  });
});

describe('refresh', () => {
  it('test the refresh function, which must refresh the tokens', () => {
    const iterator = refresh();
    const refreshToken = 'refresh';
    const data = { data: { token: 'new_token', refresh: 'new_refresh' }};

    iterator.next(refreshToken);
    iterator.next(data);

    expect(iterator.next(data).value).toEqual(put(
      authActions.refreshSession(data.data)
    ));
    expect(iterator.next().done);
  });
})

describe('loginByPrivateKeyWorker', () => {
  const action = {
    type: 'AUTH/LOGIN_STARTED',
    payload: {
      privateKey: 'privateKey',
      password: 'password',
      ecosystemId: ['1'],
    }
  }

  it('test generator loginByPrivateKeyWorker, which creates a new account and login it', () => {
    const iterator = loginByPrivateKeyWorker(action);
    const { privateKey, password, ecosystemId } = action.payload;

    iterator.next(privateKey);
    iterator.next(password);
    iterator.next({
      public: 'publicKey',
      private: privateKey,
      ecosystem: ecosystemId,
      avatar: '',
      username: '',
    });

    iterator.next({ // accountActions.createAccount.done
      params: action.payload,
      result: {
        ...account,
        encKey
      }
    });

    iterator.next({ // login.done
      params: action.payload,
      result: {
        ...account
      }
    });

    iterator.next(account);

    iterator.next([
      {
        routeName: navTypes.AUTH_SUCCESSFUL,
        params: {
          isKnownAccount: true
        }
      }
    ]);
    expect(iterator.next().done);
  });
});

describe('loginWorker', () => {
  const action = { type: 'ACCOUNT/CREATE_STARTED', payload: { accountAddress: 'accountAddress', password: 'password', ecosystemId: ['1'] } }
  it('test loginWorker func, which login user', () => {
    const savedAccount = { encKey: 'encKey', publicKey: 'publicKey' };
    const privateKey = 'privateKey';
    const iterator = loginWorker(action);
    iterator.next(action);
    iterator.next(savedAccount);
    iterator.next(privateKey);

    iterator.next({ // authActions.login.done
      params: action.payload,
      result: {
        ...account
      }
    });
    iterator.next(account);
    iterator.next([{ routeName: navTypes.HOME }]);
    expect(iterator.next().done);
  });
});

describe('receiveSelectedAccountWorker', () => {
  const action = { payload: { ecosystemId: '1', address: 'address' }};
  const accountData = {
    currentAccountAddress: "address",
    key_id: 'key_id',
    refresh: 'refresh',
    publicKey: 'pubkey',
    address: 'address',
    sessions: [
      {
        ecosystem_id: '1',
        token: 'token',
        tokenExpiry: Date.now() + 100 * 1000,
        roles: [{
          role_name: 'role_name',
          role_id: 123,
        }]
      }
    ]
  }

  it('test receiveSelectedAccountWorker with VALID token, !!requiredSession.roles.length === true', () => {
    const iterator = receiveSelectedAccountWorker(action);
    iterator.next(action); // init
    iterator.next(accountData); // yield select(accountSelectors.getAccount)
    iterator.next({ avatar: 'avatar', username: 'username' }) // yield call(api.getAvatarAndUsername, accountData.token, accountData.key_id)
    iterator.next({ role_name: 'kek', role_id: 12 }) // role select
    iterator.next() // authActions.attachSession
    expect(iterator.next().value).toEqual(put(navigatorActions.navigateWithReset( [{ routeName: navTypes.HOME }] )));
  });

  it('test receiveSelectedAccountWorker with VALID token, without roles', () => {
    const accountData = {
      currentAccountAddress: "address",
      key_id: 'key_id',
      refresh: 'refresh',
      publicKey: 'pubkey',
      address: 'address',
      sessions: [
        {
          ecosystem_id: '1',
          token: 'token',
          tokenExpiry: Date.now() + 100 * 1000,
        }
      ]
    }
    const iterator = receiveSelectedAccountWorker(action);
    iterator.next(action); // init
    iterator.next(accountData); // yield select(accountSelectors.getAccount)
    iterator.next({ avatar: 'avatar', username: 'username' }) // yield call(api.getAvatarAndUsername, accountData.token, accountData.key_id)
    iterator.next() // authActions.attachSession
    expect(iterator.next().value).toEqual(put(navigatorActions.navigateWithReset( [{ routeName: navTypes.HOME }] )));
  });

  it('test receiveSelectedAccountWorker with INVALID token', () => {
    const accountData = {
      currentAccountAddress: "address",
      key_id: 'key_id',
      refresh: 'refresh',
      publicKey: 'pubkey',
      address: 'address',
      sessions: [
        {
          ecosystem_id: '1',
          token: 'token',
          tokenExpiry: Date.now() - 100 * 1000,
          roles: [{
            role_name: 'role_name',
            role_id: 123,
          }]
        }
      ]
    }
    const iterator = receiveSelectedAccountWorker(action);
    iterator.next(action);
    expect(iterator.next(accountData).value).toEqual(put(
      navigatorActions.navigate(navTypes.SIGN_IN, { id: action.payload.address, ecosystemId: action.payload.ecosystemId })
    ))
  });
});

describe('tokenWorker should check current acount token validity and refresh it every 5 sec', () => {
  it('check tokenWorker with EXPIRED token', () => {
    const iterator = tokenWorker();
    const tokenExpiry = Date.now();
    iterator.next(tokenExpiry);
    expect(iterator.next(tokenExpiry).value).toEqual(call(refresh));
    expect(iterator.next().value).toEqual(undefined);
  });

  it('check tokenWorker with VALID token', () => {
    const iterator = tokenWorker();
    const tokenExpiry = Date.now() * 2;
    iterator.next(tokenExpiry);
    expect(iterator.next(tokenExpiry).value).toEqual(call(delay, 5000));
  });
});

