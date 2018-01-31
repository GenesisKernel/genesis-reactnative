import { Easing, Animated } from 'react-native';
import {
  StackNavigator,
  StackNavigatorConfig,
  NavigationStackScreenOptions
} from 'react-navigation';

import { Colors, Fonts } from 'components/ui/theme';
import LandingScreen from 'screens/LandingScreen';
import HomeScreen from 'screens/HomeScreen';
import PageScreen from 'screens/PageScreen';
import SubMenuScreen from 'screens/SubMenuScreen';
import ScannerScreen from 'screens/ScannerScreen';
import KeyScreen from 'screens/KeyScreen';
import AuthTypeScreen from 'screens/AuthTypeScreen';
import AuthSuccessfulScreen from 'screens/AuthSuccessfulScreen';
import ImportAccountScreen from 'screens/ImportAccountScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SignUpConfirmScreen from 'screens/SignUpConfirmScreen';
import AccountSelectScreen from 'screens/AccountSelectScreen';
import TransactionsScreen from 'screens/TransactionsScreen';
import NotificationsScreen from 'screens/NotificationsScreen';

enum NAV {
  AUTH = 'AUTH',
  MAIN = 'MAIN'
}

export const navTypes = {
  AUTH: `${NAV.AUTH}/HOME`,
  SCANNER: `${NAV.AUTH}/SCANNER`,
  SIGN_IN: `${NAV.AUTH}/SIGN_IN`,
  IMPORT_ACCOUNT: `${NAV.AUTH}/IMPORT_ACCOUNT`,
  SIGN_UP_CONFIRM: `${NAV.AUTH}/SIGN_UP_CONFIRM`,
  SIGN_UP: `${NAV.AUTH}/SIGN_UP`,
  AUTH_SUCCESSFUL: `${NAV.AUTH}/AUTH_SUCCESSFUL`,
  ACCOUNT_SELECT: `${NAV.AUTH}/ACCOUNT_SELECT`,
  HOME: `${NAV.MAIN}/HOME`,
  SUB_MENU: `${NAV.MAIN}/SUB_MENU`,
  PAGE: `${NAV.MAIN}/PAGE`,
  KEY: `${NAV.MAIN}/KEY`,
  TRANSACTIONS: `${NAV.MAIN}/TRANSACTIONS`,
  LANDING: `LANDING`,
  NOTIFICATIONS: `${NAV.MAIN}/NOTIFICATIONS`,
};

export default StackNavigator(
  {
    [navTypes.AUTH]: { screen: AuthTypeScreen },
    [navTypes.AUTH_SUCCESSFUL]: { screen: AuthSuccessfulScreen },
    [navTypes.SCANNER]: { screen: ScannerScreen },
    [navTypes.SIGN_IN]: { screen: SignInScreen },
    [navTypes.IMPORT_ACCOUNT]: { screen: ImportAccountScreen },
    [navTypes.SIGN_UP]: { screen: SignUpScreen },
    [navTypes.SIGN_UP_CONFIRM]: { screen: SignUpConfirmScreen },
    [navTypes.ACCOUNT_SELECT]: { screen: AccountSelectScreen },
    [navTypes.HOME]: { screen: HomeScreen },
    [navTypes.PAGE]: { screen: PageScreen },
    [navTypes.SUB_MENU]: { screen: SubMenuScreen },
    [navTypes.KEY]: { screen: KeyScreen },
    [navTypes.LANDING]: { screen: LandingScreen },
    [navTypes.TRANSACTIONS]: { screen: TransactionsScreen },
    [navTypes.NOTIFICATIONS]: { screen: NotificationsScreen },
  },
  {
    initialRouteName: navTypes.LANDING,
    navigationOptions({ navigation }) {
      const isAuthRoute = navigation.state.routeName.indexOf(NAV.AUTH) !== -1;

      const backgroundColor = isAuthRoute ? '#fff' : '#39393f';
      const headerTintColor = isAuthRoute ? '#000' : '#fff';
      const headerTitleColor = isAuthRoute ? '#000' : '#fff';

      return {
        headerTintColor,
        headerStyle: {
          backgroundColor,
          borderBottomWidth: 0,
          elevation: undefined
        },
        headerTitleStyle: {
          color: headerTitleColor,
          fontFamily: Fonts.bold,
          fontSize: 20
        },
        headerBackTitle: null
      };
    }
  }
);
