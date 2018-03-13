import { StyleSheet } from 'react-native';
import { Colors, FontSizes } from 'components/ui/theme';
import { rightButtonWidth } from 'components/AccountList/styles';

export default StyleSheet.create({
  button: {
    borderRadius: 0,
    width: rightButtonWidth,
    height: 70,
    // backgroundColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: Colors.dangerRed,
    backgroundColor: Colors.underlayRedLessOpacity,
  },
  buttonText: {
    fontSize: FontSizes.mediumCommonSize,
  }
});