import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import SingUpConfirmFormContainer from 'containers/SingUpConfirmFormContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpConfirmScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Create account',
    headerBackTitle: null
  });

  public render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        keyboardVerticalOffset={50}
      >
        <SingUpConfirmFormContainer goBack={this.props.navigation.goBack}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpConfirmScreen;
