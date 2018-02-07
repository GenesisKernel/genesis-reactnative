import { StyleSheet } from 'react-native';
import { Fonts, Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 45,
    maxHeight: 520,
    // minHeight: 600,
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
    marginBottom: 25,
  },
  icon: {
    color: Colors.white,
    fontSize: 100,
    marginBottom: 25,
  },
  description: {
    color: Colors.white,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  understandButton: {
    marginTop: 30,
    backgroundColor: Colors.green,
  }
})