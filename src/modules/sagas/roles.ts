import { takeEvery, put, race, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';

import * as application from 'modules/application';

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