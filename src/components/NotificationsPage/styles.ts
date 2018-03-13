import { StyleSheet, Dimensions, DeviceInfo } from 'react-native';
import { Header } from 'react-navigation';
const { width, height } = Dimensions.get('window');

const headerHeight = Header.HEIGHT;
const isIphoneX = DeviceInfo.isIPhoneX_deprecated;
const top = isIphoneX ? headerHeight + 25 : headerHeight;
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    position: 'relative',
    top: top,
  },
});