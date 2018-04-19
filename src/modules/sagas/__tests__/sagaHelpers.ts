import { roleSelect } from '../sagaHelpers';
import { put } from 'redux-saga/effects';
import { ModalTypes } from '../../../constants';
import * as application from 'modules/application';

describe('roleSelect ==> render a role_select_modal and returns selected role', () => {
  const roles = [{  role_name: 'odmen', role_id: 1}];

  it('roleSelected = success', () => {
    const iterator = roleSelect(roles);
    expect(iterator.next().value).toEqual(put(application.actions.showModal({ type: ModalTypes.ROLE_SELECT, params: { roles } })));
    iterator.next();
    iterator.next({ success: { payload: 'it works' } });
    expect(iterator.next().value).toEqual('it works');
  });

  it('roleSelected = failed', () => {
    const iterator = roleSelect(roles);
    expect(iterator.next().value).toEqual(put(application.actions.showModal({ type: ModalTypes.ROLE_SELECT, params: { roles } })));
    iterator.next();
    iterator.next({ failed: {  } });
    expect(iterator.next().value).toEqual(undefined);
  });
});