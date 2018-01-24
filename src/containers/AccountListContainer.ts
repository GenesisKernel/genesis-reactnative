import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { receiveSelectedAccount } from 'modules/auth/actions';
import AccountList from 'components/AccountList';
import * as account from 'modules/account';
import * as ecosystem from 'modules/ecosystem';
import * as navigator from 'modules/navigator';
import { navTypes } from '../navigatorConfig';

const mapStateToProps = state => ({
  accounts: account.selectors.getAccounts(state),
  ecosystems: ecosystem.selectors.getEcosystems(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSelect: (id: string, ecosystemId: string) =>
    dispatch(receiveSelectedAccount({ id, ecosystemId })),
  onRemove: (accountId: string) =>
    dispatch(account.actions.removeAccount.started({ accountId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
