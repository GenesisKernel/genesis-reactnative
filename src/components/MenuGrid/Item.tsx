import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from 'components/ui/Text';
import { extractIconParams } from '../utils/icon';
import styles from './styles';

export const MENU_TYPE_GROUP = 'menugroup';

export interface IItemProps {
  index: number;
  title: string;
  icon?: string;

  onPress(params: any): void;
}

class Item extends React.PureComponent<IItemProps> {
  public static defaultProps = {
    isGroup: false
  };

  public render() {
    const { title, icon } = this.props;

    const iconProps = {
      ...extractIconParams(icon),
      color: '#fff',
      size: 24
    };

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        activeOpacity={0.8}
        style={styles.item}
      >
        <View style={styles.iconWrapper}>
          <Icon {...iconProps} />
        </View>
        <Text style={styles.icon} numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  private handlePress = (): void => {
    this.props.onPress(this.props.index);
  }
}

export default Item;
