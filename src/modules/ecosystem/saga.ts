import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call } from 'redux-saga/effects';

import api, { apiSetToken, apiDeleteToken } from 'utils/api';
import Keyring from 'utils/keyring';

import { requestEcosystem } from './actions';
import { generateTime } from 'modules/auth/reducer';
import { getAvatarAndUsername } from 'modules/sagas/sagaHelpers';

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
    const { privateKey, publicKey } = payload;
    const ecosystems = payload.ecosystems || ['1'];

    yield call(apiDeleteToken); // Remove previous token

    const { data: uidParams } = yield call(api.getUid);

    const signature = yield call(Keyring.sign, uidParams.uid, privateKey);

    yield call(apiSetToken, uidParams.token);

    let availableEcosystems = [];
    for (let ecosystem of ecosystems) {
      try {
        let { data: accountData } = yield call(api.login, {
          signature,
          ecosystem: ecosystem,
          publicKey: publicKey,
        });
        const tokenExpiry = generateTime();
        const roles = accountData.roles || [];

        const avatarAndUsername = yield call(getAvatarAndUsername, accountData.token, accountData.key_id);
        yield call(apiSetToken, uidParams.token);

        accountData = { ...accountData, ...avatarAndUsername, tokenExpiry, roles };
        availableEcosystems.push(accountData);
      } catch(err) {
        console.log('checkEcosystemsAvailiability err');
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
