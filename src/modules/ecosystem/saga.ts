import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select } from 'redux-saga/effects';

import api, { apiSetToken, apiDeleteToken } from 'utils/api';
import Keyring from 'utils/keyring';

import { requestEcosystem, addEcosystemToList } from './actions';
import { navTypes } from '../../constants';

import { getUsername, loginCall } from 'modules/sagas/sagaHelpers';
import { uniqKeyGenerator, } from 'utils/common';

import * as authSelectors from 'modules/auth/selectors';
import * as accountSelectors from 'modules/account/selectors';
import * as accountActions from 'modules/account/actions';
import * as navigatorActions from 'modules/navigator/actions';
import * as applicationActions from 'modules/application/actions';

const defaultParams: string[] = ['ava', 'key_mask', 'name'];

export function* requestEcosystemWorker(action: Action<any>) {

  try {
    const { ecosystems } = action.payload;

    for (const ecosystemId of ecosystems) {
      const { data: { ecosystem_name }} = yield call(api.getEcosystemName, ecosystemId);
      const { data: parameters } = yield call(
        api.getEcosystemParameters,
        ecosystemId,
        defaultParams,
        ecosystem_name
      );

      yield put(
        requestEcosystem.done({
          params: action.payload ,
          result: { id: ecosystemId, parameters: {...parameters, ecosystem_name} },
        })
      );
    }
  } catch (error) {
    yield put(
      requestEcosystem.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* checkEcosystemsAvailiability(payload: { ecosystems?: string[], privateKey: string, publicKey: string }) {
  try {
    const { privateKey, publicKey } = payload;
    const ecosystems = payload.ecosystems || ['1'];

    let availableEcosystems: { [key: string]: any } = {};

    for (let ecosystem of ecosystems) {
      try {
        let accountData = yield call(loginCall, { ecosystems: [ecosystem], private: payload.privateKey, public: payload.publicKey });

        const roles = accountData.roles || [];

        const avatarAndUsername = yield call(getUsername, accountData.token, accountData.key_id);
        const uniqKey = uniqKeyGenerator(accountData);

        accountData = { ...accountData, ...avatarAndUsername, roles, uniqKey, publicKey };
        availableEcosystems[uniqKey] = accountData;
        yield call(apiDeleteToken)
      } catch(err) {
        console.log('checkEcosystemsAvailiability err', err); // we just want to skip an invalid ecosystems
      }
    }
    return availableEcosystems;
  } catch(err) {
    console.error(err);
  }

}

function* addEcosystemToListWorker({ payload }: Action<{ecosystem: string, page?: string}>) {
  const uniqKey = yield select(authSelectors.getCurrentAccount);
  const currentAccount = yield select(accountSelectors.getAccount(uniqKey));
  const newUniqKey = uniqKeyGenerator({ key_id: currentAccount.key_id, ecosystem_id: payload.ecosystem });
  const newAccount = {
    ...currentAccount,
    uniqKey: newUniqKey,
    ecosystem_id: payload.ecosystem,
  }

  yield put(accountActions.createAccount.done({
    params: {} as any, // forgive me, Father
    result: {
      [newUniqKey]: newAccount,
    } as any,
  }));

  if (payload.page) {
    yield put(navigatorActions.navigate(navTypes.PAGE));
    yield put(applicationActions.receivePageParams({ page: payload.page }));
  }
}

export function* ecosystemSaga(): SagaIterator {
  yield takeEvery(requestEcosystem.started, requestEcosystemWorker);
  yield takeEvery(addEcosystemToList, addEcosystemToListWorker);
}

export default ecosystemSaga;
