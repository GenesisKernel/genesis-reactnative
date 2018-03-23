import * as React from 'react';
import { path } from 'ramda';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import SingUpFormContainer from 'containers/SingUpFormContainer';
import Text from 'components/ui/Text';
interface IScreenProps extends NavigationScreenProps<{}> {}

class SignUpScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigation, navigationOptions }): NavigationStackScreenOptions => {
    const title = path(['state', 'params', 'changePassword'], navigation) ? 'signup.confirm.change.password' : 'account.create';
    return {
      headerTitle: <Text intl={{ id: title, defaultMessage: title }} style={navigationOptions.headerTitleStyle}/>,
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
