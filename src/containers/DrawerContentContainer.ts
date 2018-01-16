import { connect, Dispatch } from 'react-redux';
import DrawerContent from 'components/DrawerContent';
import * as auth from 'modules/auth';

const mapStateToProps = state => ({
  currentAccountId: auth.selectors.getCurrentAccountId(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(auth.actions.logout()),
  switchAccount: (accountId: string, ecosystemId: string) =>
    dispatch(auth.actions.switchAccount.started({ accountId, ecosystemId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
