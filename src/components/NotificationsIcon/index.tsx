import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { Colors } from 'components/ui/theme';
import Text from 'components/ui/Text';
import { navTypes } from '../../constants';
import styles from './styles';

interface IStatusIconProps {
  count?: number | null;
  isHomeRoute: boolean;
  showNotificationsPage: (withReset?: boolean) => void;
}

class StatusIcon extends React.PureComponent<IStatusIconProps> {
  showNotificationsPage = () => {
    const { isHomeRoute, showNotificationsPage } = this.props;
    showNotificationsPage(!isHomeRoute);
  }
  public render() {
    const { count } = this.props;

    return (
      <View style={styles.icon}>
        <View
          style={styles.animationContainer}
        >
          {count && (
            <View style={styles.counter}>
              <Text style={styles.counterText}>{`${count}`}</Text>
            </View>
          )}
        </View>
        <Icon
          name="flag"
          size={22}
          color={Colors.dark}
          type="simple-line-icon"
          underlayColor="transparent"
          onPress={this.showNotificationsPage}
        />
      </View>
    );
  }
}

export default StatusIcon;
