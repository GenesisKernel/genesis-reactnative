import { StyleSheet, Dimensions } from 'react-native';
import { Colors, borderRadius, FontSizes, Fonts } from 'components/ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: 320,
  },
  container: {
    height: 400,
  },
  titlesBlock: {
    paddingBottom: 20,
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.modalTitleSize,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  secondaryTitle: {
    fontSize: FontSizes.mediumCommonSize,
    textAlign: 'center',
  },
  formContainer: {
    // flex: 1,
    backgroundColor: Colors.white,
    width: 320,
    height: 350,
    // height: height - statusBarHeight - 120,
    padding: 15,
    borderRadius: borderRadius,
    position: 'relative',
    top: ((height - statusBarHeight - 120) / 2) - (350 / 2)
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#DFDFDF',
  },
  button: {
    width: (320 - 30 - 15) /2,
    backgroundColor: Colors.violet,
  },
  leftButton: {
    backgroundColor: Colors.green,
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    color: Colors.dark,
    height: 50,
  }
});