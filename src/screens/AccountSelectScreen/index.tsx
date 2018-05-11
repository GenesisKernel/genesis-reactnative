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
import { navTypes } from '../../constants';
import styles from './styles';

const addAccountButtonLabel = {
  id: 'account.known',
  defaultMessage: 'KNOWN ACCOUNT'
};

const createAccountButtonLabel = {
  id: "account.create",
  defaultMessage: 'CREATE ACCOUNT'
};

interface IScreenProps extends NavigationScreenProps<{}> {}

class AccountSelectScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: ' ', // Do not remove this line... please
  })

  public render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Text
          intl={{ id: 'auth.welcome.to', defaultMessage: 'WELCOME TO APLA' }}
          style={styles.title}/>
        <Text
          intl={{
            id: 'auth.authorise.please',
            defaultMessage: 'Please authorise or sign up to start working.'
          }}
          style={styles.description}/>
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
