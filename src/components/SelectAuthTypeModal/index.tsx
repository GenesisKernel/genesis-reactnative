import * as React from 'react';
import styles from './styles';
import Button from 'components/ui/Button';

import { View } from 'react-native';

const addAccountButtonLabel = {
  id: 'account.known',
  defaultMessage: 'KNOWN ACCOUNT'
};

const createAccountButtonLabel = {
  id: "account.create",
  defaultMessage: 'CREATE ACCOUNT'
};

const SelectAuthTypeModal: React.SFC<{}> = () => (
  <View style={styles.container}>
    <Button
      buttonStyle={styles.createButton}
      // onPress={this.handleCreateAccountButtonPress}
      intl={createAccountButtonLabel}
    />
    <Button
      // onPress={this.handleKnownAccountButtonPress}
      intl={addAccountButtonLabel}
    />
  </View>
);

export default SelectAuthTypeModal;