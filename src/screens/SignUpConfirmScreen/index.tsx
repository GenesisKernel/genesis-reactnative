import * as React from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import styles from './styles';
import GenerateSeedButtonContainer from 'containers/GenerateSeedButtonContainer';
import ImportSeedButtonContainer from 'containers/ImportSeedButtonContainer';
import ExportSeedButtonContainer from 'containers/ExportSeedButtonContainer';
import SingUpFormContainer from 'containers/SingUpFormContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Create account'
  })

  public render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        keyboardVerticalOffset={50}
      >
        <SingUpFormContainer goBack={this.props.navigation.goBack}/>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpScreen;
