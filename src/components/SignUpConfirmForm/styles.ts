import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, cancelButton } from '../ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default StyleSheet.create({
  container: {
    height: height - statusBarHeight - 120, // container`s padding *2
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  bottomActions: {},
  cancelButton: {
    ...cancelButton,
  },
  cancelButtonText: {
  },
  nextButton: {
    backgroundColor: Colors.green,
  },
  textInput: {
    height: 150
  },
  popupContainer: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: Colors.dangerRed,
    borderRadius: 14,
    maxHeight: 520,
    minHeight: 520,
  },
  popupTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    color: Colors.white,
    fontSize: 200,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  popupButton: {
    backgroundColor: '#fff',
  },
  popupButtonText: {
    color: Colors.dangerRed,
  }
});
