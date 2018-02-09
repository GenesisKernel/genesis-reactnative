import { StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 30,
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
    marginTop: 15,
    marginBottom: 40,
    paddingHorizontal: 10,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.white,
  }
});
