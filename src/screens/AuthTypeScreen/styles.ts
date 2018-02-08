import { StyleSheet } from 'react-native';
import { Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 40,
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  icon: {
    color: '#fff',
    marginBottom: 20,
  },
  descr: {
    color: Colors.white,
    fontSize: FontSizes.commonSize,
    lineHeight: 30,
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
