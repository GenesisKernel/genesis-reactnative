import { StyleSheet } from 'react-native';

import { Colors, FontSizes } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingTop: 20
  },
  insetContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  profile: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: Colors.blue,
  },
  accountAdress: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  accountAdressText: {
    color: '#fff',
    textAlignVertical: 'center'
  },
  menu: {
    flex: 1,
    backgroundColor: '#fff'
  },
  accountList: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  bottomActions: {
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  logoutButton: {
    padding: 0,
    flex: 0,
    margin: 0,
    minWidth: 100,
    marginVertical: 0
  },
  switcher: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  switcherButtonWrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 7.5,
  },
  switcherButtonTitle: {
    fontSize: FontSizes.smallCommonSize,
    color: Colors.white,
    marginBottom: 5,
  },
  decorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.green,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
