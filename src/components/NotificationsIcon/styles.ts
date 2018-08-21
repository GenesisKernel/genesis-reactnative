import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    padding: 10,
    width: 40,
  },
  counter: {
    width: 25,
    height: 15,
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 6,
    top: -10,
    left: -15,
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
