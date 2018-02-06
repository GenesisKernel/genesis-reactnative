import { connect, Dispatch } from 'react-redux';
import StatusBar from 'components/StatusBar';

import { navTypes } from '../navigatorConfig';

const mapStateToProps = (state: any) => {
  const isAuthRoute = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;

  return {
    barStyle: isAuthRoute ? 'dark-content' : 'light-content',
    backgroundColor: isAuthRoute ? 'white' : 'black',
  };
};


export default connect(mapStateToProps)(StatusBar);
