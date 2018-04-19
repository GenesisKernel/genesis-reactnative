import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import PendingButtonContainer from 'containers/PendingButtonContainer';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import styles from './styles';
import { validatePassword } from 'modules/sagas/privateKey';

export interface InputParams {
  uniqKey: string;
  ecosystemId: string;
  password: string;
  privateKey: string;
  ecosystems: string[];
  byPrivateKey: boolean | undefined;
}

export interface ISignInProps {
  uniqKey: string;
  encKey: string;
  ecosystemId: string;
  ecosystems: string[];
  privateKey: string;
  onSubmit(params: InputParams): void;
  onCancel: () => void;
}

const cancelTitle = {
  id: 'signin.screen.another.account',
  defaultMessage: "Another Account",
};

export interface ISignInState {
  password?: string | null;
  passwordValid: boolean;
}

class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      password: null,
      passwordValid: true,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Field>
          <Input
            isInvalid={!this.state.passwordValid}
            secureTextEntry
            onChangeText={this.handlePasswordChange}
            intl={{
              id: "auth.sign-up.password.placeholder",
              defaultMessage: 'Password'
            }}
          />
        </Field>
        <PendingButtonContainer
          onPress={this.submit}
          intl={{
            id: 'auth.sign-in.submit.sign.in',
            defaultMessage: 'Sign in'
          }}
        />
        <Button
          onPress={this.props.onCancel}
          intl={cancelTitle}
          buttonStyle={styles.cancelButton} />
      </View>
    );
  }

  private submit = (): void => {
    const { password, passwordValid } = this.state;
    if (password) {
      const { encKey } = this.props;
      const privateKey = encKey ? validatePassword({ encKey, password }) : this.props.privateKey;

      if (!!privateKey) {
        this.props.onSubmit({
          password,
          privateKey: privateKey,
          uniqKey: this.props.uniqKey,
          ecosystemId: this.props.ecosystemId,
          ecosystems: this.props.ecosystems,
          byPrivateKey: !!!encKey || undefined,
        });
      } else {
        passwordValid && this.setState({ passwordValid: false });
      }
    }
  }

  private handlePasswordChange = (password: string): void => {
    this.setState(() => ({ password }));
  }
}

export default SignIn;
