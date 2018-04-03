import * as React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import Button from 'components/ui/Button';
import Text from 'components/ui/Text';

import styles from './styles';

interface IRoleSelectForm {
  roles: IRole[],
  onClose: () => void;
  onConfirm: (payload: IRole) => void;
}

export default class RoleSelectForm extends React.Component<IRoleSelectForm> {
  public render() {
    return (
      <View
        style={styles.container}>
        <Text
          style={styles.title}
          intl={{ id: "auth.role.select", defaultMessage: `Please, select the role you'd like to login by` }}/>
        <ScrollView>
          {this.renderRole()}
        </ScrollView>
        <TouchableOpacity onPress={this.props.onClose}>
          <View
            style={styles.noRoleContainer}>
            <Text intl={{ id: 'auth.without.role', defaultMessage: 'Sign without role' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private renderRole = () => {
    const { roles, onConfirm } = this.props;
    return roles.map((item: IRole, i: number) => {
      if (!item) return null;
      return (
        <TouchableOpacity
          key={i}
          onPress={() => onConfirm(item)}>
          <View
            style={styles.roleContainer}>
            <Text>{item.role_name}</Text>
          </View>
        </TouchableOpacity>
      );
    })
  }
}