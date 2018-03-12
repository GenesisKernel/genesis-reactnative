import { StyleSheet } from 'react-native';
import { Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, .4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertForm: {
    maxWidth: 320,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    color: Colors.dark,
    fontSize: FontSizes.modalTitleSize - 4,
    textAlign: 'center',
    marginBottom: 15,
  },
  iconDescrContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  androidAlertFingerprintIcon: {
    marginRight: 15,
  },
  descrContainer: {
    flex: 1,
  },
  descr: {
    fontSize: FontSizes.mediumCommonSize,
  },
  cancelAuthContainer: {

  },
  cancelAuthText: {
    textAlign: 'right',
    color: Colors.green,
    fontWeight: 'bold'
  }
});