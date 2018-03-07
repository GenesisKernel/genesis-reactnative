import { connect, Dispatch } from 'react-redux';
import { Platform } from 'react-native';

import StatusBar from 'components/StatusBar';

import { navTypes } from '../constants';

const mapStateToProps = (state: any) => {
  const isDrawerOpened = state.application.drawerOpen;
  const isAuthRoute = state.navigation.routes[state.navigation.index].routeName.indexOf('AUTH') !== -1;
  let statusBarStyle: object;

  if (Platform.OS === 'android') {
    statusBarStyle = {
      barStyle: 'light-content',
      backgroundColor: 'black',
    }
  } else {
    statusBarStyle = {
      barStyle: isDrawerOpened || isAuthRoute  ? 'light-content' : 'dark-content',
      backgroundColor: isDrawerOpened || isAuthRoute  ? 'black' : 'white',
    }
  }

  return {
    ...statusBarStyle,
  };
};


export default connect(mapStateToProps)(StatusBar);
