import { takeEvery, put, race, take, call } from 'redux-saga/effects';
import { path } from 'ramda';
import { delay } from 'redux-saga';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';
import api, { apiSetToken, apiDeleteToken } from 'utils/api';

import * as application from 'modules/application';

export function* getUsername(token: string, key_id: string) {
  apiDeleteToken();
  apiSetToken(token);

  const username = yield call(api.getUsername, token, key_id);

  return {
    username: path(['data', 'value', 'member_name'], username) || '',
  };
}

export function* roleSelect(roles: IRole[]) {
  yield put(application.actions.showModal({ type: ModalTypes.ROLE_SELECT, params: {roles} }));

  const roleSelected = yield race({
    success: take(application.actions.confirmModal),
    failed: take(application.actions.closeModal),
  });

  yield call(delay, MODAL_ANIMATION_TIME + 150);

  if (roleSelected.failed) return;

  if (roleSelected.success) {
    return roleSelected.success.payload;
  };
}