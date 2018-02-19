import * as React from 'react';
import { View } from 'react-native';

import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import styles from './styles';
export interface IValidateFormProps {
  onCheckPassword: (password: string) => void;
  title?: string;
  isVisible: boolean;
}

export interface IValidateFormState {
  password?: string | null;
}

export default class ValidatePasswordForm extends React.Component<IValidateFormProps, IValidateFormState> {
  state = {
    password: null,
  }

  public render() {
    const { title, isVisible } = this.props;
    return (
      isVisible
        ?(
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text>{title || 'Please confirm your password'}</Text>
              <Input
                style={styles.input}
                onChangeText={this.handlePasswordChange}
                intl={{
                  id: 'auth.sign-in.password.placeholder',
                  defaultMessage: 'Password'
                }} />
              <Button
                onPress={this.handleConfirm}
                title="Confirm" />
              <Button title="Cancel" />
            </View>
          </View>
        ) :(null)
    );
  }

  private handleConfirm = () => {
    const { password } = this.state;
    if (password) {
      this.props.onCheckPassword(password);
    }
  }

  private handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  }
}