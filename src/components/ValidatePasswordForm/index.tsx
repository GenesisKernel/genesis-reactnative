import * as React from 'react';
import { View, ScrollView } from 'react-native';
import KeyboardAwareScrollView from 'components/utils/KeyboardAwareScrollView';

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
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.titlesBlock}>
              <Text
                style={styles.title}
                numberOfLines={1}
                intl={{ id: "modal.password.required", defaultMessage: "Password required" }}/>
              <Text
                style={styles.secondaryTitle}
                intl={{ id: "modal.password.to.continue", defaultMessage: 'To continue please enter your password.' }}/>
            </View>
            <Input
              style={styles.input}
              containerStyle={{ flex: 0 }}
              onChangeText={this.handlePasswordChange}
              selectionColor="#231f20"
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
                intl={{ id: "singup.button.cancel", defaultMessage: 'CANCEL' }}/>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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