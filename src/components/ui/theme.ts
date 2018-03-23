import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, DeviceInfo } from 'react-navigation';
import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window');

const statusBarHeight = getStatusBarHeight();
const headerHeight = Header.HEIGHT;
const isIphoneX = height === 812; // find better solution

export const Fonts = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  thin: 'Lato-Thin',
  light: 'Lato-Light',
};

export const biggerThenIphone6Width = width >= 326;
export const borderRadius = 12;
export const buttonsBorderRadius = 8;
export const authScreenPadding = biggerThenIphone6Width ? 30 : 20;
// export const homeScreenPadding = biggerThenIphone6Width ? 20 : 10;
export const openDrawerOffset = 0.12;


export const scrollableContainerHeight = Platform.OS === 'android' ? height - headerHeight - statusBarHeight - authScreenPadding : (height - headerHeight - authScreenPadding) - (isIphoneX ? 34 : 0); // using on auth screens (SignIn, SignUp etc.);

export const FontSizes = {
  smallCommonSize: biggerThenIphone6Width ? 14 : 12,
  mediumCommonSize: biggerThenIphone6Width ? 16 : 14,
  commonSize: biggerThenIphone6Width ? 18 : 16,
  titleSize: biggerThenIphone6Width ? 32 : 26,
  smallTitleSize: biggerThenIphone6Width ? 28 : 24,
  modalTitleSize: biggerThenIphone6Width ? 26 : 22,
};

export const Colors = {
  blue: '#4d3ebc',
  green: '#3AC28B',
  dark: '#1C1A1A',
  white: '#fff',
  violet: '#532B83',
  dangerRed: '#FA3356',
  lightGrey: '#DFDFDF',
  grey: '#717171',

  underlayGreen: 'rgba(58, 194, 139, .15)',
  underlayRed: 'rgba(250, 51, 86, .15)',
  underlayRedLessOpacity: 'rgba(250, 51, 86, .45)',
  underlayGreenLessOpacity: 'rgba(58, 194, 139, .45)',
  underlayVioletLessOpacity: 'rgba(83, 43, 131, .45)',
  underlayBlueLessOpacity: 'rgba(77, 62, 188, .45)'
};

export const cancelButton = {
  backgroundColor: 'transparent',
  borderColor: '#fff',
  borderWidth: 1,
  width: '100%',
  marginTop: 0,
}