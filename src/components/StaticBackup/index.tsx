import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class StaticBackup extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Static Backup</Text>
      </View>
    );
  }
}

export default StaticBackup;
