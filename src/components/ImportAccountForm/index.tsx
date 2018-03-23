import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';

import PendingButtonContainer from 'containers/PendingButtonContainer';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import styles from './styles';

export interface InputParams {
  password: string;
  privateKey?: string;
}

export interface ISignUpProps {
  seed?: string;
  onSubmit(params: InputParams): void;
  goBack(): void;
}

export interface ISignUpState {
  seed?: string;
  password?: string;
}

const accountSeedInput = {
  id: "signup.account.seed",
  defaultMessage: 'Account seed',
};

const passwordInput = {
  id: "auth.sign-up.password.placeholder",
  defaultMessage: 'Password',
};

class ImportAccountForm extends React.Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);

    this.state = {
      seed: undefined,
      password: undefined
    };
  }

  public componentWillReceiveProps(nextProps: ISignUpProps) {
    this.setState(() => ({ seed: nextProps.seed }));
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Field>
            <Input
              style={styles.textInput}
              onChangeText={this.handleSeedChange}
              value={this.state.seed}
              autoCorrect={false}
              multiline
              intl={accountSeedInput}
            />
          </Field>
          <Field>
            <Input
              secureTextEntry
              style={styles.passwordInput}
              onChangeText={this.handlePasswordChange}
              intl={passwordInput}
            />
          </Field>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <PendingButtonContainer
            onPress={this.submit}
            buttonStyle={styles.nextButton}
            intl={{
              id: 'auth.sign-in.submit.title',
              defaultMessage: 'Next',
            }}
          />
          <Button
            onPress={this.handleNavigateBack}
            buttonStyle={styles.cancelButton}
            intl={{
              id: "singup.button.cancel",
              defaultMessage: 'Cancel',
            }}
          />
        </View>
      </View>
    );
  }

  private submit = (): void => {
    if (!this.state.seed || !this.state.password) {
      return;
    }

    this.props.onSubmit({
      privateKey: this.state.seed,
      password: this.state.password
    });
  }

  private handleNavigateBack = () => {
    this.props.goBack();
  }

  private handleSeedChange = (seed: string): void => {
    this.setState(() => ({ seed }));
  }

  private handlePasswordChange = (password: string): void => {
    this.setState(() => ({ password }));
  }
}

export default ImportAccountForm;
