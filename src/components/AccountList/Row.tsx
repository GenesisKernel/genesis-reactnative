import * as React from 'react';
import { View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { IAccount } from 'modules/account/reducer';

import Swipeable from 'react-native-swipeable-row';

import { Colors, openDrawerOffset } from 'components/ui/theme';

import LogoutButtonContainer from 'containers/LogoutButtonContainer';
import RemoveAccountButtonContainer from 'containers/RemoveAccountButtonContainer';
import ChangePasswordButtonContainer from 'containers/ChangePasswordButtonContainer';

import Text from 'components/ui/Text';
import styles from './styles';

const { width } = Dimensions.get('window');

const avatarDefaultProps = {
  iconStyle: {
    color: '#fff'
  },
  type: 'font-awesome',
  name: 'user-circle'
};

export interface IRow {
  account: IAccount;
  address: string;
  title: string;
  ecosystemId: string;
  notificationsCount?: number;
  isLoggedAccount: boolean;
  isDrawerOpened: boolean;
  onPress(address: string, ecosystemId: string): void;
  onRemove(address: string): void;
  onDisableScroll(value: boolean): void;
}

class Row extends React.PureComponent<IRow> {

  state = {
    showDecor: 'fadeOut',
  }

  private swipeable = null;

  public render() {
    const { showDecor } = this.state;
    const { title, address, notificationsCount, isLoggedAccount, isDrawerOpened, account: { avatar } } = this.props;
    const rightButtonsContainerWidth = isDrawerOpened ? width - (width * openDrawerOffset) : width;

    return (
      <Swipeable
        onRef={(ref: any) => this.swipeable = ref}
        onSwipeStart={() => this.handleSwipe(false)}
        onSwipeRelease={() => this.handleSwipe(true)}
        rightButtons={this.getRightButtons(rightButtonsContainerWidth)}
        rightButtonWidth={rightButtonsContainerWidth}>
        <TouchableHighlight
          style={[styles.touchableContainer, isLoggedAccount ? { backgroundColor: Colors.underlayGreen } : {}]}
          onShowUnderlay={() => this.handlUnderlay('fadeIn')}
          onHideUnderlay={() => this.handlUnderlay('fadeOut')}
          activeOpacity={0.8}
          underlayColor={Colors.underlayGreen}
          onPress={this.handlePress}
        >
          <View>
            <AnimatableView
              animation={!isLoggedAccount ? showDecor : 'fadeIn'}
              easing="linear"
              duration={100}
              useNativeDriver
              iterationCount={1}
              style={styles.decorStick} />

            <View style={styles.rowContainer}>
              <View style={styles.avatar}>
                {notificationsCount && (
                  <View style={styles.notificationCircle}>
                    <Text style={styles.notificationText}>{notificationsCount.toString()}</Text>
                  </View>
                )}
                <View style={styles.avatarImageWrapper}>
                {!!avatar
                  ? (
                      <Image
                        resizeMode="cover"
                        style={styles.avatarImage}
                        source={{ uri: avatar }}
                      />
                    )
                  : ( <Icon size={40} {...avatarDefaultProps} /> )
                }
                </View>
              </View>
              <View style={styles.rowTextContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
                <Text numberOfLines={1} style={styles.subTitle}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }

  private getRightButtons = (rightButtonsContainerWidth: number): JSX.Element[] => {
    const { isLoggedAccount, isDrawerOpened, address, account, ecosystemId } = this.props;
    const buttonsCount = isLoggedAccount ? 3 : 2;
    const buttonWidth = rightButtonsContainerWidth / buttonsCount;

    const rightButtons = [
      <View style={styles.rightButtonsContainer}>
        {isLoggedAccount
          ? <LogoutButtonContainer
            recenter={this.handleRecenter}
            buttonWidth={buttonWidth} />
          : <ChangePasswordButtonContainer
            recenter={this.handleRecenter}
            buttonWidth={buttonWidth}
            account={{ ...account, ecosystemId }} />
        }

        <RemoveAccountButtonContainer
          recenter={this.handleRecenter}
          accountAddress={address}
          buttonWidth={buttonWidth} />

        {isLoggedAccount
          && (
            <ChangePasswordButtonContainer
              recenter={this.handleRecenter}
              buttonWidth={buttonWidth}
              account={{ ...account, ecosystemId }} />
          )
        }
      </View>
    ];
    return rightButtons;
  }

  private handleRecenter = () => {
    this.swipeable && this.swipeable.recenter();
  }

  private handleSwipe = (value: boolean): void => {
    this.props.onDisableScroll(value);
  }

  private handlUnderlay = (value: string): void => {
    if (value !== this.state.showDecor) {
      this.setState({ showDecor: value });
    }
  }

  private handlePress = (): void => {
    if (!this.props.isLoggedAccount) {
      this.props.onPress(this.props.address, this.props.ecosystemId);
    } else {
      this.swipeable && this.swipeable.recenter();
    }
  }

  private handleRemove = (): void => {
    this.props.onRemove(this.props.account);
  }
}

export default Row;
