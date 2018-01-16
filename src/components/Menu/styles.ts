import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

export default StyleSheet.create({
  container: {},
  listItem: {
    borderBottomColor: '#e5e5e5'
  },
  listItemText: {
    color: '#6c6c6c'
  }
});

export const backButtonLeftIconProps = {
  style: {
    marginRight: 0
  },
  size: 28,
  name: 'chevron-left'
};
