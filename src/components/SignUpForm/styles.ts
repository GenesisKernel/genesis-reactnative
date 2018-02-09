import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors } from '../../components/ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default StyleSheet.create({
  container: {
    height: height - statusBarHeight - 120, // container`s padding *2
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 200
  },
  input: {
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
  },
  cancelButtonText: {
    color: Colors.white,
    width: '100%',
    textAlign: 'center',
  },
});
