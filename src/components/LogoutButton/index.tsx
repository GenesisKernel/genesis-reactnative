import * as React from 'react';
import * as PropTypes from 'prop-types';

import Button from 'components/ui/Button';
import styles from './styles';

export interface ILogoutButtonProps {
  logout: () => void;
  recenter: () => void;
  buttonWidth: number;
}

const logoutButtonProps = {
  intl: {
    id: 'account.button.logout',
    defaultMessage: 'Logout'
  }
};

export default class LogoutButton extends React.Component<ILogoutButtonProps, {}> {
  public static contextTypes = {
    drawer: PropTypes.object
  };

  public render() {
    return (
      <Button
        containerViewStyle={styles.buttonContainer}
        onPress={this.handleLogoutButtonPress}
        buttonStyle={[styles.logoutButton, { width: this.props.buttonWidth }]}
        textStyle={styles.buttonText}
        {...logoutButtonProps} />
    )
  }

  private handleLogoutButtonPress = () => {
    this.props.recenter();
    this.props.logout();
  }
}