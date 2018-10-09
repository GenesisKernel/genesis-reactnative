import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class StaticEditor extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <Text>StaticEditor</Text>
      </View>
    );
  }
}

export default StaticEditor;
