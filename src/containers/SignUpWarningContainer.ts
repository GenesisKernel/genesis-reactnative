import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigate } from 'modules/navigator/actions';
import { navTypes } from '../constants';

import SignUpWarning from 'components/SignUpWarning';

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onSubmit: () => dispatch(navigate(navTypes.SIGN_UP))
  }
}

export default connect(undefined, mapDispatchToProps)(SignUpWarning)