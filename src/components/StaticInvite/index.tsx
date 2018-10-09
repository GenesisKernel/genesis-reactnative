import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class StaticInvite extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <Text>StaticInvite</Text>
      </View>
    );
  }
}

export default StaticInvite;
