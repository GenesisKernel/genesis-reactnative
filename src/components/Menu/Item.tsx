import * as React from 'react';
import { ListItem } from 'react-native-elements';

import { extractIconParams } from '../utils/icon';
import styles from './styles';

export const MENU_TYPE_GROUP = 'menugroup';

const normalizeBoolean = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return false;
  }
};

export interface IItemProps {
  vde?: string;
  title: string;
  icon?: string;
  page: string;
  level?: number;
  isGroup?: boolean;
  params: { [name: string]: any };

  onPress(params: any): void;
}

class Item extends React.PureComponent<IItemProps> {
  public static defaultProps = {
    level: 0,
    isGroup: false
  };

  public render() {
    const { title, isGroup, level, icon } = this.props;

    return (
      <ListItem
        onPress={!isGroup ? this.handleButtonClick : undefined}
        containerStyle={styles.listItem}
        title={title}
        titleStyle={[styles.listItemText]}
        hideChevron={isGroup}
        leftIcon={{
          ...extractIconParams(icon),
          size: 20,
          style: { marginLeft: level * 10 }
        }}
      />
    );
  }

  private handleButtonClick = (): void => {
    const { page, vde, params: pageparams } = this.props;
    const params = {
      page,
      pageparams
    };

    if (vde !== undefined) {
      params.vde = normalizeBoolean(vde);
    }

    this.props.onPress(params);
  }
}

export default Item;
