import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';

import styles from './styles';

interface IStatusIconProps {
  pending?: boolean;
  navigateToTransactions?: () => any;
}

class StatusIcon extends React.Component<IStatusIconProps, object> {
  public static defaultProps: IStatusIconProps = {
    pending: false
  };

  public render() {
    const { pending, navigateToTransactions } = this.props;

    // if (!pending) {
      return (
        <Icon
          name="hourglass"
          size={22}
          color="#fff"
          type="simple-line-icon"
          underlayColor="transparent"
          containerStyle={styles.icon}
          onPress={navigateToTransactions}
        />
      );
    // }

    return (
      <View style={styles.icon}>
        <AnimatableView
          animation="rotate"
          direction="reverse"
          easing="linear"
          useNativeDriver
          iterationCount="infinite"
        >
          <Icon
            name="refresh"
            size={22}
            color="#fff"
            type="simple-line-icon"
            underlayColor="transparent"
          />
        </AnimatableView>
      </View>
    );
  }
}

export default StatusIcon;
