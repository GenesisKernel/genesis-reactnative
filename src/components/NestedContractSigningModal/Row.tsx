import * as React from 'react';
import { View } from 'react-native';

import Text from 'components/ui/Text';
import styles from './styles';

export interface INestedContractRow {
  Amount?: string;
  Recipient?: string;
  name: string;
  text: string;
  index: number;
}

export default class NestedContractRow extends React.Component<INestedContractRow, {}> {
  render() {
    const { Amount, Recipient, name, text, index } = this.props;

    return (
      <View style={[styles.row, index === 0 ? styles.firstItem : {}]}>
        <View style={styles.rowLeftPart}>
          <Text style={[styles.rowTitle, styles.rowTitleLeft]}>{name}</Text>
          <Text style={[styles.rowDescr, styles.rowDescrLeft]}>{text}</Text>
        </View>
        <View style={styles.rowRightPart}>
          <Text style={[styles.rowTitle, styles.rowTitleRight]}>Value</Text>
          <Text style={[styles.rowDescr, styles.rowDescrRight]}>{this.props[name]}</Text>
        </View>
      </View>
    );
  }
}