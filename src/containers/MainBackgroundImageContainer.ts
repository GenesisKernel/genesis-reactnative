import { connect } from 'react-redux';
import MainBackgroundImage from 'components/MainBackgroundImage';

const mapStateToProps = (state: any, ownProps: { children: any }) => {
  const isAuth = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;
  return {
    ...state.navigation,
    ...ownProps.children,
    backgroundImage: isAuth ? 'violet' : 'green',
  };
}
export default connect(mapStateToProps)(MainBackgroundImage)