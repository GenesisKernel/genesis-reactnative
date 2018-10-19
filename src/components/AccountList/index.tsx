import * as React from 'react';
import { isEmpty, path } from 'ramda';
import { View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import RowContainer from 'containers/AccountList/RowContainer';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';

import CreateAccountButton from './CreateAccountButton';
import styles from './styles';

export interface IAccountListProps {
  accounts: { [id: string]: object };
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
    const { isAccountSelectScreen } = this.props;

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
          {Object.values(this.props.accounts).map(this.renderAccount)}
        </ScrollView>

        {!isAccountSelectScreen && <CreateAccountButton onPress={this.props.onCreateAccount} />}
      </View>
    );
  }

  private renderAccount = (account: any) => {
    return (
      <View key={account.uniqKey}>
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
