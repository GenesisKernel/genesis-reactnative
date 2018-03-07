import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ImportAccountForm, { InputParams } from 'components/ImportAccountForm';
import { IRootState } from 'modules';
import * as auth from 'modules/auth';

import { navTypes } from '../constants';

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (params: InputParams) =>
    dispatch(auth.actions.login.started(params))
});

export default connect(undefined, mapDispatchToProps)(ImportAccountForm);
