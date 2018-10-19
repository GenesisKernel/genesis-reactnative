import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from 'components/ui/theme';

interface IStyle {
  container: StyleProp<ViewStyle>;
}

const styles: IStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;
