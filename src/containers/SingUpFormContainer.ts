import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SignUpForm, { InputParams } from 'components/SignUpForm';
import { IRootState } from 'modules';
import { createAccount } from 'modules/account/actions';

const mapStateToProps = (state: IRootState) => {
  return {
    seed: state.application.seed
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (params: InputParams) => dispatch(createAccount.started(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
