import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from 'components/ui/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    width: width / 3,
    padding: 10,
    paddingTop: 15,
    alignItems: 'center'
  },
  iconWrapper: {
    backgroundColor: Colors.blue,
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  icon: {
    color: '#3f3f4a',
    fontSize: 16
  },
  listItemText: {
    color: '#6c6c6c'
  }
});
