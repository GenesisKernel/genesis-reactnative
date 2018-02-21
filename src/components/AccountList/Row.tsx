import * as React from 'react';
import { View, ScrollView, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';

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
  currentAccountAddress: string,
  onPress(address: string, ecosystemId: string): void;
  onRemove(address: string): void;
}

class Row extends React.Component<IRow> {
  state = {
    showDecor: 'fadeOut',
  }

  public render() {
    const { showDecor } = this.state;
    const { title, address, notificationsCount } = this.props;

    return (
      <TouchableHighlight
        style={styles.touchableContainer}
        onShowUnderlay={() => this.handlUnderlay('fadeIn')}
        onHideUnderlay={() => this.handlUnderlay('fadeOut')}
        activeOpacity={0.8}
        underlayColor={`rgba(62, 188, 154, .15)`} // green
        onPress={this.handleClick}
      >
        <View>
          <AnimatableView
            animation={showDecor}
            easing="linear"
            duration={100}
            useNativeDriver
            iterationCount={1}
            style={styles.decorStick} />

          <Field style={styles.rowContainer}>
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
                  source={{ uri: `https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png` }}/>
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
          </Field>
        </View>
      </TouchableHighlight>
    );
  }

  private handlUnderlay = (value: string): void => {
    if (value !== this.state.showDecor) {
      this.setState({ showDecor: value });
    }
  }

  private handleClick = (): void => {
    const { currentAccountAddress } = this.props;

    if (currentAccountAddress !== this.props.address) {
      this.props.onPress(this.props.address, this.props.ecosystemId);
    }
  }

  private handleRemove = (): void => {
    this.props.onRemove(this.props.address);
  }
}

export default Row;
