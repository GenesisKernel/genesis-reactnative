import * as React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, FlatList } from 'react-native';
import { Colors } from 'components/ui/theme';
import { pathOr } from 'ramda';

import styles from './styles';

const extractError = pathOr('Error executing transaction')([
  'error',
  'data',
  'msg'
]);

const isSuccess = item => {
  if (item.params && item.params.composite) {
    return item.result && item.result === 'success';
  } else {
    return !!item.block;
  }
};
const isFailure = item => !!item.error;
const isPending = item => {
  if (item.params && item.params.composite) {
    return !item.error && !item.result;
  } else {
    return !item.block && !item.error;
  }
}

const extractStatus = item => {
  if (isPending(item)) {
    return {
      subtitle: 'Pending',
      icon: {
        name: 'sync',
        type: "material-icons",
        color: '#fff'
      }
    };
  }
  if (isFailure(item)) {
    return {
      subtitle: extractError(item),
      background: Colors.underlayRed,
      icon: {
        name: 'exclamation-circle',
        color: Colors.dangerRed,
      }
    };
  }
  if (isSuccess(item)) {
    return {
      subtitle: 'Imprinted in the blockchain',
      background: Colors.underlayGreen,
      icon: {
        name: 'check-circle',
        color: Colors.green,
      }
    };
  }

  return {
    subtitle: 'Error',
    background: Colors.underlayRed,
    icon: {
      name: 'exclamation-circle',
      color: Colors.dangerRed,
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

  private keyExtractor = item => item.uuid || item.params.uuid;

  private renderItem = ({ item }) => {
    const status = extractStatus(item);

    return (
      <View
        style={[styles.row, { backgroundColor: status.background || 'transparent' }]}>
        <Icon
          size={40}
          iconStyle={styles.icon}
          type="font-awesome"
          {...status.icon} />
        <View style={styles.rowText}>
          <Text
            numberOfLines={1}
            style={styles.title}>
            {item.contract || pathOr('...', ['params', 'uuid'], item)}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.subtitle}>
            {status.subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

export default Transactions;
