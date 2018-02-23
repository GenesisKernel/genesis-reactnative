import { connect } from 'react-redux';
import LogoutButton from 'components/LogoutButton';

import * as auth from 'modules/auth';

const mapStateToProps = (state: any, ownProps: any) => ({
  recenter: ownProps.recenter,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(auth.actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);