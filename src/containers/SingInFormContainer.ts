import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import SignInForm, { InputParams } from 'components/SignInForm';
import { IRootState } from 'modules';
import * as auth from 'modules/auth';

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (params: InputParams) =>
    dispatch(auth.actions.login.started(params))
});

export default connect(undefined, mapDispatchToProps)(SignInForm);
