import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import Logo from 'components/ui/Logo';
import MenuGridContainer from 'containers/MenuGridContainer';
import DrawerButtonContainer from 'containers/DrawerButtonContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';
import styles from './styles';

import { DEFAULT_PAGE } from '../../constants';

interface IScreenProps extends NavigationScreenProps<{}> {}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => ({
    headerTitle: ' ',
    headerBackTitle: null,
    gesturesEnabled: false,
    headerLeft: <DrawerButtonContainer />,
    headerRight: <NotificationsIconContainer />
  })

  public render() {
    return (
      <View style={styles.container}>
        <Logo type="black"/>
        <MenuGridContainer pageName={DEFAULT_PAGE} />
      </View>
    );
  }
}

export default HomeScreen;
