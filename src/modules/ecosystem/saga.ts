import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call } from 'redux-saga/effects';

import api, { apiSetToken, apiDeleteToken } from 'utils/api';
import Keyring from 'utils/keyring';

import { requestEcosystem } from './actions';
import { generateTime } from 'modules/auth/reducer';

const defaultParams: string[] = ['ava', 'key_mask', 'ecosystem_name'];

export function* requestEcosystemWorker(action: Action<any>) {

  try {
    const { ecosystems } = action.payload;
    for (let ecosystemId of ecosystems) {
      const { data: parameters } = yield call(
        api.getEcosystemParameters,
        ecosystemId,
        defaultParams
      );

      yield put(
        requestEcosystem.done({
          params: action.payload,
          result: { id: ecosystemId, parameters }
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
    apiDeleteToken(); // Remove previous token

    const { privateKey, publicKey } = payload;
    const ecosystems = payload.ecosystems || ['1'];

    const { data: uidParams } = yield call(api.getUid);

    const signature = yield call(Keyring.sign, uidParams.uid, privateKey);
    apiSetToken(uidParams.token);

    let availableEcosystems = [];

    for (let ecosystem of ecosystems) {
      try {
        let { data: accountData } = yield call(api.login, {
          signature,
          ecosystem: ecosystem,
          publicKey: publicKey,
        });
        accountData.tokenExpiry = generateTime();
        accountData.roles = accountData.roles || [];

        availableEcosystems.push(accountData);
      } catch(err) {
        availableEcosystems.push(null);
      }
    }
    return availableEcosystems;
  } catch(err) {
    console.error(err);
  }

}

export function* ecosystemSaga(): SagaIterator {
  yield takeEvery(requestEcosystem.started, requestEcosystemWorker);
}

export default ecosystemSaga;
