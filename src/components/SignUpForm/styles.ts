import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  textInput: {
    height: 200
  },
  input: {
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontFamily: Fonts.bold,
    paddingLeft: 10,
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
  },
  cancelButtonText: {
    color: Colors.white,
    width: '100%',
    textAlign: 'center',
  },
});
