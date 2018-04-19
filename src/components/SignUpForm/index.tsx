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
  onChangePassword: (password: string) => void;
  onCancelChangingPassword: () => void;
  seed: string;
  params: {
    changePassword: boolean;
  }
}

export interface ISignUpState {
  password?: string;
  passwordConfirm?: string;
  passwordMatch: boolean;
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
  id: "singup.button.cancel",
  defaultMessage: 'Cancel'
};

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);

    this.state = {
      password: undefined,
      passwordConfirm: undefined,
      passwordMatch: true,
    };
  }

  public render() {
    const { changePassword } = this.props.params;
    const { passwordMatch } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Field>
            <Input
              style={styles.input}
              isInvalid={!passwordMatch}
              secureTextEntry
              onChangeText={this.handlePasswordConfirmChange}
              intl={passwordInput}
            />
          </Field>
          <Field>
            <Input
              style={styles.input}
              secureTextEntry
              isInvalid={!passwordMatch}
              onChangeText={this.handlePasswordChange}
              intl={passwordConfirmInput}
            />
          </Field>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <PendingButtonContainer
            onPress={changePassword ? this.handleChangePassword : this.submit}
            intl={{
              id: "auth.sign-in-confirm.finish.title",
              defaultMessage: 'Finish'
            }}
          />
          <Button
            onPress={!changePassword ? this.handleNavigateBack : this.props.onCancelChangingPassword}
            buttonStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            intl={cancelButtonProps}
          />
        </View>
      </View>
    );
  }

  private handleChangePassword = () => {
    const { passwordMatch } = this.state;
    if (this.state.password && this.state.password === this.state.passwordConfirm) {
      !passwordMatch && this.setState({ passwordMatch: true });
      this.props.onChangePassword(this.state.password)
    } else {
      passwordMatch && this.setState({ passwordMatch: false });
    }
  }

  private submit = (): void => {
    const { passwordMatch } = this.state;
    if (
      this.state.password &&
      this.state.password === this.state.passwordConfirm
    ) {
      !passwordMatch && this.setState({ passwordMatch: true });
      this.props.onSubmit({
        seed: this.props.seed,
        password: this.state.password
      });
    } else {
      passwordMatch && this.setState({ passwordMatch: false });
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
