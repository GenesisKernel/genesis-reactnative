import { StyleSheet } from 'react-native';
import { Colors } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    flexDirection: 'column'
  },
  createButton: {
    backgroundColor: Colors.green
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 60,
    paddingHorizontal: 10,
    textAlign: 'left'
  }
});
