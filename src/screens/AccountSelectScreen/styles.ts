import { StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts, authScreenPadding, biggerThenIphone6Width } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: authScreenPadding,
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    flexDirection: 'column',
    paddingHorizontal: authScreenPadding,
    height: biggerThenIphone6Width ? 130 : 105,
  },
  createButton: {
    backgroundColor: Colors.green
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.smallTitleSize,
    fontFamily: Fonts.light,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.smallCommonSize,
    marginTop: biggerThenIphone6Width ? 15 : 10,
    marginBottom: biggerThenIphone6Width ? 40 : 20,
    paddingHorizontal: 10,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.white,
  }
});
