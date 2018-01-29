import * as React from 'react';
import { isEmpty } from 'ramda';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Row from './Row';
import Text from 'components/ui/Text';

import styles from './styles';

export interface IAccountListProps {
  accounts: { [id: string]: object };
  ecosystems: { [id: string]: object };
  onSelect(id: string, ecosystemId: string): void;
  onRemove(): void;
}

const findEcosystemName = (parameter: any) =>
  parameter.name === 'ecosystem_name';

const getTitle = (account: any, ecosystem: any) => {
  if (!ecosystem) {
    return `${account.state || ''} (${account.id})`;
  }

  const nameParameter = ecosystem.parameters.find(findEcosystemName);

  return (
    (nameParameter && nameParameter.value) || `${ecosystem.id} (${account.id})`
  );
};

class AccountList extends React.Component<IAccountListProps> {
  public render() {
    if (isEmpty(this.props.accounts)) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.loginAs}>LOGIN AS</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {Object.values(this.props.accounts).map(this.iterateEcosystems)}
        </ScrollView>
      </View>
    );
  }

  private iterateEcosystems = (account: any) => {
    if (account.ecosystems) {
      return account.ecosystems.map((ecosystem: any) =>
        this.renderAccountPerEcosystem(account, this.props.ecosystems[ecosystem])
      );
    }
  }

  private renderAccountPerEcosystem = (account: any, ecosystem: any) => {
    if (!ecosystem) {
      return null;
    }

    return (
      <View key={`${account.id}_${ecosystem.id}`}>
        <Row
          id={account.id}
          ecosystemId={ecosystem.id}
          title={getTitle(account, ecosystem)}
          onPress={this.props.onSelect}
          onRemove={this.props.onRemove}
        />
      </View>
    );
  }
}

export default AccountList;
