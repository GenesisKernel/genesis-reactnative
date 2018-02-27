import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes, borderRadius } from '../theme';

export default StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255, .15)',
    fontSize: FontSizes.mediumCommonSize,
    fontFamily: Fonts.regular,
    borderWidth: 0,
    borderRadius: borderRadius,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginBottom: 20,
    color: '#fff',
  },
  multiline: {
    textAlignVertical: 'top'
  },
  container: {
    flex: 1,
  },
  rightIcon: {
    paddingRight: 45,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: -53,
  },
  inputLabel: {
    fontFamily: Fonts.light,
    // fontSize: FontSizes.smallCommonSize,
    paddingLeft: 15,
    marginBottom: 5,
    fontSize: FontSizes.mediumCommonSize,
    color: Colors.white,
  },
});
