import * as React from 'react';
import { navigateWithReset } from 'modules/navigator/actions';
import { navTypes } from '../../constants';

import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';

import styles from './styles';

interface IHomeButtonProps {
  dispatch: (func: any) => {},
}

export default class HomeButton extends React.Component<IHomeButtonProps> {
  handlePress = () => {
    this.props.dispatch(navigateWithReset([{ routeName: navTypes.HOME }]));
  }
  render() {
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
}
