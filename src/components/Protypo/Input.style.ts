import { StyleSheet } from 'react-native';

const ERROR_COLOR = '#f05050';

const styles = StyleSheet.create({
  container: {
    minWidth: 175,
  },
  input: {
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 40,
    borderColor: '#cfdbe2'
  },
  invalid: {
    borderColor: ERROR_COLOR
  },
  errorText: {
    marginTop: 5,
    color: ERROR_COLOR
  }
});

export default styles;
