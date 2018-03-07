import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SignUpConfirmForm, { InputParams } from 'components/SignUpConfirmForm';
import { IRootState } from 'modules';
import { generateSeed } from '../modules/application/actions';
import { navigate } from 'modules/navigator/actions';

import { navTypes } from '../constants';

const mapStateToProps = (state: IRootState) => {
  return {
    seed: state.application.seed
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  generateSeed: () => dispatch(generateSeed()),
  onSubmit: (params: InputParams) => dispatch(navigate(navTypes.SIGN_UP_CONFIRM, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpConfirmForm);
