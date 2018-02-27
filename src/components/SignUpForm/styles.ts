import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors, scrollableContainerHeight } from '../../components/ui/theme'

export default StyleSheet.create({
  container: {
    height: scrollableContainerHeight,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
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
