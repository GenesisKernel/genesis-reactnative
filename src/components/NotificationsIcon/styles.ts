import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    width: 40,
    // paddingRight: 10,
    // paddingLeft: 22
  },
  counter: {
    width: 25,
    height: 15,
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 6,
    top: -6,
    right: -5,
    zIndex: 10,
    overflow: 'hidden',
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  animationContainer: {
    zIndex: 123,
  },
});