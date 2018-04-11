import { StyleSheet } from 'react-native';
import { Colors, authScreenPadding, biggerThenIphone6Width } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  createButton: {
    backgroundColor: Colors.green
  },
});