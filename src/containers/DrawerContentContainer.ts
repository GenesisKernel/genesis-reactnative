import { connect, Dispatch } from 'react-redux';
import DrawerContent from 'components/DrawerContent';
import * as auth from 'modules/auth';

const mapStateToProps = state => ({
  currentAccountAddress: auth.selectors.getCurrentAccountAddress(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  switchAccount: (accountAdress: string, ecosystemId: string) =>
    dispatch(auth.actions.switchAccount.started({ accountAdress, ecosystemId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
