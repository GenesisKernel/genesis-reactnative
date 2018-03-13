import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { scrollableContainerHeight } from 'components/ui/theme';

const statusBarHeight = getStatusBarHeight();
export default StyleSheet.create({
  container: {
    height: scrollableContainerHeight + 30 + statusBarHeight, // dont ask why..
  }
})