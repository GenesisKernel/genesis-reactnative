import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { navTypes } from '../../navigatorConfig';
import { Colors, Fonts } from '../../components/ui/theme';

import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Text from 'components/ui/Text';

import styles from './styles';

const signInTitle = {
  id: 'auth.type.with-key',
  defaultMessage: 'SCAN QR CODE'
};

const signUpTitle = {
  id: 'auth.type.without-key',
  defaultMessage: 'ENTER MANUALY'
};

const cancelTitle = {
  id: 'auth.type.cancel',
  defaultMessage: 'CANCEL'
};

interface IScreenProps extends NavigationScreenProps<{}> {}

class AuthTypeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = (): NavigationStackScreenOptions => ({
    headerTitle: 'Known account'
  })

  public render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.descr}>
            You can scan QR code for known account or enter your authorisation
            data manualy.
          </Text>
          <Button
            onPress={this.handleScanButtonPress}
            buttonStyle={styles.createButton}
            textStyle={styles.buttonText}
            intl={signInTitle}
          />
          <Button
            onPress={this.navigateToSignUp}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            intl={signUpTitle}
          />
        </View>
        <View>
          <Button
            onPress={this.navigateBack}
            buttonStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            intl={cancelTitle}
          />
        </View>
      </View>
    );
  }

  private handleScanButtonPress = () => {
    this.props.navigation.navigate(navTypes.SCANNER);
  }

  private navigateToSignUp = () => {
    this.props.navigation.navigate(navTypes.IMPORT_ACCOUNT);
  }

  private navigateBack = () => {
    this.props.navigation.goBack();
  }
}

export default AuthTypeScreen;
