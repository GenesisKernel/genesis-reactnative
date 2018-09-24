import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';
import styles from './styles';

interface IHomeButton {
  navigateWithReset: () => void;
}

class HomeButton extends React.Component<IHomeButton> {
  public render() {
    return (
      <Icon
        name="home"
        size={22}
        color={Colors.dark}
        containerStyle={styles.icon}
        underlayColor="transparent"
        type="simple-line-icon"
        onPress={this.handlePress}
      />
    );
  }

  public handlePress = () => {
    this.props.navigateWithReset();
  }
}

export default HomeButton;
