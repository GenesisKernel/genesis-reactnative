import * as React from 'react';
import { isEmpty, path } from 'ramda';
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
  noTitle?: boolean | undefined,
  currentAccountAddress: string;
  notifications: {
    groupedByEcosystemId: {
      [id: string]: {
        [address: string]: {
          role_id: number;
          ecosystem: number;
          count: number;
        };
      };
    };
  };
  onSelect(address: string, ecosystemId: string): void;
  onRemove(): void;
}

const findEcosystemName = (parameter: any) =>
  parameter.name === 'ecosystem_name';

const getTitle = (account: any, ecosystem: any) => {
  if (!ecosystem) {
    return `${account.state || ''} (${account.address})`;
  }

  const nameParameter = ecosystem.parameters.find(findEcosystemName);

  return (
    (nameParameter && nameParameter.value) || `${ecosystem.id} (${account.address})`
  );
};

class AccountList extends React.Component<IAccountListProps> {
  public render() {
    if (isEmpty(this.props.accounts)) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        {!this.props.noTitle && (
          <Text style={styles.loginAs}>Login as</Text>
        )}
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
      return account.ecosystems.map((ecosystem: any) => {
        return this.renderAccountPerEcosystem(account, this.props.ecosystems[ecosystem], path(['groupedByEcosystemId', `${ecosystem}`, `${account.address}`, 'count'],this.props.notifications));
      });
    }
  }

  private renderAccountPerEcosystem = (account: any, ecosystem: any, notificationsCount: number | undefined) => {
    if (!ecosystem) {
      return null;
    }

    return (
      <View key={`${account.address}_${ecosystem.id}`}>
        <Row
          address={account.address}
          ecosystemId={ecosystem.id}
          notificationsCount={notificationsCount}
          title={getTitle(account, ecosystem)}
          onPress={this.props.onSelect}
          onRemove={this.props.onRemove}
          currentAccountAddress={this.props.currentAccountAddress}
        />
      </View>
    );
  }
}

export default AccountList;
