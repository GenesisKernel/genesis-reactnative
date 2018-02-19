import * as React from 'react';
import { View } from 'react-native';

import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import styles from './styles';
export interface IValidateFormProps {
  onConfirm: (password: string) => void;
  onClose: () => void;
  title?: string;
}

export interface IValidateFormState {
  password?: string | null;
}

export default class ValidatePasswordForm extends React.Component<IValidateFormProps, IValidateFormState> {
  state = {
    password: null,
  }

  public render() {
    const { title } = this.props;
    return (
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
          <Button
            onPress={this.handleClose}
            title="Cancel" />
        </View>
      </View>
    );
  }

  private handleConfirm = () => {
    const { password } = this.state;
    if (password) {
      this.props.onConfirm(password);
    }
  }

  private handleClose = () => {
    this.props.onClose();
  }

  private handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  }
}