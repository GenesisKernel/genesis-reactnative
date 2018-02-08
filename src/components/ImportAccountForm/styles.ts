import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors, cancelButton } from '../../components/ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default StyleSheet.create({
  container: {
    height: height - statusBarHeight - 120, // container`s padding *2
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  firstContainer: {
    // marginBottom: 80,
  },
  textInput: {
    height: 140
  },
  passwordInput: {
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontFamily: Fonts.bold,
    paddingLeft: 10,
    fontSize: 14,
  },
  cancelButton: {
    ...cancelButton,
  },
  nextButton: {
    backgroundColor: Colors.green,
  }
});
