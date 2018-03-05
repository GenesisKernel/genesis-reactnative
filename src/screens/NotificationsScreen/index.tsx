import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import ProtypoContainer from 'containers/Protypo/ProtypoContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

export default class NotificationsScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Notifications',
  })

  public render() {
    return (
      <View style={styles.container}>
        <ProtypoContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});
