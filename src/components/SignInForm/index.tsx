import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import PendingButtonContainer from 'containers/PendingButtonContainer';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import styles from './styles';

export interface InputParams {
  uniqKey: string;
  ecosystemId: string;
  password: string;
  privateKey: string;
  ecosystems: string[]
}

export interface ISignInProps {
  uniqKey: string;
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
    if (!this.state.password) {
      return;
    }

    this.props.onSubmit({
      password: this.state.password,
      uniqKey: this.props.uniqKey,
      privateKey: this.props.privateKey,
      ecosystemId: this.props.ecosystemId,
      ecosystems: this.props.ecosystems,
    });
  }

  private handlePasswordChange = (password: string): void => {
    this.setState(() => ({ password }));
  }
}

export default SignIn;
