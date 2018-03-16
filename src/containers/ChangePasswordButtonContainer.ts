import { connect } from 'react-redux';
import { IAccout } from 'modules/account/reducer';
import { changePassword } from 'modules/account/actions';
import ChangePasswordButton from 'components/ChangePasswordButton';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    buttonWidth: ownProps.buttonWidth,
    recenter: ownProps.recenter,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onPress: (account: IAccout) => dispatch(changePassword.started(account)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordButton);