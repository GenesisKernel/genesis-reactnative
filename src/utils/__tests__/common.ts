import { isRouteToCollapseApp } from '../common';
import { navTypes } from '../../constants';

describe('isRouteToCollapseApp', () => {
  it('isRouteToCollapseApp should return true if routes indexOf [navTypes.HOME, navTypes.ACCOUNT_SELECT] : should return false', () => {
    expect(isRouteToCollapseApp(navTypes.HOME)).toBe(true);
    expect(isRouteToCollapseApp(navTypes.ACCOUNT_SELECT)).toBe(true);

    expect(isRouteToCollapseApp(navTypes.AUTH)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.AUTH_SUCCESSFUL)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.IMPORT_ACCOUNT)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.KEY)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.NOTIFICATIONS)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.LANDING)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.NOTIFICATIONS)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.PAGE)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SCANNER)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SIGN_IN)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SIGN_UP)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SIGN_UP_CONFIRM)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SIGN_UP_WARNING)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.SUB_MENU)).toBe(false);
    expect(isRouteToCollapseApp(navTypes.TRANSACTIONS)).toBe(false);
  });
});