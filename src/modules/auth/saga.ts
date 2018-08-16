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
import { checkEcosystemsAvailiability } from 'modules/ecosystem/saga';
import { uniqKeyGenerator } from 'utils/common';
import { validatePassword } from 'modules/sagas/privateKey';

export interface IAuthPayload {
  private: string;
  public: string;
  ecosystems: string[];
}

export interface IKeyPairs {
  private: string;
  public: string;
}

interface ILoginWorkerPayload {
  uniqKey: string;
  password: string;
  privateKey: string;
}

export function* auth(payload: IAuthPayload) {

  let accounts = yield call(checkEcosystemsAvailiability, { ecosystems: payload.ecosystems, privateKey: payload.private, publicKey: payload.public });

  let accountData = Object.values(accounts)[0]; // if acc > 1 login to first
  if (!accountData) return;

  const { roles } = accountData;
  const currentRole = roles && !!roles.length ? yield call(roleSelect, roles) : {};

  if (currentRole && currentRole.role_id) {
    const newAcc = yield call(loginCall, payload, currentRole.role_id);

    yield call(defaultPageSetter, currentRole.role_id);

    accountData = { ...accountData, ...newAcc };
    accounts[uniqKeyGenerator(accountData)] = accountData;
  } else {
    apiSetToken(accountData.token);
  }

  const { token, refresh } = pick<any, any>(['token', 'refresh'], accountData);

  yield put(
    authActions.attachSession({
      currentAccount: uniqKeyGenerator(accountData),
      ecosystems: payload.ecosystems,
      token, refresh
    })
  ); // save account data in auth reducer

  Object.keys(accounts).forEach(el => {
    accounts[el] = pick(['key_id', 'ecosystem_id', 'address', 'uniqKey', 'username', 'roles', 'publicKey'], accounts[el]);
  });
  return accounts; // return account to function where it was called
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
  const { privateKey, password, ecosystems } = action.payload;

  try {
    const publicKey = yield call(Keyring.genereatePublicKey, privateKey);
    const encKey = yield call(Keyring.encryptAES, privateKey, password);
    const validEcosystems = ecosystems.length ? ecosystems : ['1'];

    const accounts = yield call(auth, {
      public: publicKey,
      private: privateKey,
      ecosystems: validEcosystems,
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
          params: { isKnownAccount: true },
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

    const account = yield call(auth, {
      public: savedAccount.publicKey,
      private: privateKey,
      ecosystems: [savedAccount.ecosystem_id],
    });

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

    let accounts = yield call(auth, { ...authPayload, ecosystems: ['1'] });
    Object.values(accounts).forEach(el => el.encKey = encKey);

    yield put(
      accountActions.createAccount.done({
        params: action.payload,
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

export function* receiveSelectedAccountWorker(action: Action<{uniqKey: string; encKey: string;}>) {
  yield put(application.actions.toggleDrawer(false))
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
