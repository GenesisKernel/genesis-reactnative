import Keyring from 'utils/keyring';
import { takeEvery, put, race, take, call, select, all } from 'redux-saga/effects';
import { path } from 'ramda';
import { delay } from 'redux-saga';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';
import api, { apiSetToken, apiDeleteToken, apiSetUrl } from 'utils/api';

import { IAuthPayload } from 'modules/auth/saga';

import * as application from 'modules/application';
import * as auth from 'modules/auth';

export function* getUsername(token: string, key_id: string) {
  apiDeleteToken();
  apiSetToken(token);

  const username = yield call(api.getUsername, token, key_id);

  return {
    username: path(['data', 'value', 'member_name'], username) || '',
  };
}

export function* loginCall(payload: IAuthPayload, role_id?: number, signParams?: any) {
  try {
    yield call(apiDeleteToken); // Remove previous token

    const { data: uidParams } = signParams || (yield call(api.getUid));

    yield call(apiSetToken, uidParams.token);

    const signature = yield call(Keyring.sign, `LOGIN${uidParams.uid}`, payload.private);

    let { data: accountData } = yield call(api.login, {
      signature,
      ecosystem: payload.ecosystems[0] || '1',
      publicKey: payload.public,
      role_id,
    });

    yield call(apiSetToken, accountData.token);
    return accountData;
  } catch(err) {
    console.log('loginCall ERROR AT loginCall =>', err);
    return null;
  }
}

export function* roleSelect(roles: IRole[]) {
  yield put(application.actions.showModal({ type: ModalTypes.ROLE_SELECT, params: {roles} }));

  const roleSelected = yield race({
    success: take(application.actions.confirmModal),
    failed: take(application.actions.closeModal),
  });
  yield put(application.actions.closeModal());
  yield call(delay, MODAL_ANIMATION_TIME + 150);

  if (roleSelected.failed) return;

  if (roleSelected.success) {
    yield put(auth.actions.setRole(roleSelected.success.payload));
    return roleSelected.success.payload;
  };
}

export function* checkNodeValidity(nodesArray: INode[], requiredCount = 1, token?: string, currentNode?: INode, withSignature = false) {
  let allNodes = [...nodesArray];

  if (currentNode) {
    allNodes = allNodes.filter((el: INode) => el.apiUrl !== currentNode.apiUrl);
  }

  let checkedNodes = [];
  let randomInt = 0;

  yield call(apiDeleteToken);

  while(true) {

    try {
      randomInt = Math.floor(Math.random() * allNodes.length);
      let randomNode = allNodes[randomInt];

      yield call(apiSetUrl, `${randomNode.apiUrl}api/v2`);
      const uid = yield call(api.getUid);

      if (withSignature) {
        randomNode = { ...randomNode, signature: uid }
      }

      checkedNodes.push(randomNode);
      allNodes.splice(randomInt, 1);

      if (checkedNodes.length === requiredCount) {
        if (token) {
          yield call(apiSetToken, token);
        }

        return checkedNodes;
      }

    } catch(err) {
      allNodes.splice(randomInt, 1); // just remove expired nodes from temporary array
    }

    if (allNodes.length === 0) {
      return checkedNodes;
    }
  }
}