import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from 'components/ui/Text';

import styles from './styles';

export default class CreateAccountButton extends React.Component<{onPress: () => void}> {

  public render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.createButtonTouchable}
        onPress={this.props.onPress}>
        <View
          style={styles.createButtonContainer}>
          <Text
            style={styles.createButtonText}
            intl={{ id: "account.create.uppercase", defaultMessage: 'CREATE ACCOUNT' }} />
        </View>
      </TouchableOpacity>
    );
  }
}