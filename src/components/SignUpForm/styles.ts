import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textInput: {
    height: 200
  },
  inputLabel: {
    fontFamily: Fonts.bold,
    paddingLeft: 10,
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    width: '100%',
  },
  cancelButtonText: {
    color: Colors.dark,
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },
});
