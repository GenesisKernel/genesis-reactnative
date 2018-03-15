import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { receiveSelectedAccount } from 'modules/auth/actions';
import AccountList from 'components/AccountList';

import * as auth from 'modules/auth';
import * as account from 'modules/account';
import * as ecosystem from 'modules/ecosystem';
import * as notifications from 'modules/notifications';
import { navTypes } from '../constants';

const mapStateToProps = state => ({
  accounts: account.selectors.getAccounts(state),
  ecosystems: ecosystem.selectors.getEcosystems(state),
  notifications: notifications.selectors.getNotifications(state),
  currentAccountAddress: auth.selectors.getCurrentAccountAddress(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: { noTitle?: boolean }) => ({
  noTitle: ownProps.noTitle,
  onSelect: (address: string, ecosystemId: string) =>
    dispatch(receiveSelectedAccount.started({ address, ecosystemId })),
  onRemove: (accountAddress: string) =>
    dispatch(account.actions.removeAccount.started({ accountAddress }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
