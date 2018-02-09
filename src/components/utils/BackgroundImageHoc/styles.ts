import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
const { width, height } = Dimensions.get('window');
const headerHeight = Header.HEIGHT;

export default StyleSheet.create({
  bgImage: {
    position: 'absolute',
    top: -headerHeight,
    left: 0,
    width: '100%',
    height: height + headerHeight,
  }
});