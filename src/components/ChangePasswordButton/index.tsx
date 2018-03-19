import * as React from 'react';
import Button from 'components/ui/Button';
import styles from './styles';
import { IAccout } from 'modules/account/reducer';

const changePasswordButton = {
  intl: {
    id: 'changePassword',
    defaultMessage: 'Change Password'
  },
};

interface IChangePasswordButton {
  buttonWidth: number;
  account: IAccout;
  onPress: (account: IAccout) => void;
  recenter: () => void;
}

export default class ChangePasswordButton extends React.Component<IChangePasswordButton> {
  public render() {
    return (
      <Button
        onPress={this.handlePress}
        containerViewStyle={styles.buttonContainer}
        buttonStyle={[styles.button, { width: this.props.buttonWidth }]}
        textStyle={styles.buttonText}
        {...changePasswordButton}
      />
    );
  }

  private handlePress = () => {
    this.props.recenter();
    this.props.onPress(this.props.account);
  }
}