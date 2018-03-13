import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';

import Button from 'components/ui/Button';

import styles from './styles';

export interface ILogoutButtonProps {
  logout: () => void;
  recenter: () => void;
}

const logoutButtonProps = {
  intl: {
    id: 'logout',
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
        onPress={this.handleLogoutButtonPress}
        buttonStyle={styles.logoutButton}
        textStyle={styles.buttonText}
        {...logoutButtonProps} />
    )
  }

  private handleLogoutButtonPress = () => {
    this.context.drawer.close(() => {
      this.props.recenter();
      this.props.logout();
    });
  }
}