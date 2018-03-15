import * as React from 'react';
import Button from 'components/ui/Button';
import styles from './styles';

const changePasswordButton = {
  intl: {
    id: 'changePassword',
    defaultMessage: 'Change Password'
  },
};

interface IChangePasswordButton {
  buttonWidth: number;
}

export default class ChangePasswordButton extends React.Component<IChangePasswordButton> {
  public render() {
    return (
      <Button
        buttonStyle={[styles.button, { width: this.props.buttonWidth }]}
        textStyle={styles.buttonText}
        {...changePasswordButton}
      />
    );
  }
}