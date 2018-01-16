import { StyleSheet } from 'react-native';
import { Colors } from '../ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    marginBottom: 10,
  },
  scrollView: {},
  loginAs: {
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 7,
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
    backgroundColor: Colors.blue,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTextContainer: {
    flex: 1,
    paddingRight: 5,
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
