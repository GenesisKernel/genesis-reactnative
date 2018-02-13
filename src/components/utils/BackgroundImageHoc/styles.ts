import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
const { width, height } = Dimensions.get('window');
const headerHeight = Header.HEIGHT;

export default StyleSheet.create({
  bgImage: {
    position: 'absolute',
    top: -headerHeight,
    left: 0,
    right: 0,
    bottom: 0,
    height: height + headerHeight
  }
});