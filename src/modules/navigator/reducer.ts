import Navigator from '../../navigatorConfig';

export default (state: any, action: any) =>
  Navigator.router.getStateForAction(action, state) || state;
