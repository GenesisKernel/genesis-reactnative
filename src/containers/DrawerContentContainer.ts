import { connect, Dispatch } from 'react-redux';
import DrawerContent from 'components/DrawerContent';
import * as auth from 'modules/auth';
import * as application from 'modules/application';

const mapStateToProps = state => ({
  currentAccountAddress: auth.selectors.getCurrentAccountAddress(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  switchAccount: (accountAdress: string, ecosystemId: string) =>
    dispatch(auth.actions.switchAccount.started({ accountAdress, ecosystemId })),

    openModal: () => {
      dispatch(application.actions.showModal({ type: 'CONTRACT_MODAL', params: { title: '1', field: 'kek', Amount: '123', Recipient: '123123' } }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
