import { connect } from 'react-redux';
import AnimatedDrawer from 'components/AnimatedDrawer';

const mapStateToProps = (state: any, ownProps: { children: {} }) => {
  const isAuthRoute = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;

  return {
    ...ownProps.children,
    isAuthRoute,
  }
}
export default connect(mapStateToProps)(AnimatedDrawer);

