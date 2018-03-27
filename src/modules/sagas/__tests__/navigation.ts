import { navigationWorker } from '../navigation';
import { put } from 'redux-saga/effects';
import { navTypes } from '../../../constants';
import * as applicationActions from 'modules/application/actions';

describe('navigationWorker sets actual page title', () => {
  it('navigationWorker on HOME', () => {
    const iterator = navigationWorker();
    iterator.next();
    expect(iterator.next({ routeName: navTypes.HOME }).value).toEqual(put(applicationActions.receiveTitle('Home')));
  });

  it('navigationWorker on SUB_MENU', () => {
    const iterator = navigationWorker();
    iterator.next();
    expect(iterator.next({ routeName: navTypes.SUB_MENU }).value).toEqual(put(applicationActions.receiveTitle('Home')));
  });

  it('navigationWorker on any other route', () => {
    const iterator = navigationWorker();
    iterator.next();
    expect(iterator.next({ routeName: navTypes.IMPORT_ACCOUNT }).value).toEqual(undefined);
  });
});