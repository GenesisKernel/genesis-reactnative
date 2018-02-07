import { StyleSheet } from 'react-native';
import { Fonts, Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 40,
    maxHeight: 520,
    minHeight: 600,
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
    fontFamily: Fonts.regular,
    backgroundColor: 'transparent',
    marginTop: 40,
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
  },
  understandButton: {
    backgroundColor: Colors.green,
  }
})