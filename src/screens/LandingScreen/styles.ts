import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.smallTitleSize,
  },
});