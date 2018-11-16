import * as React from 'react';
import { isEmpty, path, uniq } from 'ramda';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import RowContainer from 'containers/AccountList/RowContainer';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';

import CreateAccountButton from './CreateAccountButton';
import styles from './styles';

export interface IAccountListProps {
  accounts: { [id: string]: IAccount };
  noTitle?: boolean | undefined;
  isDrawerOpened: boolean;
  isAccountSelectScreen: boolean;
  onCreateAccount: () => void;
  onSelect(payload: { uniqKey: string; encKey: string }): void;
}

class AccountList extends React.PureComponent<IAccountListProps, { isScrollAvailable: boolean }> {
  state = {
    isScrollAvailable: true,
  };

  public render() {
    if (isEmpty(this.props.accounts)) {
      return <View style={styles.container} />;
    }
    const { isAccountSelectScreen, accounts } = this.props;

    const accountKeys: Array<string> = uniq(Object.values(accounts).map(item => item.key_id));
    const accountsToRender = accountKeys.map(key => {
      return Object.values(accounts).filter(account => account.key_id === key);
    });

    return (
      <View style={styles.container}>
        {!this.props.noTitle && (
          <Text
            style={styles.loginAs}
            intl={{ id: 'account.list.login.as', defaultMessage: 'Login as' }} />
        )}

        <ScrollView
          scrollEnabled={this.state.isScrollAvailable}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {accountsToRender.map(account => {
            return account.sort((a, b) => a.ecosystem_name > b.ecosystem_name ? 1 : -1).map(this.renderAccount);
          })}
        </ScrollView>

        {!isAccountSelectScreen && <CreateAccountButton onPress={this.props.onCreateAccount} />}
      </View>
    );
  }

  private renderAccount = (account: IAccount, index: number, arr: any) => {
    const isFirst = index === 0;
    const isLast = index === arr.length -1;

    return (
      <View
        key={account.uniqKey}
        style={[isFirst && styles.isFirst, isLast && styles.isLast, !isFirst && !isLast && styles.regular, isFirst && isLast && styles.noBorders]}>
        <RowContainer
          onDisableScroll={this.handlePreventScroll}
          uniqKey={account.uniqKey}
        />
      </View>
    );
  }

  private handlePreventScroll = (value: boolean) => {
    this.state.isScrollAvailable !== value && this.setState({ isScrollAvailable: value });
  }
}

export default AccountList;
