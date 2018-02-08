import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class LandingScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    header: null,
    headerBackTitle: null,
    gesturesEnabled: false,
  })

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading</Text>
      </View>
    );
  }
}

export default LandingScreen;
