import { backButtonWorker } from '../hardwareBackButton';
import { navTypes } from '../../../constants';

import { put } from 'redux-saga/effects';
import { back } from 'modules/navigator/actions';
import * as application from 'modules/application';

describe('backButtonWorker handles android backbutton', () => {
  it('drawer opened', () => {
    const iterator = backButtonWorker();
    const currentRoute = { routeName: navTypes.HOME };
    iterator.next();
    iterator.next(true);
    iterator.next();
    expect(iterator.next(true).value).toEqual(put(application.actions.toggleDrawer(false)));
  });

  it('drawer closed, appShouldCollapse = true', () => {
    const iterator = backButtonWorker();
    const currentRoute = { routeName: navTypes.HOME };
    iterator.next();
    iterator.next(currentRoute);
    iterator.next(true);
    expect(iterator.next(false).value).toEqual(undefined);
  });

  it('drawer closed, appShouldCollapse = false', () => {
    const iterator = backButtonWorker();
    const currentRoute = { routeName: navTypes.HOME };
    iterator.next();
    iterator.next(currentRoute);
    iterator.next(false);
    expect(iterator.next(false).value).toEqual(put(back()));
  });
});