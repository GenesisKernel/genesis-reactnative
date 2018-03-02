import { connect } from 'react-redux';
import { getAuthStatus } from 'modules/auth/selectors';
import * as applicationActions from 'modules/application/actions';

import AnimatedDrawer from 'components/AnimatedDrawer';

const mapStateToProps = (state: any, ownProps: { children: {} }) => {
  const isAuthRoute = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;
  const isAuthenticated = getAuthStatus(state);

  return {
    ...ownProps.children,
    isAuthRoute,
    isAuthenticated,
    drawerOpen: state.application.drawerOpen,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onToggleDrawer: (value: boolean) => dispatch(applicationActions.toggleDrawer(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedDrawer);

