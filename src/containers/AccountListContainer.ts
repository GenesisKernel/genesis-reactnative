import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { receiveSelectedAccount } from 'modules/auth/actions';
import AccountList from 'components/AccountList';

import * as nodes from 'modules/nodes';
import * as auth from 'modules/auth';
import * as account from 'modules/account';
import * as ecosystem from 'modules/ecosystem';
import * as notifications from 'modules/notifications';
import * as application from 'modules/application';
import * as navigator from 'modules/navigator';
import * as navigatorSelectors from 'modules/navigator/selectors';
import { navTypes, MODAL_ANIMATION_TIME, ModalTypes } from '../constants';

const mapStateToProps = (state:any) => ({
  accounts: account.selectors.getAccounts(state),
  ecosystems: ecosystem.selectors.getEcosystems(state),
  notifications: notifications.selectors.getNotifications(state),
  currentAccount: auth.selectors.getCurrentAccount(state),
  isDrawerOpened: application.selectors.getDrawerState(state),
  currentNode: nodes.selectors.getCurrentNode(state),
  isAccountSelectScreen: navigatorSelectors.getCurrentRoute(state).routeName === navTypes.ACCOUNT_SELECT || navigatorSelectors.getCurrentRoute(state).routeName === navTypes.SIGN_UP_WARNING,
});

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: { noTitle?: boolean }) => ({
  noTitle: ownProps.noTitle,
  onSelect: (payload: { uniqKey: string; encKey: string; }) =>
    dispatch(receiveSelectedAccount.started(payload)),
  onCreateAccount: () => 
    dispatch(application.actions.showModal({ type: ModalTypes.SELECT_AUTH_TYPE }))
   ,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
