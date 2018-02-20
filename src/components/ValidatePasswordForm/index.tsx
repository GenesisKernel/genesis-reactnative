import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  scrollEnabled: boolean;
}

export default class ValidatePasswordForm extends React.Component<IValidateFormProps, IValidateFormState> {
  state = {
    password: null,
    scrollEnabled: false,
  }

  public render() {
    const { title } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <KeyboardAwareScrollView
        scrollEnabled={scrollEnabled}
        onKeyboardWillShow={this.handleKeyboardShow}
        onKeyboardWillHide={this.handleKeyboardHide}
        style={styles.scrollContainer}
        enableOnAndroid
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.titlesBlock}>
              <Text
                style={styles.title}
                numberOfLines={1}>
                {title || 'Password required'}
              </Text>
              <Text style={styles.secondaryTitle}>
                To continue please enter your password.
            </Text>
            </View>
            <Input
              style={styles.input}
              onChangeText={this.handlePasswordChange}
              selectionColor="#231f20"
              placeholderTextColor="#DFDFDF"
              placeholder={'Password'}
              secureTextEntry
              intl={{
                id: 'auth.sign-in.password.placeholder',
                defaultMessage: 'Password'
              }} />

            <View style={styles.buttonsContainer}>
              <Button
                buttonStyle={[styles.button, styles.leftButton]}
                onPress={this.handleConfirm}
                title="CONFIRM" />
              <Button
                buttonStyle={styles.button}
                onPress={this.handleClose}
                title="CANCEL" />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  private handleKeyboardShow = () => {
    this.setState({ scrollEnabled: true });
  }

  private handleKeyboardHide = () => {
    this.setState({ scrollEnabled: false });
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