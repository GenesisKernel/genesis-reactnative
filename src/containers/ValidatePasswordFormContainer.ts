import { connect } from 'react-redux';
import * as authActions from 'modules/auth/actions';

import ValidatePasswordForm from 'components/ValidatePasswordForm';

const mapStateToProps = (state: any) => {
  return {
    isVisible: !!state.auth.privateKeyValid,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCheckPassword: (password: string) => dispatch(authActions.validatePrivateKey(password)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ValidatePasswordForm);