import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { navTypes } from '../constants';

import SignInForm, { InputParams } from 'components/SignInForm';
import { IRootState } from 'modules';
import * as auth from 'modules/auth';
import { navigateWithReset } from 'modules/navigator/actions';

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (params: InputParams) => dispatch(auth.actions.login.started(params)),
  onCancel: () => dispatch(navigateWithReset([{ routeName: navTypes.ACCOUNT_SELECT }]))
});

export default connect(undefined, mapDispatchToProps)(SignInForm);
