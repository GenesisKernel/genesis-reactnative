import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { receiveSelectedAccount } from 'modules/auth/actions';
import AccountList from 'components/AccountList';

import * as auth from 'modules/auth';
import * as account from 'modules/account';
import * as ecosystem from 'modules/ecosystem';
import * as notifications from 'modules/notifications';
import * as application from 'modules/application';
import * as navigator from 'modules/navigator';
import * as navigatorSelectors from 'modules/navigator/selectors';
import { navTypes, MODAL_ANIMATION_TIME } from '../constants';

const mapStateToProps = state => ({
  accounts: account.selectors.getAccounts(state),
  ecosystems: ecosystem.selectors.getEcosystems(state),
  notifications: notifications.selectors.getNotifications(state),
  currentAccountAddress: auth.selectors.getCurrentAccountAddress(state),
  currentEcosystemId: auth.selectors.getCurrentEcosystemId(state),
  isDrawerOpened: application.selectors.getDrawerState(state),
  isAccountSelectScreen: navigatorSelectors.getCurrentRoute(state).routeName === navTypes.ACCOUNT_SELECT || navigatorSelectors.getCurrentRoute(state).routeName === navTypes.SIGN_UP_WARNING,
});

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: { noTitle?: boolean }) => ({
  noTitle: ownProps.noTitle,
  onSelect: (address: string, ecosystemId: string) =>
    dispatch(receiveSelectedAccount.started({ address, ecosystemId })),
  onRemove: (accountAddress: string) =>
    dispatch(account.actions.removeAccount.started({ accountAddress })),
  onCreateAccount: () => {
    dispatch(application.actions.toggleDrawer(false));
    setTimeout(() => {
      dispatch(navigator.actions.navigate(navTypes.SIGN_UP));
    }, MODAL_ANIMATION_TIME)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
