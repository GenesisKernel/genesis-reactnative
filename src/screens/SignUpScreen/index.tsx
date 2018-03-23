import * as React from 'react';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import SingUpConfirmFormContainer from 'containers/SingUpConfirmFormContainer';
import Text from 'components/ui/Text';

interface IScreenProps extends NavigationScreenProps<{}> {}

const titleIntl={
  defaultMessage: 'Create account',
  id: "account.create",
};

class SignUpConfirmScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (opts: any): NavigationStackScreenOptions => {
    return {
      headerTitle: <Text style={opts.navigationOptions.headerTitleStyle} intl={titleIntl} />,
      headerBackTitle: null
    }
  };

  public render() {
    return (
      <KeyboardAwareScrollView>
        <SingUpConfirmFormContainer goBack={this.props.navigation.goBack} />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUpConfirmScreen;
