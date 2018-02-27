import * as React from 'react';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import SingUpFormContainer from 'containers/SingUpFormContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Create account'
  })

  public render() {
    return (
      <KeyboardAwareScrollView>
        <SingUpFormContainer goBack={this.props.navigation.goBack}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpScreen;
