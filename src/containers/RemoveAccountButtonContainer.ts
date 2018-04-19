import { connect } from 'react-redux';
import RemoveAccountButton from 'components/RemoveAccountButton';
import { removeAccount } from 'modules/account/actions';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    buttonWidth: ownProps.buttonWidth,
    recenter: ownProps.recenter,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: { uniqKey: string }) => {
  return {
    onRemove: () => dispatch(removeAccount.started({ uniqKey: ownProps.uniqKey })),
  }
}

export default connect(undefined, mapDispatchToProps)(RemoveAccountButton);