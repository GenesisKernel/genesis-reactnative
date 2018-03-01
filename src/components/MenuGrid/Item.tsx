import * as React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';

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

class Item extends React.Component<IItemProps> {
  state = {
    animationType: 'fadeOut',
  }
  public static defaultProps = {
    isGroup: false
  };

  public render() {
    const { title, icon } = this.props;
    const { animationType } = this.state;
    const iconProps = {
      ...extractIconParams(icon),
      color: animationType === 'fadeOut' ? '#000' : '#3ebc9a',
      size: 28,
    };
    const wrapperStyle = this.setItemWrapperStyle();

    return (
      <TouchableHighlight
        onPress={this.handlePress}
        activeOpacity={0.8}
        underlayColor={`#f8fffd`}
        onShowUnderlay={() => this.handlUnderlay('fadeIn')}
        onHideUnderlay={() => this.handlUnderlay('fadeOut')}
        style={wrapperStyle}
      >
        <View style={styles.itemContent}>
          <View style={styles.iconWrapper}>
            <Icon {...iconProps} />
          </View>
          <View style={styles.textWrapper}>
            <Text
              style={styles.itemText}
              numberOfLines={1}>
              {title}
            </Text>
            <AnimatableView
              animation={animationType}
              easing="ease"
              duration={100}
              useNativeDriver
              iterationCount={1}
              style={styles.itemDecorLine} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  private setItemWrapperStyle = (): object[] => {
    return [styles.item, this.props.index % 2 === 0 ? styles.oddItem : {}];
  }

  private handlUnderlay = (type: string): void => {
    this.setState({ animationType: type });
  }

  private handlePress = (): void => {
    this.props.onPress(this.props.index);
  }
}

export default Item;
