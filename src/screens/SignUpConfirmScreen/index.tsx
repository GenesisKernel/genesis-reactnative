import * as React from 'react';
import { path } from 'ramda';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import SingUpFormContainer from 'containers/SingUpFormContainer';

interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigation }): NavigationStackScreenOptions => {
    const title = path(['state', 'params', 'changePassword'], navigation) ? 'Change password' : 'Create account';
    return {
      headerTitle: title,
    }
  }

  public render() {
    return (
      <KeyboardAwareScrollView>
        <SingUpFormContainer
          params={this.props.navigation.state.params}
          goBack={this.props.navigation.goBack}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpScreen;
