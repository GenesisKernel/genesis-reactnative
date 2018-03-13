import { StyleSheet } from 'react-native';
import { FontSizes, Colors } from 'components/ui/theme';
import { rightButtonWidth } from 'components/AccountList/styles';

export default StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'flex-start',
    backgroundColor: Colors.underlayGreenLessOpacity,
  },
  logoutButton: {
    borderRadius: 0,
    width: rightButtonWidth,
    height: 70,
    // backgroundColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
    backgroundColor: Colors.underlayGreenLessOpacity,
  },
  buttonText: {
    fontSize: FontSizes.mediumCommonSize,
  },
});