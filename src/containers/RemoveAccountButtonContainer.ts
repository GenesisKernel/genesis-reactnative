import { connect } from 'react-redux';
import RemoveAccountButton from 'components/RemoveAccountButton';
import { getCurrentAccountAddress } from 'modules/auth/selectors';
import { removeAccount } from 'modules/account/actions';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    buttonWidth: ownProps.buttonWidth,
    recenter: ownProps.recenter,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: { accountAddress: string }) => {
  return {
    onRemove: () => dispatch(removeAccount.started({ accountAddress: ownProps.accountAddress })),
  }
}

export default connect(undefined, mapDispatchToProps)(RemoveAccountButton);