import { StyleSheet, Dimensions } from 'react-native';

import { Colors, borderRadius, FontSizes } from 'components/ui/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  flatList: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  rowContainer: {
    maxWidth: 420,
    height: 150,
    marginBottom: 20,
  },
  item: {
    width: (width / 2) - 30,
    maxWidth: 200,
    height: 150,
    backgroundColor: '#fefefe',
    borderRadius: borderRadius,
    shadowColor: '#2f303a',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    elevation: 2,
  },
  oddItem: {
    marginRight: 20,
  },
  itemContent: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#f6f6f6',
    borderBottomWidth: 1,
  },
  itemText: {
    color: Colors.dark,
    fontSize: FontSizes.mediumCommonSize,
    paddingHorizontal: 10,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderColor: 'transparent',
    borderBottomWidth: 0
  },
  itemDecorLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    width: '100%',
    backgroundColor: Colors.green,
  }
});
