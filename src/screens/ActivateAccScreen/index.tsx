import * as React from 'react';
import { View, Clipboard, Linking } from 'react-native';
import { path } from 'ramda';
import { EMAIL } from '../../constants';

import Text from 'components/ui/Text';
import Button from 'components/ui/Button';

import styles from './styles';

export default class ActivateAccScreen extends React.Component {
  public render() {
    console.log(this.props, 'props');
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
          intl={{
            id: 'auth.wallet.registration.type.email',
            defaultMessage: 'Activate using E-Mail',
          }}
        />
        <Text
          style={styles.descr}
          intl={{
            id: 'auth.wallet.registration.type.email.desc',
            defaultMessage: 'To activate using E-Mail copy your public key and send it to apla@snapswap.eu',
          }}
        />
        <Button
          intl={{
            id: 'auth.wallet.copy.public',
            defaultMessage: 'Copy public key',
          }}
          onPress={this.copyPublicKey}
        />
        <Button
          intl={{
            id: 'auth.wallet.registration.type.email.confirm',
            defaultMessage: 'Send E-Mail',
          }}
          onPress={this.sendEmail}
        />
      </View>
    );
  }

  private sendEmail = () => {
    const { publicKey } = path(['navigation', 'state', 'params'], this.props);
    const url = `mailto:${EMAIL}?subject=Apla.io&body=${publicKey}`;

    Linking.canOpenURL(url).then(r => {
      Linking.openURL(`mailto:${EMAIL}?subject=Apla.io&body=${publicKey}`);
    }).catch(err => {
      console.dir(err, 'Error at => private sendEmail');
    });
  }

  private copyPublicKey = () => {
    const { publicKey } = path(['navigation', 'state', 'params'], this.props);
    Clipboard.setString(publicKey);

  }
}
