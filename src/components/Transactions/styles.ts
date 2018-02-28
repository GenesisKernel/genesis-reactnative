import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {},
  listItem: {
    borderBottomColor: '#e5e5e5'
  },
  listItemText: {
    color: '#6c6c6c'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  rowText: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.commonSize,
    marginBottom: 5,
  },
  subtitle: {
    color: Colors.white,
    fontSize: FontSizes.smallCommonSize,
  }
});
