import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { View as AnimatableView } from 'react-native-animatable';
import { Colors } from 'components/ui/theme';
import Text from 'components/ui/Text';
import { navTypes } from '../../constants';
import styles from './styles';

interface INotificationsIconProps {
  count?: number | null;
  isHomeRoute: boolean;
  showNotificationsPage: (withReset?: boolean) => void;
}

class NotificationsIcon extends React.PureComponent<INotificationsIconProps> {

  public render() {
    const { count } = this.props;
    return (
      <View style={styles.icon}>
        {this.renderCount()}
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

  private showNotificationsPage = () => {
    const { isHomeRoute, showNotificationsPage } = this.props;
    showNotificationsPage(!isHomeRoute);
  }

  private renderCount = () => {
    try {
      const { count } = this.props;
      if (!count) return null;

      return (
        <View style={styles.counter}>
          <Text style={styles.counterText}>{`${count}`}</Text>
        </View>
      );
    } catch (error) {
      console.log(error, 'renderCount');
    }
  }

}

export default NotificationsIcon;
