import { StyleSheet } from 'react-native';
import { FontSizes, Colors } from 'components/ui/theme';
import { mainRightButton, mainRightButtonText } from 'components/AccountList/styles';

export default StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'flex-start',
    backgroundColor: Colors.underlayGreenLessOpacity,
  },
  logoutButton: {
    ...mainRightButton,
    borderLeftColor: Colors.green,
    backgroundColor: Colors.underlayGreenLessOpacity,
  },
  buttonText: {
    ...mainRightButtonText,
  },
});