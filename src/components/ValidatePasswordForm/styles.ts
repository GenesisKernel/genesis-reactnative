import { StyleSheet } from 'react-native';
import { Colors } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    maxWidth: 270,
    backgroundColor: Colors.white,
  },
  input: {
    backgroundColor: 'red',
  }
});