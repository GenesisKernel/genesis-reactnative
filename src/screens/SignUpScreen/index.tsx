import * as React from 'react';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import SingUpConfirmFormContainer from 'containers/SingUpConfirmFormContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpConfirmScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Create account',
    headerBackTitle: null
  });

  public render() {
    return (
      <KeyboardAwareScrollView>
        <SingUpConfirmFormContainer goBack={this.props.navigation.goBack} />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpConfirmScreen;
