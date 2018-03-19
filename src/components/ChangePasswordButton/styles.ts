import { StyleSheet } from 'react-native';
import { Colors } from 'components/ui/theme';
import { mainRightButton, mainRightButtonText, mainRightButtonContainer } from 'components/AccountList/styles';

export default StyleSheet.create({
  button: {
    ...mainRightButton,
    borderLeftColor: Colors.violet,
    backgroundColor: Colors.underlayVioletLessOpacity,
  },
  buttonText: {
    ...mainRightButtonText,
    textAlign: 'center',
  },
  buttonContainer: {
    ...mainRightButtonContainer
  }
});