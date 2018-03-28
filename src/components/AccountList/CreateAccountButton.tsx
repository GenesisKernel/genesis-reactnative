import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

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
          <Icon name="plus" type="simple-line-icon" size={28} color="#fff" containerStyle={styles.createIconStyle} />
        </View>
      </TouchableOpacity>
    );
  }
}