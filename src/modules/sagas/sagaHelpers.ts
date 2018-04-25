import Keyring from 'utils/keyring';
import { create } from 'apisauce';
import { takeEvery, put, race, take, call, select, all } from 'redux-saga/effects';
import { path } from 'ramda';
import { delay } from 'redux-saga';
import { ModalTypes, MODAL_ANIMATION_TIME, GUEST_KEY_PAIR } from '../../constants';
import api, { apiSetToken, apiDeleteToken, apiSetUrl } from 'utils/api';

import { IAuthPayload } from 'modules/auth/saga';

import * as application from 'modules/application';
import * as auth from 'modules/auth';
import * as nodes from 'modules/nodes';

export function* getUsername(token: string, key_id: string) {
  apiDeleteToken();
  apiSetToken(token);

  const username = yield call(api.getUsername, token, key_id);

  return {
    username: path(['data', 'value', 'member_name'], username) || '',
  };
}

export function* loginByGuestKey() {
  const currentNode = yield select(nodes.selectors.getCurrentNode);

  let Api = create({
    baseURL: `${currentNode.apiUrl}api/v2`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
  Api.addRequestTransform(request => {
    if (request.method === 'post' && request.data) {
      const data = { ...request.data };
      const params = new URLSearchParams();
      const keys = Object.keys(data);

      keys.forEach(key => {
        if (data[key] === undefined) {
          return;
        }

        params.append(key, data[key]);
      });

      request.data = params.toString();
    }
  });

  Api.addResponseTransform(response => {
    if (!response.ok) {
      const message: string =
        (response.data && response.data.msg) || response.problem;
      const error = new Error(message);

      error.message = message;
      error.data = response.data;
      error.status = response.status;

      throw error;
    }
  });

  const getUid = () => Api.get('/getuid');
  const login = (payload: any) => Api.post('/login', payload);
  try {
    const { data: uidParams } = yield call(getUid);
    Api.setHeader('Authorization', `Bearer ${uidParams.token}`);
    const signature = yield call(Keyring.sign, `LOGIN${uidParams.uid}`, GUEST_KEY_PAIR.private);

    const { data: accountData } = yield call(login, {
      pubkey: GUEST_KEY_PAIR.public.slice(2),
      ecosystem: '1',
      signature,
    });

    return accountData;
  } catch (err) {
    return null;
  }
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