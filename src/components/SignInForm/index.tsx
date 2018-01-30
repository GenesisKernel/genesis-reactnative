import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import PendingButtonContainer from 'containers/PendingButtonContainer';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import styles from './styles';

export interface InputParams {
  accountAdress: string;
  ecosystemId: string;
  password: string;
  privateKey: string;
}

export interface ISignInProps {
  accountAdress: string;
  ecosystemId: string;
  privateKey: string;
  onSubmit(params: InputParams): void;
}

export interface ISignInState {
  password?: string;
}

class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      password: undefined
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Field>
          <Input
            secureTextEntry
            onChangeText={this.handlePasswordChange}
            intl={{
              id: 'auth.sign-in.password.placeholder',
              defaultMessage: 'Password'
            }}
          />
        </Field>
        <PendingButtonContainer
          onPress={this.submit}
          intl={{
            id: 'auth.sign-in.submit.title',
            defaultMessage: 'Sign in'
          }}
        />
      </View>
    );
  }

  private submit = (): void => {
    if (!this.state.password) {
      return;
    }

    this.props.onSubmit({
      password: this.state.password,
      accountAdress: this.props.accountAdress,
      privateKey: this.props.privateKey,
      ecosystemId: this.props.ecosystemId
    });
  }

  private handlePasswordChange = (password: string): void => {
    this.setState(() => ({ password }));
  }
}

export default SignIn;
