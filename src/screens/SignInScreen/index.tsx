import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';

import Text from 'components/ui/Text';
import SingInFormContainer from 'containers/SingInFormContainer';
import styles from './styles';

interface IScreenProps
  extends NavigationScreenProps<{
      id: string;
      ecosystemId: string;
      privateKey: string;
      ecosystems: string[];
    }> {}

const Row = ({ children }) => (
  <Text style={styles.row} numberOfLines={1} ellipsizeMode="middle">
    {children}
  </Text>
);

class SignInScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => {
    return {
      headerTitle: <Text style={navigationOptions.headerTitleStyle} intl={{ id: "signin.screen.login", defaultMessage: "Login" }} />,
      headerBackTitle: null,
      headerLeft: <View/>
    }
  }

  public render() {
    const { id, ecosystemId, privateKey, ecosystems } = this.props.navigation.state.params;

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
            {ecosystemId && privateKey && (
              <View style={styles.textContainer}>
                <Text
                  style={styles.title}
                  intl={{ id: "signin.screen.ecosystem", defaultMessage: "Ecosystem:" }} />
                <Text style={styles.text}>{ecosystemId}</Text>
              </View>
            )}
          </View>
        )}

        <SingInFormContainer
          accountAdress={id}
          ecosystemId={ecosystemId}
          ecosystems={ecosystems}
          privateKey={privateKey}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignInScreen;
