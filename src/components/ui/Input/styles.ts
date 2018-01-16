import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../theme';

export default StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.dark,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 21,
    padding: 10,
    paddingLeft: 15,
    marginVertical: 5,
    marginBottom: 20,
  },
  multiline: {
    textAlignVertical: 'top'
  },
  container: {
    flex: 1,
  },
  rightIcon: {
    paddingRight: 45,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: -53,
  },
  inputLabel: {
    fontFamily: Fonts.bold,
    paddingLeft: 15,
    fontSize: 14,
  },
});
