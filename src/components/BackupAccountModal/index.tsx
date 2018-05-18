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
  onConfirm: () => void;
}

export default class BackupAccountModal extends React.Component<IBackupAccountModal> {
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text
            style={styles.secondaryTitle}
            intl={{ id: 'modal.email.required', defaultMessage: "Verify your account so you will be able to share your account's private key. Please, Do not share it with 3rd-party persons." }}></Text>

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
    this.props.onConfirm();
  }

  private handleClose = () => {
    this.props.onClose();
  }
}