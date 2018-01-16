import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../theme';

export default StyleSheet.create({
  containerView: {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    marginVertical: 10,
    justifyContent: 'center'
  },
  button: {
    height: 50,
    backgroundColor: Colors.blue,
    borderRadius: 26,
  },
  text: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    color: Colors.white,
  }
});
