import * as React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
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
  onPress(address: string, ecosystemId: string): void;
  onRemove(address: string): void;
}

class Row extends React.Component<IRow> {
  public render() {
    const { title, address } = this.props;
    return (
      <TouchableOpacity
        style={styles.touchableContainer}
        activeOpacity={0.8}
        onPress={this.handleClick}
      >
        <Field style={styles.rowContainer}>
          <View style={styles.rowTextContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              {address}
            </Text>
          </View>
          <Icon {...avatarDefaultProps} />
        </Field>
      </TouchableOpacity>
    );
  }
  private handleClick = (): void => {
    this.props.onPress(this.props.address, this.props.ecosystemId);
  }

  private handleRemove = (): void => {
    this.props.onRemove(this.props.address);
  }
}

export default Row;
