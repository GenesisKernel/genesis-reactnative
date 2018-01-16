import { StyleSheet } from 'react-native';
import { Colors } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  descr: {
    marginBottom: 55,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.blue,
  },
  createButton: {
    width: '100%',
    backgroundColor: Colors.green,
  },
  buttonText: {
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    width: '100%',
  },
  cancelButtonText: {
    color: Colors.dark,
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  }
});
