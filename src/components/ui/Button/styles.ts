import { StyleSheet } from 'react-native';
import { Fonts, Colors, borderRadius, buttonsBorderRadius, FontSizes, biggerThenIphone6Width } from '../theme';

const buttonHeight = biggerThenIphone6Width ? 50 : 45;
export default StyleSheet.create({
  containerView: {
    height: buttonHeight,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    marginVertical: biggerThenIphone6Width ? 10 : 5,
    justifyContent: 'center'
  },
  button: {
    height: buttonHeight,
    backgroundColor: Colors.blue,
    borderRadius: buttonsBorderRadius,
  },
  text: {
    fontSize: FontSizes.commonSize,
    fontFamily: Fonts.regular,
    color: Colors.white,
  }
});
