import * as React from 'react';
import { View } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import ScannerContainer from 'containers/ScannerContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class ScannerScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    header: null,
  });

  public render() {
    return (
      <View style={styles.container}>
        <ScannerContainer goBack={this.props.navigation.goBack}/>
      </View>
    );
  }
}

export default ScannerScreen;
