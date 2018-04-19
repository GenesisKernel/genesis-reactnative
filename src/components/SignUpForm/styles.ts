import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors, scrollableContainerHeight, biggerThenIphone6Width } from '../../components/ui/theme'

export default StyleSheet.create({
  container: {
    height: scrollableContainerHeight,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  firstContainer: {
    marginTop: 15,
  },
  textInput: {
    height: 200
  },
  input: {
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  invalidInput: {
    backgroundColor: Colors.underlayRedLessOpacity,
  },
  inputLabel: {
    fontFamily: Fonts.bold,
    paddingLeft: 10,
    fontSize: 14,
  },
  bottomButtonsContainer: {
    height: biggerThenIphone6Width ? 130 : 105,
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
