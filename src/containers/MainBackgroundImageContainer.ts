import { connect } from 'react-redux';
import MainBackgroundImage from 'components/MainBackgroundImage';

const mapStateToProps = (state: any, ownProps: { children: any }) => {
  const isAuth = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1 || state.navigation.routes[state.navigation.index].routeName === 'LANDING' ;
  const backgroundImage = isAuth ? 'violet' : 'green';

  return {
    ...state.navigation,
    ...ownProps.children,
    backgroundImage,
  };
}
export default connect(mapStateToProps)(MainBackgroundImage)