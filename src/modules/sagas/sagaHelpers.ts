import Keyring from 'utils/keyring';
import { create } from 'apisauce';
import { takeEvery, put, race, take, call, select, all } from 'redux-saga/effects';
import { path, isEmpty } from 'ramda';
import { delay } from 'redux-saga';

import { ModalTypes, MODAL_ANIMATION_TIME, GUEST_KEY_PAIR, DEFAULT_PAGE } from '../../constants';

import Contract, { IContractParam } from 'utils/transactions/contract';
import defaultSchema from 'utils/transactions/schema/defaultSchema';
import { toHex } from 'utils/transactions/convert';
import api, { apiSetToken, apiDeleteToken, apiSetUrl, ApiFactory } from 'utils/api';

import { IAuthPayload } from 'modules/auth/saga';
import * as account from 'modules/account';
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

  const apiInstance = create({
    baseURL: `${currentNode.apiUrl}api/v2`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
  const Api: any = new ApiFactory(apiInstance);

  try {
    const { data: uidParams } = yield call(Api.getUid);

    apiInstance.setHeader('Authorization', `Bearer ${uidParams.token}`);

    const signature = yield call(Keyring.sign, `LOGIN${uidParams.uid}`, GUEST_KEY_PAIR.private);

    const { data: accountData } = yield call(Api.login, {
      publicKey: GUEST_KEY_PAIR.public,
      ecosystem: '1',
      signature,
    });

    return accountData;
  } catch (err) {
    console.log(err, 'login by guest key err')
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
  } catch (err) {
    console.log('loginCall ERROR AT loginCall =>', err);
    return null;
  }
}

export function* roleSelect(roles: IRole[]) {
  yield put(application.actions.showModal({ type: ModalTypes.ROLE_SELECT, params: { roles } }));

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

  while (true) {

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

    } catch (err) {
      allNodes.splice(randomInt, 1); // just remove expired nodes from temporary array
    }

    if (allNodes.length === 0) {
      return checkedNodes;
    }
  }
}

export function* defaultPageSetter(role_id?: number | string | undefined) {
  const currentRole = yield select(auth.selectors.getCurrentRole);
  if (role_id || currentRole && currentRole.role_id) {
    const { data: { value: { default_page } } } = yield call(api.getRow, 'roles', role_id || currentRole.role_id);

    yield put(application.actions.setDefaultPage(default_page || DEFAULT_PAGE));
  }
}

export function* prepareContractWorker(payload: any, privateKey: string) {
  const uniqKey = yield select(auth.selectors.getCurrentAccount);
  const currentAcc = yield select(account.selectors.getAccount(uniqKey));

  try {
    const request: {[hash: string]: any}  = {};
    for (const baseContract of payload.contracts) {
      const prepareResult = yield call(api.getContract, baseContract.contract);
      const { data: { fields, id } } = prepareResult;
      const txParams: { [name: string]: IContractParam } = {};
      const logParams: { [name: string]: IContractParam } = {};

      fields.forEach((field: any) => {
        txParams[field.name] = {
          type: field.type,
          value: baseContract.params[field.name],
        };
        logParams[field.name] = {
          type: field.type,
          value: baseContract.params[field.name],
        };
      });

      const contract = new Contract({
        id,
        schema: defaultSchema,
        ecosystemID: currentAcc.ecosystem_id
          ? parseInt(currentAcc.ecosystem_id, 10)
          : 1,
        fields: txParams,
      });
      const signedContract = yield call([contract, 'sign'], privateKey);
      request[signedContract.hash] = toHex(signedContract.data);
    }
    const resp = yield call(api.sendTransaction, request);
    return !isEmpty(resp.data.hashes) ? resp.data.hashes : null;
  } catch (error) {
    console.log(error, 'ERROR AT => prepareContractWorker');
    return null;
  }
}
