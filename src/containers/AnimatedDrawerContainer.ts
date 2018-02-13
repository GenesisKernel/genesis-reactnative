import { connect } from 'react-redux';
import { getAuthStatus } from 'modules/auth/selectors';
import AnimatedDrawer from 'components/AnimatedDrawer';

const mapStateToProps = (state: any, ownProps: { children: {} }) => {
  const isAuthRoute = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;
  const isAuthenticated = getAuthStatus(state);

  return {
    ...ownProps.children,
    isAuthRoute,
    isAuthenticated,
  }
}

export default connect(mapStateToProps)(AnimatedDrawer);

