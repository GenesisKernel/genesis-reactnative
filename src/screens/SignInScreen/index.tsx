import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { NavigationStackScreenOptions } from 'react-navigation';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';

import Text from 'components/ui/Text';
import SingInFormContainer from 'containers/SingInFormContainer';
import styles from './styles';

interface IScreenProps {
  navigation: {
    state: {
      params: {
        uniqKey?: string;
        privateKey: string;
        encKey: string;
      }
    }
  }
}

class SignInScreen extends React.Component<IScreenProps> {
  public static navigationOptions = ({ navigationOptions }: any): NavigationStackScreenOptions => {
    return {
      headerTitle: <Text style={navigationOptions.headerTitleStyle} intl={{ id: "signin.screen.login", defaultMessage: "Login" }} />,
      headerBackTitle: null,
      headerLeft: <View/>
    }
  }

  public render() {
    const { uniqKey, privateKey, encKey } = this.props.navigation.state.params;

    return (
      <KeyboardAwareScrollView>
        {!!privateKey && (
          <View style={styles.notification}>
            <View style={styles.textContainer}>
              <Text
                intl={{ id: "signin.screen.private.key", defaultMessage: "Private key:" }}
                style={styles.title}/>
              <Text style={styles.text}>{privateKey}</Text>
            </View>
          </View>
        )}

        <SingInFormContainer
          uniqKey={uniqKey}
          privateKey={privateKey}
          encKey={encKey}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignInScreen;
