import * as React from 'react';
import * as CodePush from 'react-native-code-push';
import { View } from 'react-native';

import Text from 'components/ui/Text';
import styles from './styles';

class AppVersion extends React.PureComponent<{}, { version: string }> {
  state = {
    version: '0'
  }

  public componentDidMount() {
    CodePush.getUpdateMetadata() // @TODO: Maybe we can move it to the store
      .then((update: any) => {
        if (!update) {
          return;
        }
        this.setState({ version: `${update.appVersion} (${update.label})` });
      })
      .catch(e => console.log(e));
  }

  public render() {
    return <Text style={styles.text}>{this.state.version}</Text>;
  }
}

export default AppVersion;
