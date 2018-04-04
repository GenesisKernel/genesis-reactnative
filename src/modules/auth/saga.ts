import { SagaIterator, delay } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { Alert } from 'react-native';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import api, { apiSetToken, apiDeleteToken } from 'utils/api';
import Keyring from 'utils/keyring';
import * as application from 'modules/application';
import * as applicationActions from 'modules/application/actions';
import * as transactionActions from 'modules/transaction/actions';
import * as authActions from './actions';
import * as authSelectors from './selectors';
import * as accountActions from 'modules/account/actions';
import * as accountSelectors from 'modules/account/selectors';
import * as navigatorActions from 'modules/navigator/actions';
import { getAccount } from 'modules/account/selectors';
import { receiveEcosystem } from 'modules/ecosystem/actions';
import { navTypes, ERRORS } from '../../constants';
import { waitForActionWithParams } from '../sagas/utils';
import { roleSelect } from 'modules/sagas/roles';

export interface IAuthPayload {
  private: string;
  public: string;
  ecosystem: string;
  roles: IRole[];
  notify_key: string;
  timestamp: string;
  avatar?: string;
  username?: string;
}
export interface IKeyPairs {
  private: string;
  public: string;
  ecosystem?: string;
}

export function* loginCall(payload: IAuthPayload | IKeyPairs) {
  try {
    apiDeleteToken(); // Remove previous token

    const { data: uidParams } = yield call(api.getUid);
    const signature = yield call(Keyring.sign, uidParams.uid, payload.private);

    apiSetToken(uidParams.token);

    let { data: accountData } = yield call(api.login, {
      signature,
      ecosystem: payload.ecosystem || '1',
      publicKey: payload.public
    });

    apiSetToken(accountData.token);
    return accountData;
  } catch(err) {
    console.log('loginCall ERROR AT auth saga =>', err);
    return null;
  }
}

export function* auth(payload: IAuthPayload | IKeyPairs) {

  let accountData = yield call(loginCall, payload);
  if (!accountData) return;

  const { roles } = accountData;

  const currentRole = roles && !!roles.length ? yield call(roleSelect, roles) : undefined;

  if (currentRole && currentRole.role_id) {
    accountData = yield call(loginCall, payload);
  }

  const { key_id, token, refresh, address, notify_key, timestamp, ecosystem_id } = accountData;

  yield put(
    authActions.attachSession({
      key_id,
      token,
      refresh,
      currentRole,
      currentAccountAddress: address,
      currentEcosystemId: ecosystem_id,
      publicKey: payload.public,
    })
  ); // Save token

  const tokenExpiry = yield select(authSelectors.getTokenExpiry);
  yield put(accountActions.saveTokenToAccount({
    currentAccountAddress: accountData.address,
    token,
    refresh,
    tokenExpiry
  }));

  return {
    publicKey: payload.public,
    ecosystems: [ecosystem_id],
    key_id,
    address,
    notify_key,
    timestamp,
    roles: roles || [],
    currentRole,
    avatar: '',
    username: '',
  };
}

export function* refresh() {
  const refreshToken = yield select(authSelectors.getRefreshToken);

  try {
    const { data } = yield call(api.refresh, {
      token: refreshToken
    });

    apiSetToken(data.token);

    yield put(
      authActions.refreshSession({
        token: data.token,
        refresh: data.refresh
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* loginByPrivateKeyWorker(action: Action<any>) {
  const { privateKey, password, ecosystemId } = action.payload;

  try {
    const publicKey = yield call(Keyring.genereatePublicKey, privateKey);
    const encKey = yield call(Keyring.encryptAES, privateKey, password); // Encrypt private key

    const account = yield call(auth, {
      public: publicKey,
      private: privateKey,
      ecosystem: ecosystemId,
      avatar: '',
      username: '',
    });

    yield put(
      accountActions.createAccount.done({
        params: action.payload,
        result: {
          ...account,
          encKey
        }
      })
    );

    yield put(
      authActions.login.done({
        params: action.payload,
        result: {
          ...account
        }
      })
    );

    yield put(authActions.saveLastLoggedAccount(account));

    yield put(
      navigatorActions.navigateWithReset([
        {
          routeName: navTypes.AUTH_SUCCESSFUL,
          params: {
            isKnownAccount: true
          }
        }
      ])
    );
  } catch (error) {
    yield put(
      authActions.login.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* loginWorker(action: Action<any>): SagaIterator {
  try {
    const savedAccount = yield select(getAccount(action.payload.accountAdress));
    const privateKey = yield call(
      Keyring.decryptAES,
      savedAccount.encKey,
      action.payload.password
    );

    const account = yield call(auth, {
      public: savedAccount.publicKey,
      private: privateKey,
      ecosystem: action.payload.ecosystemId
    });

    yield put(
      authActions.login.done({
        params: action.payload,
        result: {
          ...account
        }
      })
    );

    yield put(authActions.saveLastLoggedAccount(account));

    yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.HOME }])); // Navigate to home screen
  } catch (error) {
    yield put(
      authActions.login.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* createAccountWorker(action: Action<any>): SagaIterator {
  try {
    const authPayload: IKeyPairs = yield call(
      Keyring.generateKeyPair,
      action.payload.seed
    ); // Generate paif of keys

    const encKey = yield call(
      Keyring.encryptAES,
      authPayload.private,
      action.payload.password
    ); // Encrypt private key

    let account = yield call(auth, authPayload);
    account = { ...account, encKey };

    yield put(
      accountActions.createAccount.done({
        params: action.payload,
        result: {
          ...account,
        }
      })
    );

    yield put(
      applicationActions.removeSeed()
    );

    yield put(authActions.saveLastLoggedAccount(account));

    yield put(
      navigatorActions.navigateWithReset([
        {
          routeName: navTypes.AUTH_SUCCESSFUL,
          params: {
            isKnownAccount: false
          }
        }
      ])
    );
  } catch (error) {
    yield put(
      accountActions.createAccount.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* switchAccountWorker(action: Action<any>): SagaIterator {
  try {
    const keys = yield all({
      public: select(authSelectors.getPublicKey),
    });

    const account = yield call(auth, {
      ...keys,
      ecosystem: action.payload.ecosystemId
    });

    yield put(
      authActions.switchAccount.done({
        params: action.payload,
        result: null
      })
    );
    yield put(
      authActions.login.done({
        params: action.payload,
        result: {
          ...account
        }
      })
    );

    yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.HOME }])); // Navigate to home screen
  } catch (error) {
    yield put(
      authActions.switchAccount.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* logoutWorker() {
  yield put(authActions.detachSession());
  yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.ACCOUNT_SELECT }]));
}

export function* receiveSelectedAccountWorker(action: Action<{ ecosystemId: string, address: string }>) {
  try {
    const accountData = yield select(accountSelectors.getAccount(action.payload.address));

    if (accountData.token && accountData.tokenExpiry > Date.now()) {

      apiSetToken(accountData.token);

      const avatarAndUsername = yield call(api.getAvatarAndUsername, accountData.token, accountData.key_id);

      let currentRole: IRole;
      if (accountData.roles && !!accountData.roles.length) {
        currentRole = yield call(roleSelect, accountData.roles);
      }

      yield put(
        authActions.attachSession({
          currentAccountAddress: accountData.address,
          currentEcosystemId: action.payload.ecosystemId,
          token: accountData.token,
          refresh: accountData.refresh,
          publicKey: accountData.publicKey,
          currentRole,
          key_id: accountData.key_id,
        })
      );

      yield put(accountActions.setAccountUserdata({
        address: accountData.address,
        avatar: avatarAndUsername.data.value.avatar || '',
        username: avatarAndUsername.data.value.username || '',
      }));

      yield put(navigatorActions.navigate(navTypes.HOME));
    } else {
      yield put(
        navigatorActions.navigate(navTypes.SIGN_IN, { id: action.payload.address, ecosystemId: action.payload.ecosystemId })
      );
    }
  } catch (error) {
    yield put(authActions.receiveSelectedAccount.failed({
      params: action.payload,
      error,
    }));
  }
}

export function* tokenWorker() {
  while (true) {
    const tokenExpiry = yield select(authSelectors.getTokenExpiry);

    if (tokenExpiry < Date.now() + 60000) {
      yield call(refresh);

      return;
    }

    yield call(delay, 5000);
  }
}

export function* authSaga(): SagaIterator {
  yield takeEvery(accountActions.createAccount.started, createAccountWorker);
  yield takeEvery(
    waitForActionWithParams(authActions.login.started.type, ['accountAdress']),
    loginWorker
  );
  yield takeEvery(
    waitForActionWithParams(authActions.login.started.type, ['privateKey']),
    loginByPrivateKeyWorker
  );
  yield takeEvery(authActions.logout, logoutWorker);
  yield takeEvery(authActions.switchAccount.started, switchAccountWorker);
  yield takeEvery(
    [
      authActions.attachSession,
      authActions.refreshSession,
      application.actions.initFinish
    ],
    tokenWorker
  );

  yield takeEvery(authActions.receiveSelectedAccount.started, receiveSelectedAccountWorker);
}

export default authSaga;
