import { StyleSheet } from 'react-native';
import { Colors, FontSizes, biggerThenIphone6Width, authScreenPadding } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: authScreenPadding,
    paddingTop: 40,
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    marginTop: biggerThenIphone6Width ? 50 : 30,
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
  bottomButtonsContainer: {
    height: biggerThenIphone6Width ? 130 : 105,
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
