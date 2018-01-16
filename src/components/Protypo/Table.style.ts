import { StyleSheet } from 'react-native';

const ERROR_COLOR = '#f05050';

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: '#f6f6f6',
    borderBottomColor: '#eee'
  },
  rowHead: {
    backgroundColor: '#fff'
  },
  rowLabel: {
    flex: 0.5,
    padding: 5,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee'
  },
  rowValue: {
    flex: 1,
    padding: 5,
    paddingVertical: 10
  }
});

export default styles;
