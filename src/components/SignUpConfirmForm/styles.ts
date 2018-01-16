import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomActions: {},
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
  },
  textInput: {
    height: 150
  },
  popupContainer: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: Colors.dangerRed,
    borderRadius: 14,
    maxHeight: 520,
    minHeight: 520,
  },
  popupTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    color: Colors.white,
    fontSize: 200,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  popupButton: {
    backgroundColor: '#fff',
  },
  popupButtonText: {
    color: Colors.dangerRed,
  }
});
