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
import BackupAccountButtonContainer from 'containers/BackupAccountButtonContainer';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import styles from './styles';

import { DEFAULT_PAGE } from '../../constants';

interface IScreenProps extends NavigationScreenProps<{}> {}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => ({
    headerTitle: ' ',
    headerBackTitle: null,
    gesturesEnabled: false,
    headerLeft: <DrawerButtonContainer />,
    headerRight: (<View style={styles.rightButtons}>
        <NotificationsIconContainer />
        <BackupAccountButtonContainer />
      </View>)
  })

  public render() {
    return (
      <View style={styles.container}>
        <Logo type="black"/>
        <ProtypoContainer />
        {/* <MenuGridContainer pageName={DEFAULT_PAGE} /> */}
      </View>
    );
  }
}

export default HomeScreen;
