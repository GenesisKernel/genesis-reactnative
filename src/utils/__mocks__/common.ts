jest.mock('utils/common', () => ({
  getCurrentLocale: jest.fn().mockReturnValue('en-US'),
  isRouteToCollapseApp: (value:  boolean) => value,
}));