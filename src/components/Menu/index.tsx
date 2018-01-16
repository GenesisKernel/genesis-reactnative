import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { isEmpty } from 'ramda';
import { Icon, ListItem } from 'react-native-elements';

import RevertHistroyButtonContainer from 'containers/RevertHistroyButtonContainer';
import Item, { MENU_TYPE_GROUP } from './Item';
import { extractIconParams } from '../utils/icon';
import styles, { backButtonLeftIconProps } from './styles';

export interface IMenuProps {
  pageName: string;
  menu: object[];

  receivePageParams(params: any): void;
}

class Menu extends React.Component<IMenuProps> {
  public static contextTypes = {
    drawer: PropTypes.object
  };

  public state = {
    menuStack: []
  };

  public shouldComponentUpdate(nextProps: IMenuProps) {
    return (
      this.props.pageName !== nextProps.pageName ||
      this.props.menu.length !== nextProps.menu.length
    );
  }

  public render() {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {this.props.menu.map(menu => this.renderRow(menu, 0))}
        <RevertHistroyButtonContainer
          leftIcon={backButtonLeftIconProps}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
        />
      </ScrollView>
    );
  }

  private renderRow = (item: any, level: number = 0) => {
    const isGroup = item.tag === MENU_TYPE_GROUP;
    const view = (
      <View key={item.attr.title}>
        <Item
          isGroup={isGroup}
          level={level}
          onPress={this.handleButtonClick}
          {...item.attr}
        />
      </View>
    );

    if (item.children) {
      return [
        view,
        ...item.children.map((menu: any) => this.renderRow(menu, level + 1))
      ];
    } else {
      return [view];
    }
  }

  private handleButtonClick = (params: any): void => {
    this.context.drawer.close(() => {
      this.props.receivePageParams(params);
    });
  }
}

export default Menu;
