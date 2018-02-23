import * as React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import Swipeable from 'react-native-swipeable-row';

import { Colors } from 'components/ui/theme';

import LogoutButtonContainer from 'containers/LogoutButtonContainer';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import Field from 'components/ui/Field';
import styles from './styles';


const avatarDefaultProps = {
  iconStyle: {
    color: '#fff'
  },
  type: 'font-awesome',
  name: 'user-circle'
};

export interface IRow {
  address: string;
  title: string;
  ecosystemId: string;
  notificationsCount?: number;
  isLoggedAccount: boolean,
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
    const { title, address, notificationsCount, isLoggedAccount } = this.props;

    return (
      <Swipeable
        disable={!isLoggedAccount}
        onRef={(ref: any) => this.swipeable = ref}
        onSwipeStart={() => this.handleSwipe(false)}
        onSwipeRelease={() => this.handleSwipe(true)}
        rightButtons={[<LogoutButtonContainer recenter={this.handleRecenter} />]}
        rightButtonWidth={200}>
        <TouchableHighlight
          // disabled={isLoggedAccount}
          style={[styles.touchableContainer, isLoggedAccount ? { backgroundColor: Colors.underlayGreen } : {}]}
          onShowUnderlay={() => this.handlUnderlay('fadeIn')}
          onHideUnderlay={() => this.handlUnderlay('fadeOut')}
          activeOpacity={0.8}
          underlayColor={Colors.underlayGreen} // green
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
              {/* <Icon {...avatarDefaultProps} /> */}
              <View style={styles.avatar}>
                {notificationsCount && (
                  <View style={styles.notificationCircle}>
                    <Text style={styles.notificationText}>{'5'}</Text>
                  </View>
                )}
                <View style={styles.avatarImageWrapper}>
                  <Image
                    resizeMode="cover"
                    style={styles.avatarImage}
                    source={{ uri: `https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png` }} />
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
    this.props.onRemove(this.props.address);
  }
}

export default Row;
