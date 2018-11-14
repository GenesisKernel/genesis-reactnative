import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes, accountRowHeight } from '../ui/theme';

export const mainRightButton = {
  borderRadius: 0,
  height: accountRowHeight,
  borderLeftWidth: 4,
  padding: 10,
};

export const mainRightButtonContainer = {
  height: accountRowHeight - 20, // marginVertical*2
  marginVertical: 10
}

export const mainRightButtonText = {
  fontSize: FontSizes.smallCommonSize,
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  scrollView: {},
  loginAs: {
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
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
  rightButtonsContainer: {
    height: accountRowHeight,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0, .1)',
    flexWrap: 'wrap',
  },
  removeButton: {
    backgroundColor: '#f05050',
    width: 40,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  rowContainer: {
    height: accountRowHeight,
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  isFirst: {
    borderTopWidth: 1,
    borderTopColor: Colors.green,
    borderLeftWidth: 1,
    borderLeftColor: Colors.green,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green,
  },
  isLast: {
    borderTopWidth: 1,
    borderTopColor: Colors.green,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green,
    borderLeftWidth: 1,
    borderLeftColor: Colors.green,
  },
  regular: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.green,
    left: 10,
  },
  decorStick: {
    backgroundColor: Colors.green,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    height: accountRowHeight,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  firstRow: {
    height: '70%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  titleSubTitleContainer: {
    paddingLeft: 20,
  },
  secondRow: {
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rowTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: FontSizes.smallCommonSize,
    color: Colors.white,
  },
  subTitle: {
    fontSize: FontSizes.commonSize,
    color: Colors.white,
  },
  secondTitle: {
    fontSize: FontSizes.smallCommonSize,
    color: Colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 180,
    marginRight: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  notificationCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: Colors.green,
    borderRadius: 180,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 123,
    top: -4,
    right: -4,
  },
  notificationText: {
    paddingLeft: 1,

    color: Colors.white,
    fontSize: FontSizes.smallCommonSize,
  },
  createButtonTouchable: {
    position: 'relative',
  },
  createButtonContainer: {
    height: accountRowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  createButtonText: {
    color: Colors.white,
    marginRight: 15,
  },
  createIconStyle: {
  }
});
