import * as React from 'react';
import { isEmpty, path } from 'ramda';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import Row from './Row';
import CreateAccountButton from './CreateAccountButton';

import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Text from 'components/ui/Text';

import styles from './styles';

export interface IAccountListProps {
  accounts: { [id: string]: object };
  noTitle?: boolean | undefined,
  currentAccount: string;
  isDrawerOpened: boolean;
  isAccountSelectScreen: boolean;
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
  onSelect(payload: { uniqKey: string; encKey: string; }): void;
  onCreateAccount: () => void;
}

class AccountList extends React.Component<IAccountListProps, {isScrollAvailable: boolean}> {
  state = {
    isScrollAvailable: true,
  }

  public render() {
    if (isEmpty(this.props.accounts)) {
      return <View style={styles.container} />;
    }
    const { isAccountSelectScreen } = this.props;

    return (
      <View style={styles.container}>
        {!this.props.noTitle && (
          <Text
            style={styles.loginAs}
            intl={{ id: "account.list.login.as", defaultMessage: "Login as" }}/>
        )}

        <ScrollView
          scrollEnabled={this.state.isScrollAvailable}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {Object.values(this.props.accounts).map(this.renderAccount)}
        </ScrollView>

        {!isAccountSelectScreen && (<CreateAccountButton onPress={this.props.onCreateAccount} />)}
      </View>
    );
  }

  private renderAccount = (account: any) => {
    return (
      <View key={account.uniqKey}>
        <Row
          account={account}
          onPress={this.props.onSelect}
          isLoggedAccount={account.uniqKey === this.props.currentAccount}
          onDisableScroll={this.handlePreventScroll}
          isDrawerOpened={this.props.isDrawerOpened}
        />
      </View>
    );
  }

  private handlePreventScroll = (value: boolean) => {
    this.state.isScrollAvailable !== value && this.setState({ isScrollAvailable: value });
  }
}

export default AccountList;
