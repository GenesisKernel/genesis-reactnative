import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import Field from 'components/ui/Field';
import Button from 'components/ui/Button';
import AccountListContainer from 'containers/AccountListContainer';
import Logo from 'components/ui/Logo';
import Text from 'components/ui/Text';
import TouchIdContainer from 'containers/TouchIdContainer';
import { navTypes } from '../../navigatorConfig';
import styles from './styles';

const addAccountButtonLabel = {
  id: 'auth.select-account.another',
  defaultMessage: 'KNOWN ACCOUNT'
};

const createAccountButtonLabel = {
  id: 'auth.create-account.another',
  defaultMessage: 'CREATE ACCOUNT'
};

interface IScreenProps extends NavigationScreenProps<{}> {}

class AccountSelectScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: ' ', // Do not remove this line
  })

  public render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Text
          style={styles.title}>
          WELCOME TO GENESIS!
        </Text>
        <Text
          style={styles.description}>
          Please authorise or sign up to start working.
        </Text>
        <AccountListContainer/>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={styles.createButton}
            onPress={this.handleCreateAccountButtonPress}
            intl={createAccountButtonLabel}
          />
          <Button
            onPress={this.handleKnownAccountButtonPress}
            intl={addAccountButtonLabel}
          />
          {/* <TouchIdContainer /> */}
        </View>
      </View>
    );
  }

  private handleCreateAccountButtonPress = () => {
    this.props.navigation.navigate(navTypes.SIGN_UP_WARNING);
  }

  private handleKnownAccountButtonPress = () => {
    this.props.navigation.navigate(navTypes.AUTH);
  }
}

export default AccountSelectScreen;
