import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors, FontSizes, biggerThenIphone6Width } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    color: Colors.white,
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.titleSize,
    fontFamily: Fonts.light,
    backgroundColor: 'transparent',
    marginBottom: biggerThenIphone6Width ? 25 : 15,
  },
  icon: {
    color: Colors.white,
    fontSize: biggerThenIphone6Width ? 100 : 80,
    marginBottom: biggerThenIphone6Width ? 25 : 15,
  },
  description: {
    color: Colors.white,
    lineHeight: biggerThenIphone6Width ? 28 : 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    height: biggerThenIphone6Width ? 130 : 105,
    justifyContent: 'flex-end',
  },
  understandButton: {
    backgroundColor: Colors.green,
  }
})