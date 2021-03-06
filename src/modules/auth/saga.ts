import { SagaIterator, delay } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { Alert } from 'react-native';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { omit, pick } from 'ramda';
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

import { navTypes, ERRORS, MODAL_ANIMATION_TIME } from '../../constants';
import { waitForActionWithParams } from '../sagas/utils';
import { roleSelect, loginCall, defaultPageSetter } from 'modules/sagas/sagaHelpers';
import { getAccountEcosystemsInfo } from 'modules/ecosystem/saga';
import { uniqKeyGenerator } from 'utils/common';
import { validatePassword } from 'modules/sagas/privateKey';

interface IAccInfo {
  [key: string]: {
    role_id: string,
    role_name: string,
    ecosystem_id: string,
    ecosystem_name: string,
    key_id: string,
    address: string,
    uniqKey: string,
    publicKey: string,
  }
}
export interface IKeyPairs {
  private: string;
  public: string;
}
interface ICreateAccPayload {
  seed: string;
  password: string;
}

interface ILoginWorkerPayload {
  uniqKey: string;
  password: string;
  privateKey: string;
}

function* getAccountsInfo(payload: IGetAccInfo) {
  const accounts: IGetAccountEcoInfo = yield call(getAccountEcosystemsInfo, { publicKey: payload.public });

  if (!accounts || accounts && !accounts.key_id) return;

  if (!accounts.ecosystems.length) {
    const uniqKey = uniqKeyGenerator({
      key_id: accounts.key_id, ecosystem_id: 'un', role_id: 'un'
    });
    return {
      [uniqKey]: {
        uniqKey,
        key_id: accounts.key_id,
        address: accounts.address,
        publicKey: payload.public,
        inActive: true,
      }
    }
  }

  let accountsList: IAccInfo = {};

  accounts.ecosystems.forEach((eco) => {
    if (eco.roles && eco.roles.length) {
      eco.roles.forEach((role) => {

        const uniqKey = uniqKeyGenerator({ key_id: accounts.key_id, ecosystem_id: eco.ecosystem, role_id: role.id });

        accountsList[uniqKey] = {
          role_id: role.id,
          role_name: role.name,
          ecosystem_id: eco.ecosystem,
          ecosystem_name: eco.name,
          key_id: accounts.key_id,
          address: accounts.address,
          publicKey: payload.public,
          uniqKey,
        }
      });
    }

    const uniqKey = uniqKeyGenerator({ key_id: accounts.key_id, ecosystem_id: eco.ecosystem, role_id: '0' });

    accountsList[uniqKey] = {
      role_id: '0',
      role_name: 'Without role',
      ecosystem_id: eco.ecosystem,
      ecosystem_name: eco.name,
      key_id: accounts.key_id,
      address: accounts.address,
      publicKey: payload.public,
      uniqKey,
    };
  });

  return accountsList;
}

export function* auth(payload: IAccount & IAuthPayload) {
  const { key_id, role_id, ecosystem_id, publicKey, privateKey } = payload;

  const newAcc = yield call(loginCall, {
    key_id, role_id, ecosystem_id, publicKey, privateKey
  });

  yield call(defaultPageSetter, payload.role_id);

  yield put(
    authActions.attachSession({
      currentAccount: uniqKeyGenerator(payload),
      ecosystem_id,
      token: newAcc.token,
    })
  );
  const keysToOmit = ['privateKey', 'roles', 'token', 'notify_key', 'timestamp'];
  const account = {
    [uniqKeyGenerator(payload)]: {
      ...omit(keysToOmit, newAcc),
      ...omit(keysToOmit, payload),
    },
  };

  yield put(
    accountActions.createAccount.done({
      params: null as any,
      result: account,
    })
  );
  return account;
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
  const { privateKey, password } = action.payload;

  try {
    const publicKey = yield call(Keyring.genereatePublicKey, privateKey);
    const encKey = yield call(Keyring.encryptAES, privateKey, password);

    const accounts: { [key: string]: IAccount } = yield call(getAccountsInfo, {
      public: publicKey,
    });

    Object.values(accounts).forEach(el => el.encKey = encKey);

    yield put(
      accountActions.createAccount.done({
        params: action.payload,
        result: accounts,
      })
    );

    yield put(
      authActions.login.done({
        params: action.payload,
        result: accounts
      })
    );

    yield put(
      navigatorActions.navigateWithReset([
        {
          routeName: navTypes.AUTH_SUCCESSFUL,
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
    const savedAccount = yield select(accountSelectors.getAccount(action.payload.uniqKey));
    const { privateKey } = action.payload;

    const account = yield call(auth, { ...savedAccount, privateKey });

    yield put(
      authActions.login.done({
        params: action.payload,
        result: {
          ...account
        }
      })
    );

    yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.HOME }]));
  } catch (error) {
    yield put(
      authActions.login.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* createAccountWorker({ payload }: Action<ICreateAccPayload>): SagaIterator {
  try {
    const authPayload: IKeyPairs = yield call(
      Keyring.generateKeyPair,
      payload.seed
    ); // Generate paif of keys

    const encKey = yield call(
      Keyring.encryptAES,
      authPayload.private,
      payload.password
    ); // Encrypt private key
    const accounts = yield call(getAccountsInfo, authPayload);

    yield put(
      accountActions.createAccount.done({
        params: payload,
        result: accounts
      })
    );

    yield put(application.actions.removeSeed());

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
        params: payload,
        error
      })
    );
  }
}

export function* logoutWorker() {
  yield put(authActions.detachSession());
  yield put(navigatorActions.navigateWithReset([{ routeName: navTypes.ACCOUNT_SELECT }]));
}

export function* receiveSelectedAccountWorker(action: Action<{uniqKey: string; encKey: string;}>) {
  yield put(application.actions.toggleDrawer(false));
  yield call(delay, 350);
  yield put(
    navigatorActions.navigate(navTypes.SIGN_IN, action.payload)
  );
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
    waitForActionWithParams(authActions.login.started.type, ['uniqKey']),
    loginWorker
  );
  yield takeEvery(
    waitForActionWithParams(authActions.login.started.type, ['byPrivateKey']),
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
