import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from 'components/ui/Button';
import Text from 'components/ui/Text';

import styles from './styles';

export interface ISignUpWarningProps {
  onSubmit(): void;
}

export default class SignUpWarning extends React.Component<ISignUpWarningProps> {

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>IMPORTANT</Text>
          <Icon iconStyle={styles.icon} type="materialicons" name="announcement" />
          <Text style={styles.description}>
            For secure reason of your personal data and funds SAVE following information ON PHYSICAL carrier (paper for example). You can’t restore your account without follow information
          </Text>
        </View>
        <Button
          title="I UNDERSTAND"
          buttonStyle={styles.understandButton}
          onPress={this.props.onSubmit} />
      </View>
    );
  }
}