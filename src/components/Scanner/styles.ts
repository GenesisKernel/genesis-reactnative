import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from '../ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  qrFrameWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: 275,
    height: 275,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameBlock: {
    position: 'absolute',
    borderRadius: 3,
    backgroundColor: '#ff5858',
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
  vertical: {
    height: 15,
    width: 5,
  },
  horizontal: {
    width: 15,
    height: 5,
  },
  qrText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.commonSize
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    width: '100%',
  },
  cancelButtonText: {
    color: Colors.dark,
  },
  qrContainer: {
    padding: 30,
  }
});
