import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Text from 'components/ui/Text';
import SingInFormContainer from 'containers/SingInFormContainer';
import styles from './styles';

interface IScreenProps
  extends NavigationScreenProps<{
      id: string;
      ecosystemId: string;
      privateKey: string;
    }> {}

const Row = ({ children }) => (
  <Text style={styles.row} numberOfLines={1} ellipsizeMode="middle">
    {children}
  </Text>
);

class SignInScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Login',
    headerBackTitle: null
  })

  public render() {
    const { id, ecosystemId, privateKey } = this.props.navigation.state.params;

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid
        keyboardShouldPersistTaps="always"
      >
        {!!privateKey && (
          <View style={styles.notification}>
            <Row>Private key: {privateKey}</Row>
            {ecosystemId && privateKey && <Row>Ecosystem: {ecosystemId}</Row>}
          </View>
        )}

        <SingInFormContainer
          accountId={id}
          ecosystemId={ecosystemId}
          privateKey={privateKey}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default SignInScreen;
