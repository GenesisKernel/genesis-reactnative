import { StyleSheet, Dimensions, DeviceInfo } from 'react-native';
import { Header } from 'react-navigation';
const { width, height } = Dimensions.get('window');

const headerHeight = Header.HEIGHT;
const isIphoneX = DeviceInfo.isIPhoneX_deprecated;
const top = isIphoneX ? headerHeight + 25 : headerHeight;

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -(top),
    left: 0,
    right: 0,
    bottom: 0,
    height: height + top,
    backgroundColor: 'rgba(0,0,0, .47)',
    zIndex: 20,
  },
  bgImage: {
    position: 'absolute',
    top: -(top),
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    width: '100%',
  }
});