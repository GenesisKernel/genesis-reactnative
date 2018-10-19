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
  isDrawerOpened: boolean;
  ecosystems?: IEcosystems;
  onPress(payload: { uniqKey: string; encKey: string; }): void;
  onDisableScroll(value: boolean): void;
}

class Row extends React.PureComponent<IRow> {
  public state = {
    showDecor: 'fadeOut',
  };

  private swipeable = null;

  public render() {
    const { showDecor } = this.state;
    const { account: { avatar, username, uniqKey, address, ecosystem_id  },
    notification, isLoggedAccount, isDrawerOpened, account, ecosystems } = this.props;

    const  findElmentName = this.findElmentName(path([`${ecosystem_id}`], ecosystems));

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
              <View style={styles.firstRow}>
                <View style={styles.avatar}>
                  {notification && notification.count && (
                    <View style={styles.notificationCircle}>
                      <Text style={styles.notificationText}>{notification.count.toString()}</Text>
                    </View>
                  )}
                  <Avatar
                    account={account}
                    currentNode={this.props.currentNode} />
                </View>
                <View style={styles.titleSubTitleContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {`eco: ${findElmentName}`}
                  </Text>
                  <Text numberOfLines={1} style={styles.subTitle}>
                    {username || 'no username'}
                  </Text>
                </View>
              </View>
              <View style={styles.secondRow}>
                <Text numberOfLines={1} style={styles.secondTitle}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }

  private findElmentName = (findElmentName: any) => {
    if (findElmentName) {
      if (!isEmpty(findElmentName) && !isEmpty(findElmentName.parameters))  {
        return findElmentName.parameters.ecosystem_name;
      }
    }

    return `#${this.props.account.ecosystem_id}`;
  }

  private getRightButtons = (rightButtonsContainerWidth: number): JSX.Element[] => {
    const { isLoggedAccount, isDrawerOpened, account: { address, ecosystem_id } } = this.props;
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
      const { uniqKey, encKey } = this.props.account;

      this.props.onPress({ uniqKey, encKey });
    } else {
      this.swipeable && this.swipeable.recenter();
    }
  }
}

export default Row;
