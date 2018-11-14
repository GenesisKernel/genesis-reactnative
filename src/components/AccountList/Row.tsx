import * as React from 'react';
import { View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';

import Avatar from './Avatar';
import Swipeable from 'react-native-swipeable-row';

import { Colors, openDrawerOffset } from 'components/ui/theme';
import { isEmpty, path } from 'ramda';

import LogoutButtonContainer from 'containers/LogoutButtonContainer';
import RemoveAccountButtonContainer from 'containers/RemoveAccountButtonContainer';
import ChangePasswordButtonContainer from 'containers/ChangePasswordButtonContainer';

import Text from 'components/ui/Text';
import styles from './styles';

const { width } = Dimensions.get('window');

export interface IEcosystems {
  id: number | string;
  parameters: { ecosystem_name?: string; };
 }

export interface IRow {
  account: IAccount;
  currentNode: INode;
  notification?: INotificationData;
  isLoggedAccount: boolean;
  ecosystems?: IEcosystems;
  currentRoute: { key: string, routeName: string };
  onPress(payload: { uniqKey: string; encKey: string; } | { publicKey: string }): void;
  onDisableScroll(value: boolean): void;
}

class Row extends React.PureComponent<IRow> {
  public state = {
    showDecor: 'fadeOut',
  };

  private swipeable = null;

  public render() {
    const { showDecor } = this.state;
    const { account: { uniqKey, key_id, ecosystem_id, ecosystem_name, role_id, role_name, inActive },
    notification, isLoggedAccount, account, ecosystems, currentRoute } = this.props;

    const isAccountSelectRoute = currentRoute.routeName.lastIndexOf('ACCOUNT_SELECT') !== -1;

    const rightButtonsContainerWidth = !isAccountSelectRoute ? width - (width * openDrawerOffset) : width;

    return (
      <Swipeable
        onRef={(ref: any) => this.swipeable = ref}
        onSwipeStart={this.handleSwipeStart}
        onSwipeRelease={this.handleSwipeRelease}
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
              {!inActive
                ?(
                  <View style={styles.firstRow}>
                    <View style={styles.avatar}>
                      {this.renderNotification()}
                      <Avatar
                        account={account}
                        currentNode={this.props.currentNode} />
                    </View>
                    <View style={styles.titleSubTitleContainer}>
                      <Text numberOfLines={1} style={styles.title}>
                        {`eco: ${ecosystem_name || ecosystem_id}`}
                      </Text>
                      <Text numberOfLines={1} style={styles.subTitle}>
                        {`role: ${role_name || role_id}`}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.firstRow}>
                    <Text
                      numberOfLines={2}
                      style={styles.inactiveAcc}
                    >
                      Account is waiting for activation.
                      Tap to activate.
                    </Text>
                  </View>
                )
              }

              <View style={styles.secondRow}>
                <Text numberOfLines={1} style={styles.secondTitle}>
                  {key_id}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }

  private renderNotification = () => {
    const { notification } = this.props;

    try {
      if (notification && notification.count) {
        return (
          <View style={styles.notificationCircle}>
            <Text style={styles.notificationText}>{notification.count.toString()}</Text>
          </View>
        );
      }
    } catch (err) {
      console.log(err)
    }
  }

  private getRightButtons = (rightButtonsContainerWidth: number): JSX.Element[] => {
    const { isLoggedAccount, account: { ecosystem_id } } = this.props;
    const buttonsCount = isLoggedAccount ? 3 : 2;
    const buttonWidth = rightButtonsContainerWidth / buttonsCount;

    const rightButtons = [
      (
        <View style={styles.rightButtonsContainer} key="1">
          {isLoggedAccount
            ? <LogoutButtonContainer
              recenter={this.handleRecenter}
              buttonWidth={buttonWidth}
            />
            : <ChangePasswordButtonContainer
              recenter={this.handleRecenter}
              buttonWidth={buttonWidth}
              account={this.props.account}
            />
          }

          <RemoveAccountButtonContainer
            recenter={this.handleRecenter}
            uniqKey={this.props.account.uniqKey}
            buttonWidth={buttonWidth}
          />

          {isLoggedAccount
            && (
              <ChangePasswordButtonContainer
                recenter={this.handleRecenter}
                buttonWidth={buttonWidth}
                account={this.props.account}
              />
            )
          }
        </View>
      )
    ];
    return rightButtons;
  }

  private handleRecenter = () => {
    this.swipeable && this.swipeable.recenter();
  }

  private handleSwipeStart = () => {
    this.props.onDisableScroll(false);
  }

  private handleSwipeRelease = () => {
    this.props.onDisableScroll(true);
  }

  private handlUnderlay = (value: string): void => {
    if (value !== this.state.showDecor) {
      this.setState({ showDecor: value });
    }
  }

  private handlePress = (): void => {
    if (!this.props.isLoggedAccount) {
      const { uniqKey, encKey } = this.props.account;
      const payload = this.props.account.inActive
        ? { publicKey: this.props.account.publicKey }
        : { uniqKey, encKey };

      this.props.onPress(payload);
    } else {
      this.swipeable && this.swipeable.recenter();
    }
  }
}

export default Row;
