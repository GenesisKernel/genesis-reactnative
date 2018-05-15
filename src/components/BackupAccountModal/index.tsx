import * as React from 'react';
import { View } from 'react-native';
import { Colors } from 'components/ui/theme';

import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import styles from './styles';

const accountSeedInput = {
  id: "signup.account.seed",
  defaultMessage: 'Account seed',
};

interface IBackupAccountModal {
  onClose: () => void;
  onConfirm: (email: string) => void;
}

interface IBackupState {
  validValue: boolean;
  email?: string | null;
}

export default class BackupAccountModal extends React.Component<IBackupAccountModal, IBackupState> {
  state = {
    validValue: true,
    email: null,
  }

  public render() {
    const { validValue } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titlesBlock}>
            <Text
              style={styles.title}
              numberOfLines={1}
              intl={{ id: "modal.password.required", defaultMessage: "Email required" }} />
            <Text
              style={styles.secondaryTitle}
              intl={{ id: "modal.email.to.continue", defaultMessage: 'To continue please enter your email' }} />
          </View>

          <Input
            style={[styles.input, !validValue ? styles.invalidInput : {}]}
            containerStyle={{ flex: 0 }}
            onChangeText={this.handleInputChange}
            placeholderTextColor="#ccc"
            placeholder={'e-mail'}
            intl={{ id: "modal.email", defaultMessage: 'e-mail' }}
          />

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
    const { email, validValue } = this.state;

    if (email) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isEmailValid = reg.test(email);

      if (isEmailValid) {
        this.props.onConfirm(email);
      } else {
        validValue && this.setState({ validValue: false });
      }
    }
  }

  private handleClose = () => {
    this.props.onClose();
  }

  private handleInputChange = (value: string) => {
    this.setState({ email: value });
  }
}