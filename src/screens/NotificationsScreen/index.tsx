import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import NotificationsContainer from 'containers/NotificationsContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

export default class NotificationsScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Notifications',
  })

  public render() {
    return (
      <View style={styles.container}>
        <NotificationsContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
