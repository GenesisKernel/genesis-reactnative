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

interface ISelectAuthTypeModal {
  onCreateAccountPress: () => void;
  onKnownAccountPress: () => void;
}

const SelectAuthTypeModal: React.SFC<ISelectAuthTypeModal> = ({onCreateAccountPress, onKnownAccountPress}) => (
  <View style={styles.container}>
    <Button
      buttonStyle={styles.createButton}
      onPress={onCreateAccountPress}
      intl={createAccountButtonLabel}
    />
    <Button
      onPress={onKnownAccountPress}
      intl={addAccountButtonLabel}
    />
  </View>
);

export default SelectAuthTypeModal;