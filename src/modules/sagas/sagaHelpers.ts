import { takeEvery, put, race, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';
import api, { apiSetToken, apiDeleteToken } from 'utils/api';

import * as application from 'modules/application';

export function* getAvatarAndUsername(token: string, key_id: string) {
  apiDeleteToken();
  apiSetToken(token);

  const avatarAndUsername = yield call(api.getAvatarAndUsername, token, key_id);

  return {
    avatar: avatarAndUsername.data.value.avatar || '',
    username: avatarAndUsername.data.value.member_name || '',
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