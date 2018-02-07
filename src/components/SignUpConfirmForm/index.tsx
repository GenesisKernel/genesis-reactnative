import * as React from 'react';
import { View, TextInput, Modal } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Field from 'components/ui/Field';
import Text from 'components/ui/Text';
import styles from './styles';
import SignUpFormStyles from '../SignUpForm/styles';

export interface InputParams {
  seed: string;
}

export interface ISignUpConfirmProps {
  seed?: string;
  onSubmit(params: InputParams): void;
  generateSeed(): void;
  goBack(): void;
}

export interface ISignUpConfirmState {
  seed?: string;
}

const cancelButtonProps = {
  id: 'auth.sign-in.submit.title',
  defaultMessage: 'Cancel'
};

const NextButtonProps = {
  id: 'auth.sign-in.submit.title',
  defaultMessage: 'Next step'
};

class SignUpConfirm extends React.Component<
  ISignUpConfirmProps,
  ISignUpConfirmState
> {
  constructor(props: ISignUpConfirmProps) {
    super(props);

    this.state = {
      seed: props.seed || undefined
    };
  }

  public componentWillReceiveProps(nextProps: ISignUpConfirmProps) {
    if (nextProps.seed) {
      this.setState(() => ({
        seed: nextProps.seed
      }));
    }
  }

  public render() {
    return (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <View style={{ height: 180 }}>
                <Input
                  style={styles.textInput}
                  onChangeText={this.handleSeedChange}
                  value={this.state.seed}
                  autoCorrect={false}
                  multiline
                  intl={{
                    id: 'auth.sign-up-confirm.seed.placeholder',
                    defaultMessage: 'Account seed'
                  }}
                />
              </View>
              <Button
                onPress={this.props.generateSeed}
                buttonStyle={styles.cancelButton}
                textStyle={styles.cancelButtonText}
                intl={{
                  id: 'auth.sign-up-confirm.button.generate-new',
                  defaultMessage: 'Generate new'
                }}
              />
            </View>

            <View>
              <View style={styles.bottomActions}>
                <Button onPress={this.submit} intl={NextButtonProps} />
                <Button
                  onPress={this.handleNavigateBack}
                  buttonStyle={styles.cancelButton}
                  textStyle={styles.cancelButtonText}
                  intl={cancelButtonProps}
                />
              </View>
            </View>
          </View>
    );
  }

  private submit = (): void => {
    if (this.state.seed) {
      this.props.onSubmit({
        seed: this.state.seed
      });
    }
  }

  private handleNavigateBack = () => {
    this.props.goBack();
  }

  private handleSeedChange = (seed: string): void => {
    this.setState(() => ({ seed }));
  }
}

export default SignUpConfirm;
