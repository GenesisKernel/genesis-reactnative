import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import styles from './styles';
import Text from 'components/ui/Text';
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
        <Text
          style={styles.text}
          intl={{ id: "landing.screen.loading", defaultMessage: 'Loading' }} />
      </View>
    );
  }
}

export default LandingScreen;
