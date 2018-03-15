import { StyleSheet } from 'react-native';
import { scrollableContainerHeight, cancelButton } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    height: scrollableContainerHeight,
  },
  cancelButton: {
    ...cancelButton,
  }
});
