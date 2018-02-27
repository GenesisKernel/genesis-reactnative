import * as React from 'react';
import { View, TextInput } from 'react-native';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import ImportAccountFormContainer from 'containers/ImportAccountFormContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Known account'
  })

  public render() {
    return (
      <KeyboardAwareScrollView>
        <ImportAccountFormContainer goBack={this.props.navigation.goBack} />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpScreen;
