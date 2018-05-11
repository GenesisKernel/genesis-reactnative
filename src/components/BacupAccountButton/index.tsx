import * as React from 'react';
import styles from './styles';

import { Colors } from 'components/ui/theme';
import { Icon } from 'react-native-elements';

interface IBacupAccountButton {
  backupAccount: () => void;
}

export default class BackupAccountButton extends React.Component<IBacupAccountButton> {

  public render() {
    return (
      <Icon
        name="shield"
        size={22}
        color={Colors.dark}
        containerStyle={styles.icon}
        underlayColor="transparent"
        type="simple-line-icon"
        onPress={this.handlePress}
      />
    );
  }

  private handlePress = () => {
    this.props.backupAccount();
  }
}