import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface INotifications {
  count: number | null;
}

export default class Notifications extends React.Component<INotifications> {
  static defaultProps = {
    count: 0
  }

  public render() {
    const { count } = this.props;

    return (
      <View style={styles.container}>
        <Text>{`${count} notifications`}</Text>
      </View>
    );
  }
}