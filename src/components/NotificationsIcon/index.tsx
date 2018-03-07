import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { Colors } from 'components/ui/theme';
import Text from 'components/ui/Text';
import styles from './styles';

interface IStatusIconProps {
  count?: number | null;
  navigateToNotifications?: () => void;
}

class StatusIcon extends React.Component<IStatusIconProps, object> {

  public render() {
    const { count, navigateToNotifications } = this.props;

    return (
      <View style={styles.icon}>
        <AnimatableView
          animation="bounce"
          direction="normal"
          easing="ease-out"
          duration={400}
          useNativeDriver
          iterationCount={1}
          style={styles.animationContainer}
          key={Number(count)}
        >
          {count && (
            <View style={styles.counter}>
              <Text style={styles.counterText}>{`${count}`}</Text>
            </View>
          )}
        </AnimatableView>
        <Icon
          name="flag"
          size={22}
          color={Colors.dark}
          type="simple-line-icon"
          underlayColor="transparent"
          onPress={navigateToNotifications}
        />
      </View>
    );
  }
}

export default StatusIcon;
