import { SagaIterator, delay } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { Alert } from 'react-native';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { omit } from 'ramda';
import { NavigationActions } from 'react-navigation';

import api, { apiSetToken, apiDeleteToken } from 'utils/api';
import Keyring from 'utils/keyring';
import * as application from 'modules/application';
import * as transactionActions from 'modules/transaction/actions';
import * as authActions from './actions';
import * as authSelectors from './selectors';
import * as accountActions from 'modules/account/actions';
import * as accountSelectors from 'modules/account/selectors';
import * as navigatorActions from 'modules/navigator/actions';
import * as ecosystemSaga from 'modules/ecosystem';

import { navTypes, ERRORS } from '../../constants';
import { waitForActionWithParams } from '../sagas/utils';
import { roleSelect, getAvatarAndUsername } from 'modules/sagas/sagaHelpers';
import { checkEcosystemsAvailiability } from 'modules/ecosystem/saga';
import { IAccount } from 'modules/account/reducer';

export interface IAuthPayload {
  private: string;
  public: string;
  ecosystem: string;
  roles: IRole[];
  notify_key: string;
  timestamp: string;
  avatar?: string;
  username?: string;
  ecosystems?: string[];
}

export interface IKeyPairs {
  private: string;
  public: string;
}

interface ILoginWorkerPayload {
  accountAdress: string;
  ecosystemId: string;
  ecosystems?: string[];
  password: string;
  privateKey: string;
}

export function* loginCall(payload: IAuthPayload | IKeyPairs, role_id?: number) {
  try {
    apiDeleteToken(); // Remove previous token

    const { data: uidParams } = yield call(api.getUid);
    const signature = yield call(Keyring.sign, uidParams.uid, payload.private);

    apiSetToken(uidParams.token);

    let { data: accountData } = yield call(api.login, {
      signature,
      ecosystem: payload.ecosystem || '1',
      publicKey: payload.public,
      role_id,
    });

    apiSetToken(accountData.token);
    return accountData;
  } catch(err) {
    console.log('loginCall ERROR AT auth saga =>', err);
    return null;
  }
}

export function* auth(payload: IAuthPayload | IKeyPairs) {
  const sessions = yield call(checkEcosystemsAvailiability, { ecosystems: payload.ecosystems || ['1'], privateKey: payload.private, publicKey: payload.public });

  const availableEcosystems = sessions.map((item: any) => item.ecosystem_id);

  let accountData = sessions[0];
  const { avatar, username } = accountData;
  if (!accountData) return;

  const { roles } = accountData;

  const currentRole = roles && !!roles.length ? yield call(roleSelect, roles) : {};

  accountData = { avatar, username, ...yield call(loginCall, payload, currentRole.role_id)};

  const { key_id, token, refresh, address, notify_key, timestamp, ecosystem_id } = accountData;

  yield put(
    authActions.attachSession({
      ...omit(['ecosystem_id'], accountData),
      currentRole,
      currentAccountAddress: address,
      ecosystems: availableEcosystems,
      sessions,
      currentEcosystemId: ecosystem_id,
      publicKey: payload.public,
    })
  ); // save account data in auth reducer

  return {
    ...omit(['ecosystem_id'], accountData),
    publicKey: payload.public,
    ecosystems: availableEcosystems,
    sessions,
    currentEcosystem: ecosystem_id,
    roles: roles || [],
    currentRole,
  }; // return account to function where it was called
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
  const { privateKey, password, ecosystemId, ecosystems } = action.payload;

  try {
    const publicKey = yield call(Keyring.genereatePublicKey, privateKey);
    const encKey = yield call(Keyring.encryptAES, privateKey, password); // Encrypt private key

    const account = yield call(auth, {
      public: publicKey,
      private: privateKey,
      ecosystem: ecosystemId,
      ecosystems,
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

export function* loginWorker(action: Action<ILoginWorkerPayload>): SagaIterator {
  try {
    const savedAccount = yield select(accountSelectors.getAccount(action.payload.accountAdress));

    const privateKey = yield call(
      Keyring.decryptAES,
      savedAccount.encKey,
      action.payload.password
    );

    const account = yield call(auth, {
      public: savedAccount.publicKey,
      private: privateKey,
      ecosystems: action.payload.ecosystems || [action.payload.ecosystemId],
    });

    yield put(
      authActions.login.done({
        params: action.payload,
        result: {
          ...account
        }
      })
    );

    const tokenExpiry = yield select(authSelectors.getTokenExpiry);
    yield put(accountActions.saveTokenToAccount({
      currentAccountAddress: account.address,
      token: account.token,
      refresh: account.refresh,
      sessions: account.sessions,
      tokenExpiry,
    }));

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

    yield put(application.actions.removeSeed());

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

export function* logoutWorker() {
  yield put(authActions.detachSession());
  yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.ACCOUNT_SELECT }]));
}

export function* receiveSelectedAccountWorker(action: Action<{ ecosystemId: string, address: string }>) {
  try {
    const accountData = yield select(accountSelectors.getAccount(action.payload.address));
    const { sessions } = accountData;
    const requiredSession = accountData.sessions.find((item: any) => item.ecosystem_id === action.payload.ecosystemId);

    if (requiredSession.token && requiredSession.tokenExpiry > Date.now()) {

      apiSetToken(requiredSession.token);

      const { avatar, username } = yield call(getAvatarAndUsername, accountData.token, accountData.key_id);

      let currentRole: IRole;
      if (requiredSession.roles && !!requiredSession.roles.length) {
        currentRole = yield call(roleSelect, requiredSession.roles);
      }

      yield put(
        authActions.attachSession({
          ...requiredSession,
          currentAccountAddress: requiredSession.address,
          currentEcosystemId: action.payload.ecosystemId,
          currentRole,
          sessions: accountData.sessions,
          ecosystems: accountData.ecosystems,
        })
      );

      const sessionsWithUserData = sessions.map((item: any) => {
        if (item.ecosystem_id === action.payload.ecosystemId) {
          item = {
            ...item,
            avatar,
            username,
          }
        }
        return item;
      });

      yield put(accountActions.setAccountUserdata({
        address: accountData.address,
        sessions: sessionsWithUserData,
      }));

      yield put(navigatorActions.navigateWithReset( [{ routeName: navTypes.HOME }] ));
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
