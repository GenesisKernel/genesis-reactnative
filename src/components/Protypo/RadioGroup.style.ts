import { StyleSheet } from 'react-native';

const ERROR_COLOR = '#f05050';

const styles = StyleSheet.create({
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioItemLabel: {
    marginLeft: 5
  },
  errorText: {
    marginTop: 5,
    color: ERROR_COLOR
  }
});

export default styles;
