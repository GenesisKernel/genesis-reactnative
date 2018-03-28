import { StyleSheet, Platform } from 'react-native';

import { Colors, FontSizes, isIphoneX } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingTop: 20
  },
  listContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' && isIphoneX ? 15 : Platform.OS === 'ios' && !isIphoneX ? 40 : 30,
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
    width: 130,
  },
  switcherButtonTitle: {
    fontSize: FontSizes.mediumCommonSize,
    color: Colors.white,
    marginBottom: 5,
    textAlign: 'center',
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
