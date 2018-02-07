import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from '../ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    marginBottom: 10,
  },
  scrollView: {},
  loginAs: {
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    // paddingLeft: 7,
  },
  buttonContainerStyle: {
    marginVertical: 5,
  },
  buttonStyle: {
    justifyContent: 'flex-start',
  },
  buttonTextStyle: {
    flex: 1,
    paddingLeft: 5,
    textAlign: 'right'
  },
  removeButton: {
    backgroundColor: '#f05050',
    width: 40,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  rowContainer: {
    height: 70,
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  decorStick: {
    backgroundColor: Colors.green,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    height: 70,
    borderRadius: 3,
  },
  rowTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.white,
  },
});
