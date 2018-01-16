import * as React from 'react';
import { View } from 'react-native';

import PendingButtonContainer from 'containers/PendingButtonContainer';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import styles from './styles';

export interface InputParams {
  seed: string;
  password: string;
}

export interface ISignUpProps {
  onSubmit(params: InputParams): void;
  goBack(): void;
  seed: string;
}

export interface ISignUpState {
  password?: string;
  passwordConfirm?: string;
}

const passwordInput = {
  id: 'auth.sign-up.password.placeholder',
  defaultMessage: 'Password'
};

const passwordConfirmInput = {
  id: 'auth.sign-up.password-confirm.placeholder',
  defaultMessage: 'Password confirmation'
};

const NextButtonProps = {
  id: 'auth.sign-in.submit.title',
  defaultMessage: 'Next step'
};

const cancelButtonProps = {
  id: 'auth.sign-in.submit.title',
  defaultMessage: 'Cancel'
};

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);

    this.state = {
      password: undefined,
      passwordConfirm: undefined
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <View>
          <Field>
            <Input
              secureTextEntry
              onChangeText={this.handlePasswordConfirmChange}
              intl={passwordInput}
            />
          </Field>
          <Field>
            <Input
              secureTextEntry
              onChangeText={this.handlePasswordChange}
              intl={passwordConfirmInput}
            />
          </Field>
        </View>
        <View>
          <PendingButtonContainer
            onPress={this.submit}
            intl={{
              id: 'auth.sign-in-confirm.finish.title',
              defaultMessage: 'Finish'
            }}
          />
          <Button
            onPress={this.handleNavigateBack}
            buttonStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            intl={cancelButtonProps}
          />
        </View>
      </View>
    );
  }

  private submit = (): void => {
    if (
      this.state.password &&
      this.state.password === this.state.passwordConfirm
    ) {
      this.props.onSubmit({
        seed: this.props.seed,
        password: this.state.password
      });
    }
  }

  private handleNavigateBack = () => {
    this.props.goBack();
  }

  private handlePasswordConfirmChange = (passwordConfirm: string): void => {
    this.setState(() => ({ passwordConfirm }));
  }

  private handlePasswordChange = (password: string): void => {
    this.setState(() => ({ password }));
  }
}

export default SignUp;
