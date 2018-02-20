import { StyleSheet, Dimensions } from 'react-native';
import { Colors, borderRadius, FontSizes, Fonts } from 'components/ui/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();


export default StyleSheet.create({
  container: {
    flex: 1,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    width: 320,
    maxHeight: height - statusBarHeight - 120,
    padding: 15,
    borderRadius: borderRadius,
  },
  titlesContainer: {},
  scrollView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.lightGrey,
    borderBottomColor: Colors.lightGrey,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: FontSizes.titleSize,
    fontFamily: Fonts.light,
    textAlign: 'center',
    marginBottom: 15,
  },
  secondaryTitle: {
    textAlign: 'center',
    fontSize: FontSizes.mediumCommonSize,
    lineHeight: 22
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: (320 - 30 - 15) /2,
    backgroundColor: Colors.violet,
  },
  leftButton: {
    backgroundColor: Colors.green,
    marginRight: 15,
  },
  row: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    minHeight: 140,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  firstItem: {
    borderTopColor: 'transparent',
    borderTopWidth: 0,
  },
  rowLeftPart: {
    width: '60%',
  },
  rowRightPart: {
   width: '40%'
  },
  rowTitle: {
    fontFamily: Fonts.bold,
    marginBottom: 15,
  },
  rowDescr: {
    fontSize: FontSizes.smallCommonSize,
    lineHeight: 22
  },
  rowDescrRight: {
    textAlign: 'center',
  },
  rowTitleRight: {
    textAlign: 'center',
  },
  rowDescrLeft: {
    paddingRight: 5,
  },
  rowTitleLeft: {

  }
});