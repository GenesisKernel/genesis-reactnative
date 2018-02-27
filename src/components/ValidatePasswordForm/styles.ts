import { StyleSheet, Dimensions } from 'react-native';
import { Colors, borderRadius, FontSizes, Fonts, scrollableContainerHeight } from 'components/ui/theme';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: 320,
  },
  container: {
    height: 400,
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
    position: 'relative',
    top: (scrollableContainerHeight / 2) - (300 / 2)
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