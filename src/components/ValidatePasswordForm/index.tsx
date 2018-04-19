import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { validatePassword } from 'modules/sagas/privateKey';
import { Colors } from 'components/ui/theme';

import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import styles from './styles';

export interface IValidateFormProps {
  onConfirm: ({}) => void;
  onClose: () => void;
  title?: string;
  encKey: string;
}

export interface IValidateFormState {
  password?: string | null;
  validValue: boolean;
}

export default class ValidatePasswordForm extends React.Component<IValidateFormProps, IValidateFormState> {
  state = {
    password: null,
    validValue: true,
  }

  public render() {
    const { title } = this.props;
    const { validValue } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titlesBlock}>
            <Text
              style={styles.title}
              numberOfLines={1}
              intl={{ id: "modal.password.required", defaultMessage: "Password required" }} />
            <Text
              style={styles.secondaryTitle}
              intl={{ id: "modal.password.to.continue", defaultMessage: 'To continue please enter your password.' }} />
          </View>

          <Input
            style={[styles.input, !validValue ? styles.invalidInput: {}]}
            containerStyle={{ flex: 0 }}
            onChangeText={this.handlePasswordChange}
            selectionColor={validValue ? "#231f20" : Colors.dangerRed}
            placeholderTextColor="#ccc"
            placeholder={'Password'}
            secureTextEntry
            intl={{
              id: "auth.sign-up.password.placeholder",
              defaultMessage: 'Password'
            }} />

          <View style={styles.buttonsContainer}>
            <Button
              buttonStyle={[styles.button, styles.leftButton]}
              onPress={this.handleConfirm}
              intl={{ id: "modal.window.confirm", defaultMessage: "CONFIRM" }} />
            <Button
              buttonStyle={styles.button}
              onPress={this.handleClose}
              intl={{ id: "singup.button.cancel", defaultMessage: 'CANCEL' }} />
          </View>
        </View>
      </View>
    );
  }

  private handleConfirm = () => {
    const { password, validValue } = this.state;
    const { encKey } = this.props;

    if (password) {
      const privateKey = validatePassword({ encKey, password });

      if (!!privateKey) {
        this.props.onConfirm({ password, privateKey });
      } else {
        validValue && this.setState({ validValue: false });
      }
    }
  }

  private handleClose = () => {
    this.props.onClose();
  }

  private handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  }
}