import {
  StackNavigator,
} from 'react-navigation';
import { navTypes, NAV } from './constants';

import { Colors, Fonts, FontSizes } from 'components/ui/theme';
import BackgroundImageHoc from 'components/utils/BackgroundImageHoc';

import LandingScreen from 'screens/LandingScreen';
import HomeScreenContainer from './containers/HomePageContainer';
import PageScreen from 'screens/PageScreen';
import SubMenuScreen from 'screens/SubMenuScreen';
import ScannerScreen from 'screens/ScannerScreen';
import AuthTypeScreen from 'screens/AuthTypeScreen';
import AuthSuccessfulScreen from 'screens/AuthSuccessfulScreen';
import ImportAccountScreen from 'screens/ImportAccountScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SignUpConfirmScreen from 'screens/SignUpConfirmScreen';
import SignUpWarningScreen from 'screens/SignUpWarningScreen';
import AccountSelectScreen from 'screens/AccountSelectScreen';

import DrawerButtonContainer from 'containers/DrawerButtonContainer';

export default StackNavigator(
  {
    [navTypes.AUTH]: { screen: BackgroundImageHoc(AuthTypeScreen) },
    [navTypes.AUTH_SUCCESSFUL]: { screen: BackgroundImageHoc(AuthSuccessfulScreen) },
    [navTypes.SCANNER]: { screen: ScannerScreen },
    [navTypes.SIGN_IN]: { screen: BackgroundImageHoc(SignInScreen) },
    [navTypes.IMPORT_ACCOUNT]: { screen: BackgroundImageHoc(ImportAccountScreen) },
    [navTypes.SIGN_UP]: { screen: BackgroundImageHoc(SignUpScreen) },
    [navTypes.SIGN_UP_CONFIRM]: { screen: BackgroundImageHoc(SignUpConfirmScreen) },
    [navTypes.SIGN_UP_WARNING]: { screen: BackgroundImageHoc(SignUpWarningScreen) },
    [navTypes.ACCOUNT_SELECT]: { screen: BackgroundImageHoc(AccountSelectScreen) },
    [navTypes.HOME]: { screen: BackgroundImageHoc(HomeScreenContainer, 'green') },
    [navTypes.PAGE]: { screen: BackgroundImageHoc(PageScreen, 'green') },
    [navTypes.SUB_MENU]: { screen: BackgroundImageHoc(SubMenuScreen, 'green') },
    [navTypes.LANDING]: { screen: LandingScreen },
  },
  {
    initialRouteName: navTypes.LANDING,
    cardStyle: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent'
    },
    transitionConfig: (): Object => ({
      containerStyle: {
        backgroundColor: 'transparent'
      },
    }),

    navigationOptions({ navigation }) {
      const isAuthRoute = navigation.state.routeName.indexOf(NAV.AUTH) !== -1;

      const backgroundColor = 'transparent';
      const headerTintColor = isAuthRoute ? '#fff' : Colors.dark;
      const headerTitleColor = isAuthRoute ? '#fff' : Colors.dark;

      return {
        headerTintColor,
        headerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          elevation: undefined,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: headerTitleColor,
          fontWeight: `${300}`,
          fontFamily: Fonts.light,
          fontSize: FontSizes.commonSize,
        },
        headerBackTitle: null,
      };
    }
  }
);
