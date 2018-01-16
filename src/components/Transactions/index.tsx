import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import { pathOr } from 'ramda';

import Protypo from 'components/Protypo';
import styles from './styles';

const extractError = pathOr('Error executing transaction')([
  'error',
  'data',
  'msg'
]);

const isSuccess = item => !!item.block;
const isFailure = item => !!item.error;
const isPending = item => !item.block && !item.error;

const extractStatus = item => {
  if (isPending(item)) {
    return {
      subtitle: 'Pending',
      icon: {
        name: 'sync'
      }
    };
  }
  if (isFailure(item)) {
    return {
      subtitle: extractError(item),
      icon: {
        name: 'exclamation-circle',
        color: '#f05050'
      }
    };
  }
  if (isSuccess(item)) {
    return {
      subtitle: 'Imprinted in the blockchain',
      icon: {
        name: 'check-circle',
        color: '#27c24c'
      }
    };
  }

  return {
    subtitle: 'Error',
    icon: {
      name: 'exclamation-circle',
      color: '#f05050'
    }
  };
};

export interface ITransactionsProps {
  items: Array<{ uuid: string }>;
}

class Transactions extends React.Component<ITransactionsProps> {
  public render() {
    const { items } = this.props;

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }

  private keyExtractor = item => item.uuid;

  private renderItem = ({ item }) => {
    const status = extractStatus(item);

    return (
      <ListItem
        title={item.contract}
        hideChevron
        leftIcon={{
          ...status.icon,
          type: 'font-awesome'
        }}
        subtitle={status.subtitle}
      />
    );
  }
}

export default Transactions;
