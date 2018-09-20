import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

export default StyleSheet.create({
  container: { flex: 1 },
  listItem: {
    borderBottomColor: '#e5e5e5',
  },
  listItemText: {
    color: '#6c6c6c',
  },
  fotter: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
});
