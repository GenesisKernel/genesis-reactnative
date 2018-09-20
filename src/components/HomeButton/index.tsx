import * as React from 'react';
import { navigateWithReset } from 'modules/navigator/actions';
import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';
import styles from './styles';
import { navTypes } from '../../constants';

const handlePress = (navigation: any) => {
  navigation.dispatch(navigateWithReset([{ routeName: navTypes.HOME }]));
};

const HomeButton = (navigation: any) => {
  return (
    <Icon
      name="home"
      size={22}
      color={Colors.dark}
      containerStyle={styles.icon}
      underlayColor="transparent"
      type="simple-line-icon"
      onPress={() => handlePress(navigation)}
    />
  );
};

export default HomeButton;
