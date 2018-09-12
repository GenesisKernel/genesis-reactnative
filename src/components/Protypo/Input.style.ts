import { StyleSheet } from 'react-native';
import { FontSizes, Colors } from 'components/ui/theme';

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
  },
  filePicker: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
  },
  filePickerText: {
    fontWeight: 'bold',
    fontSize: FontSizes.mediumCommonSize,
    color: Colors.dark,
    textAlign: 'center',
  }
});

export default styles;
