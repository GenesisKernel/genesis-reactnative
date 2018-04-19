import * as React from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const avatarDefaultProps = {
  iconStyle: {
    color: '#fff'
  },
  type: 'font-awesome',
  name: 'user-circle'
};

interface IAvatarProps {
  currentNode: INode;
  account: IAccount;
}

export default class Avatar extends React.PureComponent<IAvatarProps> {
  state = {
    avatarExists: true,
  }

  public render() {
    const { currentNode, account } = this.props;
    const { avatarExists } = this.state;

    const avatar = `${currentNode.apiUrl}api/v2/avatar/${account.ecosystem_id}/${account.key_id}`;

    return (
      <View style={styles.avatarImageWrapper}>
        {avatarExists
          ? (
            <Image
              resizeMode="cover"
              style={styles.avatarImage}
              source={{ uri: avatar }}
              onError={this.handleAvatarError}
            />
          )
          : (<Icon size={40} {...avatarDefaultProps} />)
        }
      </View>
    )
  }

  private handleAvatarError = (err: any) => {
    const { avatarExists } = this.state;
    avatarExists && this.setState({ avatarExists: false });
  }
}