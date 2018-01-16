import * as React from 'react';
import { View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';

import ImportAccountFormContainer from 'containers/ImportAccountFormContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Known account'
  })

  public render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid
        keyboardShouldPersistTaps="always"
      >
        <ImportAccountFormContainer goBack={this.props.navigation.goBack} />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpScreen;
