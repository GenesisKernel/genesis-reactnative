import { StyleSheet, Dimensions } from 'react-native';
import { Colors, borderRadius, FontSizes, Fonts, scrollableContainerHeight } from 'components/ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();

export default StyleSheet.create({
  scrollContainer: {
    padding: 0,
    overflow: 'hidden'
  },
  container: {
    height: height - statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titlesBlock: {},
  title: {
    fontSize: FontSizes.titleSize,
    fontFamily: Fonts.light,
    textAlign: 'center',
    marginBottom: 15,
  },
  secondaryTitle: {
    fontSize: FontSizes.mediumCommonSize,
    textAlign: 'center',
    lineHeight: 22
  },
  formContainer: {
    backgroundColor: Colors.white,
    width: 320,
    height: 300,
    padding: 15,
    borderRadius: borderRadius,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
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