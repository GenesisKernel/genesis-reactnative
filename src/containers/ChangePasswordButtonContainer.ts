import { connect } from 'react-redux';
import ChangePasswordButton from 'components/ChangePasswordButton';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    buttonWidth: ownProps.buttonWidth,
  }
}

export default connect(mapStateToProps)(ChangePasswordButton);