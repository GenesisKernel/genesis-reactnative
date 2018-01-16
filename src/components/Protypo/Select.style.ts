import { StyleSheet } from 'react-native';

const ERROR_COLOR = '#f05050';

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderWidth: 1,
    borderColor: '#cfdbe2'
  },
  dropdownValueText: {
    fontSize: 14
  },
  dropdownModal: {
    minWidth: 200
  },
  dropdownModalValueText: {
    color: '#000',
    fontSize: 14
  },
  invalid: {
    borderColor: ERROR_COLOR
  },
  errorText: {
    marginTop: 10,
    color: ERROR_COLOR
  }
});

export default styles;
