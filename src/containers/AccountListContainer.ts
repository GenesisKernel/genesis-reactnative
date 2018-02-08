import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { receiveSelectedAccount } from 'modules/auth/actions';
import AccountList from 'components/AccountList';
import * as account from 'modules/account';
import * as ecosystem from 'modules/ecosystem';
import * as navigator from 'modules/navigator';
import * as notifications from 'modules/notifications';
import { navTypes } from '../navigatorConfig';

const mapStateToProps = state => ({
  accounts: account.selectors.getAccounts(state),
  ecosystems: ecosystem.selectors.getEcosystems(state),
  notifications: notifications.selectors.getNotifications(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSelect: (address: string, ecosystemId: string) =>
    dispatch(receiveSelectedAccount({ address, ecosystemId })),
  onRemove: (accountAddress: string) =>
    dispatch(account.actions.removeAccount.started({ accountAddress }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
