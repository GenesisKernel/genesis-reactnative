import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header } from 'react-navigation';
import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window');

const statusBarHeight = getStatusBarHeight();
const headerHeight = Header.HEIGHT;

export const Fonts = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  thin: 'Lato-Thin',
  light: 'Lato-Light',
};

export const borderRadius = 12;
export const buttonsBorderRadius = 8;
export const scrollableContainerHeight = Platform.OS === 'android' ? height - headerHeight - statusBarHeight - 30 : height - headerHeight - 30; // using on auth screens (SignIn, SignUp etc.), -30 beacuse padding top of each Auth scren = 30

export const FontSizes = {
  smallCommonSize: 14,
  mediumCommonSize: 16,
  commonSize: 18,
  titleSize: 32,
  smallTitleSize: 28,
  modalTitleSize: 26,
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
  underlayVioletLessOpacity: 'rgba(83, 43, 131, .45)'
};

export const cancelButton = {
  backgroundColor: 'transparent',
  borderColor: '#fff',
  borderWidth: 1,
  width: '100%',
  marginTop: 0,
}