import { connect } from 'react-redux';
import LogoutButton from 'components/LogoutButton';

import * as auth from 'modules/auth';
import * as application from 'modules/application';

const mapStateToProps = (state: any, ownProps: any) => ({
  recenter: ownProps.recenter,
  buttonWidth: ownProps.buttonWidth,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    dispatch(application.actions.toggleDrawer(false));
    dispatch(auth.actions.logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);