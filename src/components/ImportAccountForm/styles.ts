import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors, cancelButton, scrollableContainerHeight, biggerThenIphone6Width } from '../../components/ui/theme';

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
    height: biggerThenIphone6Width ? 140 : 100,
  },
  passwordInput: {
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
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
    ...cancelButton,
  },
  nextButton: {
    backgroundColor: Colors.green,
  }
});
