import { StyleSheet } from 'react-native';
import { FontSizes, Colors } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(62, 188, 154, .45)',
  },
  logoutButton: {
    borderRadius: 0,
    width: 200,
    height: 70,
    backgroundColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
  }
});