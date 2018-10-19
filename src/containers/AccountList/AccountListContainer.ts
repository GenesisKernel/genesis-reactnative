import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AccountList from 'components/AccountList';

import * as authActions from 'modules/auth/actions';
import * as accountSelectors from 'modules/account/selectors';
import * as applicationActions from 'modules/application/actions';
import * as applicationSelectors from 'modules/application/selectors';
import * as navigatorSelectors from 'modules/navigator/selectors';
import { navTypes, MODAL_ANIMATION_TIME, ModalTypes } from '../../constants';

const mapStateToProps = (state: any, ownProps: { noTitle?: boolean }) => {
  const currentRoute = navigatorSelectors.getCurrentRoute(state).routeName;
  return {
    accounts: accountSelectors.getAccounts(state),
    isDrawerOpened: applicationSelectors.getDrawerState(state),
    isAccountSelectScreen: currentRoute === navTypes.ACCOUNT_SELECT || currentRoute === navTypes.SIGN_UP_WARNING,
    noTitle: ownProps.noTitle,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSelect: (payload: { uniqKey: string; encKey: string; }) =>
    dispatch(authActions.receiveSelectedAccount.started(payload)),
  onCreateAccount: () =>
    dispatch(applicationActions.showModal({ type: ModalTypes.SELECT_AUTH_TYPE })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
