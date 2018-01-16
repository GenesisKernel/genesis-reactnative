import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import TransactionsContainer from 'containers/TransactionsContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class TransactionsScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Transactions'
  })

  public render() {
    return (
      <View style={styles.container}>
        <TransactionsContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TransactionsScreen;
