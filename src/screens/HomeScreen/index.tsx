import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import PageContainer from 'containers/PageContainer';
import MenuGridContainer from 'containers/MenuGridContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import DrawerButtonContainer from 'containers/DrawerButtonContainer';
import StatusIconContainer from 'containers/StatusIconContainer';
import styles from './styles';

import { DEFAULT_PAGE } from '../../constants';

interface IScreenProps extends NavigationScreenProps<{}> {}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => ({
    headerTitle: <PageTitleContainer style={navigationOptions.headerTitleStyle} />,
    headerBackTitle: null,
    gesturesEnabled: false,
    headerLeft: <DrawerButtonContainer />,
    headerRight: <StatusIconContainer />
  })

  public render() {
    return (
      <View style={styles.container}>
        <MenuGridContainer pageName={DEFAULT_PAGE} />
      </View>
    );
  }
}

export default HomeScreen;
