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
  id: string;
  title: string;
  ecosystemId: string;
  notificationsCount?: number;
  onPress(id: string, ecosystemId: string): void;
  onRemove(id: string): void;
}

class Row extends React.Component<IRow> {
  public render() {
    const { title, id, notificationsCount } = this.props;
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
              {id}
            </Text>
            {notificationsCount && (
              <Text>{`${notificationsCount.toString()} new notifications`}</Text>
            )}
          </View>
          <Icon {...avatarDefaultProps} />
        </Field>
      </TouchableOpacity>
    );
  }
  private handleClick = (): void => {
    this.props.onPress(this.props.id, this.props.ecosystemId);
  }

  private handleRemove = (): void => {
    this.props.onRemove(this.props.id);
  }
}

export default Row;
