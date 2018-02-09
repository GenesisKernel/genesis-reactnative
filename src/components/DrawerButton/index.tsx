import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10
  }
});

class DrawerButton extends React.Component<object, object> {
  public static contextTypes = {
    drawer: PropTypes.object
  };

  public render() {
    return (
      <Icon
        name="menu"
        size={22}
        color={Colors.dark}
        containerStyle={styles.icon}
        underlayColor="transparent"
        type="simple-line-icon"
        onPress={this.handlePress}
      />
    );
  }

  private handlePress = () => {
    this.context.drawer.open();
  }
}

export default DrawerButton;
