import { StyleSheet } from 'react-native';
import { Colors, FontSizes } from 'components/ui/theme';
import { mainRightButton, mainRightButtonContainer, mainRightButtonText } from 'components/AccountList/styles';

export default StyleSheet.create({
  button: {
    ...mainRightButton,
    borderLeftColor: Colors.dangerRed,
    backgroundColor: Colors.underlayRedLessOpacity,
  },
  buttonText: {
    ...mainRightButtonText,
  },
  buttonContainer: {
    ...mainRightButtonContainer
  }
});