import { connect } from 'react-redux';
import LogoutButton from 'components/LogoutButton';
import { MODAL_ANIMATION_TIME } from '../constants';

import * as auth from 'modules/auth';
import * as application from 'modules/application';

const mapStateToProps = (state: any, ownProps: any) => ({
  recenter: ownProps.recenter,
  buttonWidth: ownProps.buttonWidth,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    dispatch(application.actions.toggleDrawer(false));
    setTimeout(() => {
      dispatch(auth.actions.logout());
    }, MODAL_ANIMATION_TIME);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);