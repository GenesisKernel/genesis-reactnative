import { StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts, authScreenPadding } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: authScreenPadding,
  },
  title: {
    fontWeight: 'bold',
    fontSize: FontSizes.commonSize,
    marginBottom: 15,
    color: Colors.white,
  },
  descr: {
    fontSize: FontSizes.mediumCommonSize,
    marginBottom: 10,
    color: Colors.white,
  }
});
