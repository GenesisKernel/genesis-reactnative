import { StyleSheet } from 'react-native';
import { Colors, FontSizes } from 'components/ui/theme';
import { mainRightButton } from 'components/AccountList/styles';

export default StyleSheet.create({
  button: {
    ...mainRightButton,
    borderLeftColor: Colors.dangerRed,
    backgroundColor: Colors.underlayRedLessOpacity,
  },
  buttonText: {
    fontSize: FontSizes.mediumCommonSize,
  }
});