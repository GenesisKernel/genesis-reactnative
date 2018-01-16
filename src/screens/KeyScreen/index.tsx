import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

interface IScreenProps extends NavigationScreenProps<{
  key: string,
  ecosystem: string
}> {}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'External key',
    headerBackTitle: null,
    gesturesEnabled: false
  })

  public render() {
    return (
      <View style={styles.container}>
        <Text>Ecosystem: {this.props.navigation.state.params.ecosystem}</Text>
        <Text>Key: {this.props.navigation.state.params.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
